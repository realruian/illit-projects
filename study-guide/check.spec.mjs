import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile, access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {JSDOM, VirtualConsole} from 'jsdom';
import {STORAGE_KEY, freshProgress, loadProgress, saveProgress, isUnlocked, canConfirm, confirmChapter, getCurrentLevel, normalizeProgress} from './progression.js';
import {chapters} from './curriculum.js';
import {members, levels} from './content.js';
import {memberDetails} from './member-details.js';

const root=fileURLToPath(new URL('.',import.meta.url));
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function memoryStorage(){
  const values=new Map();
  return {getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,String(value)),removeItem:key=>values.delete(key),values};
}
function ready(progress,id){
  progress.chapters[id].tasks=chapters.find(c=>c.id===id).tasks.map(()=>true);
  progress.chapters[id].answers=chapters.find(c=>c.id===id).quiz.map(q=>q.answer);
  return progress;
}
function confirmedThrough(count){
  let progress=freshProgress();
  for(let id=1;id<=count;id++)progress=confirmChapter(progress,id);
  return progress;
}
function storageSeed(progress){return {[STORAGE_KEY]:JSON.stringify(progress)};}
function seedFrom(window){return Object.fromEntries(Array.from({length:window.localStorage.length},(_,i)=>{const key=window.localStorage.key(i);return [key,window.localStorage.getItem(key)];}));}
function stored(window){return JSON.parse(window.localStorage.getItem(STORAGE_KEY));}
async function builtDom({saved={},hash='',blockStorage=false}={}){
  const html=await readFile(path.join(root,'dist/index.html'),'utf8');
  const errors=[];
  const virtualConsole=new VirtualConsole();
  virtualConsole.on('jsdomError',error=>errors.push(error.message));
  const dom=new JSDOM(html,{
    url:`https://illit.test/${hash}`,
    runScripts:'dangerously',pretendToBeVisual:true,virtualConsole,
    beforeParse(window){
      window.scrollTo=()=>{};
      window.HTMLElement.prototype.scrollIntoView=()=>{};
      window.matchMedia=()=>({matches:true,addEventListener(){},removeEventListener(){}});
      window.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};
      window.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new window.Event('close'));};
      if(blockStorage)Object.defineProperty(window,'localStorage',{get(){throw new Error('Storage blocked');}});
      else for(const [key,value]of Object.entries(saved))window.localStorage.setItem(key,value);
    },
  });
  await pause(20);
  return {dom,window:dom.window,document:dom.window.document,errors,html};
}
function activePage(document){return [...document.querySelectorAll('[data-page]')].find(e=>!e.hidden);}
async function navigate(ctx,hash){ctx.window.location.hash=hash;await pause(20);}

// These tests exercise completion boundaries and migration, rather than mirroring layout code.
test('a new learner can enter only the first of the five fixed chapters',()=>{
  const p=freshProgress();
  assert.equal(getCurrentLevel(p),1);
  assert.deepEqual(levels.map(l=>l.title),['认识 ILLIT','建立追星信息渠道','开始日常追星','理解韩国打歌与回归','体验深度追星']);
  assert.deepEqual(chapters.map(c=>c.id),[1,2,3,4,5]);
  assert.equal(isUnlocked(p,1),true);
  for(let id=2;id<=5;id++){assert.equal(isUnlocked(p,id),false);assert.equal(p.chapters[id].completed,false);}
  const another=freshProgress();p.chapters[1].tasks[0]=true;
  assert.equal(another.chapters[1].tasks[0],false,'separate learner states must not share task arrays');
});

test('all five chapters accept explicit confirmation while every practice and question is optional',()=>{
  let p=freshProgress();
  for(let id=1;id<=5;id++){
    assert.equal(isUnlocked(p,id),true);
    assert.equal(canConfirm(p,id),true);
    assert.equal(p.chapters[id].completed,false,'opening a chapter must not auto-confirm');
    assert.ok(p.chapters[id].tasks.every(done=>done===false));
    assert.ok(p.chapters[id].answers.every(answer=>answer===null));
    if(id<5)assert.equal(isUnlocked(p,id+1),false);
    const wrong=structuredClone(p),question=chapters[id-1].quiz[0];
    wrong.chapters[id].answers[0]=(question.answer+1)%question.options.length;
    assert.equal(canConfirm(wrong,id),true,'a wrong practice answer must never block learning');
    p=confirmChapter(p,id);
    assert.equal(p.chapters[id].completed,true);
    if(id<5)assert.equal(isUnlocked(p,id+1),true);
  }
  assert.equal(Object.values(p.chapters).filter(c=>c.completed).length,5);
  for(const id of [0,6,-1,1.5,'1',null])assert.equal(canConfirm(p,id),false,'only real chapters can be confirmed');
});

test('prepared answers cannot skip a locked chapter',()=>{
  const p=ready(freshProgress(),5);
  assert.equal(canConfirm(p,5),false);
  const result=confirmChapter(p,5);
  assert.equal(result.chapters[5].completed,false);
  assert.equal(isUnlocked(result,5),false);
});

test('the prior first-chapter confirmation survives migration even without finished practice',()=>{
  const storage=memoryStorage();
  const old={tasks:[false,false,false],answers:[null,null,null],note:'原来写下的第一份心动。',completed:true};
  storage.setItem(STORAGE_KEY,JSON.stringify(old));
  const p=loadProgress(storage);
  assert.equal(p.chapters[1].note,old.note);
  assert.deepEqual(p.chapters[1].tasks,old.tasks);
  assert.equal(p.chapters[1].completed,true);
  assert.equal(isUnlocked(p,2),true);
  assert.equal(isUnlocked(p,3),false);
  for(let id=2;id<=5;id++)assert.equal(p.chapters[id].completed,false);
  storage.setItem(STORAGE_KEY,JSON.stringify({...old,completed:false}));
  assert.equal(loadProgress(storage).chapters[1].completed,false,'migration must not infer a confirmation from completed work');
});

test('version-three migration preserves sequential manual confirmations and every old note',()=>{
  const old=confirmedThrough(2);
  delete old.explore;
  old.chapters[1].answers[0]=(chapters[0].quiz[0].answer+1)%chapters[0].quiz[0].options.length;
  old.chapters[1].note='已经确认，但练习可以慢慢看';
  old.chapters[4].note='尚未解锁时备份里的旧笔记也保留';
  old.chapters[4].completed=true;
  const p=normalizeProgress(old);
  assert.equal(p.chapters[1].completed,true);
  assert.equal(p.chapters[2].completed,true);
  assert.equal(p.chapters[3].completed,false);
  assert.equal(p.chapters[4].completed,false,'an old out-of-order flag cannot bypass the main route');
  assert.equal(p.chapters[1].note,old.chapters[1].note);
  assert.equal(p.chapters[4].note,old.chapters[4].note);
  assert.equal(isUnlocked(p,3),true);
  assert.deepEqual(p.explore.favorites,[]);
});

test('all chapter notes and confirmations survive storage, while malformed storage remains usable',()=>{
  const storage=memoryStorage();
  const p=confirmedThrough(3);p.chapters[1].note='第一关';p.chapters[2].note='平台清单';p.chapters[3].note='一周节奏';
  saveProgress(storage,p);
  const again=loadProgress(storage);
  assert.equal(again.chapters[1].note,'第一关');assert.equal(again.chapters[2].note,'平台清单');assert.equal(again.chapters[3].note,'一周节奏');
  assert.equal(isUnlocked(again,4),true);assert.equal(isUnlocked(again,5),false);
  storage.setItem(STORAGE_KEY,'{broken');assert.deepEqual(loadProgress(storage),freshProgress());
  const blocked={getItem(){throw new Error('blocked');},setItem(){throw new Error('blocked');}};
  assert.doesNotThrow(()=>loadProgress(blocked));assert.equal(saveProgress(blocked,p),false);
});

test('exploration favorites persist independently of the original five chapters',()=>{
  const storage=memoryStorage(),p=freshProgress(),before=structuredClone(p.chapters);
  p.explore.favorites=['china-news','memes-bias'];
  saveProgress(storage,p);
  const restored=loadProgress(storage);
  assert.deepEqual(restored.explore.favorites,p.explore.favorites);
  assert.deepEqual(restored.chapters,before);
  assert.equal(getCurrentLevel(restored),1);
  assert.equal(isUnlocked(restored,2),false);
  const another=freshProgress();another.explore.favorites.push('discover-stage');
  assert.deepEqual(freshProgress().explore.favorites,[],'different browser records must not share favorite arrays');
});

test('the curriculum preserves five learning chapters, optional activities, and Chinese member names',()=>{
  for(const c of chapters){
    assert.equal(c.tasks.length,3,`chapter ${c.id} practical tasks`);
    assert.equal(c.quiz.length,3,`chapter ${c.id} recap questions`);
    for(const q of c.quiz){assert.ok(q.options.length>=2);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.options.length);assert.ok(q.explanation);}
    if(c.id>1){assert.ok(c.sections?.length);assert.ok(c.sources?.length);assert.ok(c.tool?.choices?.length);}
  }
  for(const m of members){const d=memberDetails[m.id];assert.match(d.zh,/[\u3400-\u9fff]/);assert.ok(d.summary.length>80);assert.ok(d.highlights.length>=2);assert.ok(d.sources.length);}
});

test('the shipped build has complete local imagery, font, CSS, and script with attribution',async()=>{
  const manifest=JSON.parse(await readFile(path.join(root,'assets.json'),'utf8'));
  for(const asset of manifest.assets){await access(path.join(root,asset.file));assert.match(asset.sourcePage,/^https:\/\/(?:beliftlab\.com|illit-official\.jp)\//);}
  const html=await readFile(path.join(root,'dist/index.html'),'utf8');
  assert.doesNotMatch(html,/<(?:script|link)[^>]+(?:src|href)=["'](?:app\.js|styles\.css)/);
  assert.doesNotMatch(html,/(?:src=["']|url\(["']?)assets\//);
  assert.match(html,/data:image\/webp;base64,/);assert.match(html,/data:font\/woff2;base64,/);
});

test('the live bundle shows fuller named member profiles and preserves keyboard exploration',async t=>{
  const ctx=await builtDom({hash:'#lesson/members'});t.after(()=>ctx.window.close());
  assert.deepEqual(ctx.errors,[]);
  const q=s=>ctx.document.querySelector(s);
  for(const m of members){q(`#tab-${m.id}`).click();const panel=q('#member-panel');assert.ok(panel.textContent.includes(memberDetails[m.id].zh));assert.ok(panel.textContent.includes(memberDetails[m.id].summary));assert.match(q('#member-panel img').src,/^data:image\/webp;base64,/);}
  q('#tab-yunah').dispatchEvent(new ctx.window.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));
  assert.equal(q('#tab-minju').getAttribute('aria-selected'),'true');
  const card=q('[data-term="0"]');card.click();assert.equal(card.getAttribute('aria-pressed'),'true');card.click();assert.equal(card.getAttribute('aria-pressed'),'false');
});

test('locked direct URLs expose introductions and never render later learning or controls',async t=>{
  const ctx=await builtDom({hash:'#chapter/5'});t.after(()=>ctx.window.close());
  assert.deepEqual(ctx.errors,[]);
  const page=activePage(ctx.document);assert.ok(page);assert.ok(page.textContent.includes(levels[4].title));
  assert.equal(page.querySelector('[data-task]'),null);assert.equal(page.querySelector('[data-question]'),null);assert.equal(page.querySelector('[data-confirm-chapter]'),null);
  const laterText=chapters[4].sections[0].items[0].text;
  assert.equal(page.textContent.includes(laterText),false,'a lock must not render the full lesson behind a visual overlay');
});

test('the bundled UI lets learners skip all exercises and manually confirm each of the original five chapters',async t=>{
  const ctx=await builtDom();t.after(()=>ctx.window.close());
  assert.deepEqual(ctx.errors,[]);
  for(let id=1;id<=5;id++)await t.test(`chapter ${id} remains manual and unlocks the next only after confirmation`,async()=>{
    await navigate(ctx,id===1?'#lesson':`#chapter/${id}`);
    let page=activePage(ctx.document);assert.ok(page.textContent.includes(levels[id-1].title));
    const note=page.querySelector('[data-note]')??page.querySelector('#personal-note');assert.ok(note,`chapter ${id} has a note`);
    note.value=`第${id}关手记 <script>window.injected=true</script>`;note.dispatchEvent(new ctx.window.Event('input',{bubbles:true}));
    await pause(410);
    assert.equal(stored(ctx.window).chapters[id].note,note.value);assert.equal(ctx.window.injected,undefined);
    const tasks=[...page.querySelectorAll('[data-task]')];assert.equal(tasks.length,3);
    assert.ok(tasks.every(task=>!task.checked));
    assert.ok(stored(ctx.window).chapters[id].answers.every(answer=>answer===null));
    ctx.window.dispatchEvent(new ctx.window.Event('scroll'));
    assert.equal(stored(ctx.window).chapters[id].completed,false,'reading, notes, and scrolling must not confirm a chapter');
    if(id<5)assert.equal(isUnlocked(stored(ctx.window),id+1),false);
    page=activePage(ctx.document);
    const confirm=page.querySelector('[data-confirm-chapter]')??page.querySelector('#confirm-level');assert.ok(confirm);assert.equal(confirm.disabled,false);confirm.click();
    assert.equal(stored(ctx.window).chapters[id].completed,true);if(id<5)assert.equal(isUnlocked(stored(ctx.window),id+1),true);
    assert.equal(ctx.window.injected,undefined);assert.deepEqual(ctx.errors,[]);
  });
  const saved=seedFrom(ctx.window);const reloaded=await builtDom({saved,hash:'#chapter/5'});t.after(()=>reloaded.window.close());
  const p=stored(reloaded.window)??loadProgress(reloaded.window.localStorage);
  assert.equal(Object.values(p.chapters).filter(c=>c.completed).length,5);
  for(let id=1;id<=5;id++)assert.ok(p.chapters[id].note.includes(`第${id}关手记`));
  assert.deepEqual(reloaded.errors,[]);
});

test('an incorrect optional answer never blocks confirmation and practice stays usable after confirmation',async t=>{
  const ctx=await builtDom({hash:'#lesson'});t.after(()=>ctx.window.close());
  const q=chapters[0].quiz[0],wrong=(q.answer+1)%q.options.length;
  let page=activePage(ctx.document);
  page.querySelector(`[data-question="0"][data-answer="${wrong}"]`).click();
  assert.equal(stored(ctx.window).chapters[1].answers[0],wrong);
  assert.equal(stored(ctx.window).chapters[1].completed,false);
  assert.equal(isUnlocked(stored(ctx.window),2),false);
  page=activePage(ctx.document);
  const confirmation=page.querySelector('[data-confirm-chapter]');
  assert.equal(confirmation.disabled,false,'optional feedback is never a gate');
  confirmation.click();
  assert.equal(stored(ctx.window).chapters[1].completed,true);
  assert.deepEqual(stored(ctx.window).chapters[1].tasks,[false,false,false]);
  page=activePage(ctx.document);
  const correctChoice=page.querySelector(`[data-question="0"][data-answer="${q.answer}"]`);
  assert.equal(correctChoice.disabled,false,'confirmed lessons remain available for relaxed review');
  correctChoice.click();
  assert.equal(stored(ctx.window).chapters[1].answers[0],q.answer);
  assert.equal(stored(ctx.window).chapters[1].completed,true);
  assert.equal(isUnlocked(stored(ctx.window),3),false);
  assert.deepEqual(ctx.errors,[]);
});

test('finishing every optional activity cannot confirm a chapter on the learner’s behalf',async t=>{
  const ctx=await builtDom({hash:'#lesson'});t.after(()=>ctx.window.close());
  let page=activePage(ctx.document);
  for(const task of page.querySelectorAll('[data-task]'))task.click();
  for(const [index,question]of chapters[0].quiz.entries()){
    page=activePage(ctx.document);
    page.querySelector(`[data-question="${index}"][data-answer="${question.answer}"]`).click();
  }
  assert.equal(stored(ctx.window).chapters[1].completed,false);
  assert.equal(isUnlocked(stored(ctx.window),2),false);
  await navigate(ctx,'#home');await navigate(ctx,'#lesson');
  assert.equal(stored(ctx.window).chapters[1].completed,false);
  const button=activePage(ctx.document).querySelector('[data-confirm-chapter]');
  assert.equal(button.disabled,false);button.click();
  assert.equal(stored(ctx.window).chapters[1].completed,true);
  assert.equal(isUnlocked(stored(ctx.window),2),true);
  assert.deepEqual(ctx.errors,[]);
});

test('the three fun areas open before completing any chapter and favorites survive reload',async t=>{
  const ctx=await builtDom({hash:'#explore/china'});t.after(()=>ctx.window.close());
  const emptyChapters=structuredClone(freshProgress().chapters);
  for(const topic of ['china','memes','discover']){
    await navigate(ctx,`#explore/${topic}`);
    const page=activePage(ctx.document);
    assert.equal(page?.id,'explore-page');
    assert.equal(page.dataset.page,'explore');
    assert.ok(ctx.document.querySelector(`[data-explore-topic="${topic}"]`),'each topic has real navigation');
    assert.equal(page.querySelector('[data-task]'),null,'fun areas must not add homework');
    assert.equal(page.querySelector('[data-question]'),null,'fun areas must not add exams');
    assert.equal(page.querySelector('[data-confirm-chapter]'),null,'exploring is separate from five-chapter completion');
    let card=page.querySelector('[data-fun-card]');assert.ok(card);
    assert.equal(card.getAttribute('aria-expanded'),'false');
    card.click();card=activePage(ctx.document).querySelector('[data-fun-card]');assert.equal(card.getAttribute('aria-expanded'),'true');
    card.click();assert.equal(activePage(ctx.document).querySelector('[data-fun-card]').getAttribute('aria-expanded'),'false');
  }
  ctx.document.querySelector('[data-explore-topic="memes"]').click();await pause(20);
  assert.equal(ctx.window.location.hash,'#explore/memes');
  let page=activePage(ctx.document),favorite=page.querySelector('[data-favorite]');assert.ok(favorite);
  const favoriteId=favorite.dataset.favorite;assert.ok(favoriteId);
  assert.equal(favorite.getAttribute('aria-pressed'),'false');
  favorite.click();
  page=activePage(ctx.document);
  assert.equal(page.querySelector(`[data-favorite="${favoriteId}"]`).getAttribute('aria-pressed'),'true');
  assert.ok(stored(ctx.window).explore.favorites.includes(favoriteId));
  assert.deepEqual(stored(ctx.window).chapters,emptyChapters,'opening cards and collecting favorites must not change lessons');
  assert.equal(isUnlocked(stored(ctx.window),2),false);
  const reloaded=await builtDom({saved:seedFrom(ctx.window),hash:'#explore/memes'});t.after(()=>reloaded.window.close());
  assert.equal(activePage(reloaded.document).id,'explore-page');
  favorite=activePage(reloaded.document).querySelector(`[data-favorite="${favoriteId}"]`);
  assert.equal(favorite.getAttribute('aria-pressed'),'true');
  reloaded.document.querySelector('[data-explore-topic="favorites"]').click();await pause(20);
  assert.equal(reloaded.window.location.hash,'#explore/favorites');
  favorite=activePage(reloaded.document).querySelector(`[data-favorite="${favoriteId}"]`);assert.ok(favorite,'saved favorites are available in one collection');
  favorite.click();assert.equal(activePage(reloaded.document).querySelector(`[data-favorite="${favoriteId}"]`),null);
  assert.equal(stored(reloaded.window).explore.favorites.includes(favoriteId),false);
  assert.deepEqual(stored(reloaded.window).chapters,emptyChapters);
  activePage(reloaded.document).querySelector('[data-random-fun]').click();await pause(20);
  assert.match(reloaded.window.location.hash,/^#explore\/(china|memes|discover)\/[a-z0-9-]+$/);
  assert.ok(activePage(reloaded.document).querySelector('[data-fun-card][aria-expanded="true"]'),'a random discovery opens its real explanatory card');
  assert.deepEqual(stored(reloaded.window).chapters,emptyChapters);
  assert.deepEqual(ctx.errors,[]);assert.deepEqual(reloaded.errors,[]);
});

test('opening, cancelling, then explicitly accepting reset preserves the intended boundary',async t=>{
  const p=confirmedThrough(2);p.chapters[2].note='先保留这条笔记';p.explore.favorites=['memes-bias'];
  const ctx=await builtDom({saved:storageSeed(p),hash:'#chapter/2'});t.after(()=>ctx.window.close());
  const q=s=>ctx.document.querySelector(s);
  q('#reset-progress').click();assert.equal(stored(ctx.window)?.chapters[2].completed??loadProgress(ctx.window.localStorage).chapters[2].completed,true);
  q('[data-dismiss-dialog]').click();assert.equal(loadProgress(ctx.window.localStorage).chapters[2].note,p.chapters[2].note);assert.deepEqual(loadProgress(ctx.window.localStorage).explore.favorites,p.explore.favorites);
  q('#reset-progress').click();q('#confirm-reset').click();
  const reset=loadProgress(ctx.window.localStorage);assert.equal(reset.chapters[1].completed,false);assert.equal(reset.chapters[2].note,'');assert.equal(isUnlocked(reset,2),false);assert.deepEqual(reset.explore.favorites,[]);assert.deepEqual(ctx.errors,[]);
});

test('blocked localStorage keeps the full application usable and explains its save limitation',async t=>{
  const ctx=await builtDom({hash:'#lesson',blockStorage:true});t.after(()=>ctx.window.close());
  assert.deepEqual(ctx.errors,[]);const page=activePage(ctx.document);assert.ok(page);
  page.querySelector('[data-task]').click();const note=page.querySelector('[data-note]')??page.querySelector('#personal-note');note.value='不能保存时也可以学习';note.dispatchEvent(new ctx.window.Event('input',{bubbles:true}));await pause(410);
  assert.deepEqual(ctx.errors,[]);assert.match(page.textContent,/禁止|未允许|无法|导出/);
});

test('each practical tool persists its choices and writes a useful plan without checking tasks',async t=>{
  const ctx=await builtDom({saved:storageSeed(confirmedThrough(5))});t.after(()=>ctx.window.close());
  for(let id=2;id<=5;id++){
    await navigate(ctx,`#chapter/${id}`);
    const c=chapters[id-1],choices=c.tool.choices;
    let page=activePage(ctx.document);
    page.querySelector(`[data-tool-choice="${choices[1].id}"]`).click();
    let state=stored(ctx.window).chapters[id];
    if(id===4){
      assert.deepEqual(state.tool.selected,[choices[1].id]);
      page.querySelector(`[data-tool-choice="${choices[0].id}"]`).click();
      assert.equal(stored(ctx.window).chapters[id].tool.selected.length,2);
      page.querySelector(`[data-tool-choice="${choices[0].id}"]`).click();
      assert.deepEqual(stored(ctx.window).chapters[id].tool.selected,[choices[1].id]);
    }else assert.equal(state.tool.choice,choices[1].id);
    if(id===2){
      page.querySelector('[data-channel-save]').click();
      assert.deepEqual(stored(ctx.window).chapters[id].tool.saved,[choices[1].id]);
    }
    if(id===5){
      const check=page.querySelector('[data-tool-check]');assert.ok(check);
      const key=check.dataset.toolCheck;check.click();
      assert.equal(stored(ctx.window).chapters[id].tool.checks[key],true);
    }
    page.querySelector('[data-tool-to-note]').click();
    state=stored(ctx.window).chapters[id];
    assert.ok(state.note.includes(choices[1].title));assert.ok(state.note.includes(c.tool.title));
    assert.equal(page.querySelector('[data-note]').value,state.note);
    const firstCopy=state.note;page.querySelector('[data-tool-to-note]').click();
    assert.equal(stored(ctx.window).chapters[id].note,firstCopy,'writing the same plan again must not duplicate it');
    await navigate(ctx,'#notebook');await navigate(ctx,`#chapter/${id}`);
    page=activePage(ctx.document);
    assert.equal(page.querySelector(`[data-tool-choice="${choices[1].id}"]`).getAttribute('aria-pressed'),'true');
    if(id===2)assert.equal(page.querySelector('[data-channel-save]').checked,true);
    if(id===5)assert.equal(page.querySelector('[data-tool-check]').checked,true);
  }
  assert.deepEqual(ctx.errors,[]);
  const unconfirmed=await builtDom({saved:storageSeed(confirmedThrough(1)),hash:'#chapter/2'});t.after(()=>unconfirmed.window.close());
  let page=activePage(unconfirmed.document);page.querySelector('[data-channel-save]').click();page.querySelector('[data-tool-to-note]').click();
  assert.deepEqual(stored(unconfirmed.window).chapters[2].tasks,[false,false,false]);
  assert.equal(stored(unconfirmed.window).chapters[2].completed,false);
});

test('switching chapters before the note debounce finishes preserves separate notes and notebook locks',async t=>{
  const ctx=await builtDom({saved:storageSeed(confirmedThrough(2)),hash:'#chapter/2'});t.after(()=>ctx.window.close());
  const type=(id,text)=>{const el=activePage(ctx.document).querySelector(`[data-note][data-level="${id}"]`);assert.ok(el);el.value=text;el.dispatchEvent(new ctx.window.Event('input',{bubbles:true}));};
  type(2,'第二关：先保留 Weverse');await navigate(ctx,'#chapter/3');
  type(3,'第三关：每周一集团综');await navigate(ctx,'#notebook');
  const p=stored(ctx.window);assert.equal(p.chapters[2].note,'第二关：先保留 Weverse');assert.equal(p.chapters[3].note,'第三关：每周一集团综');
  const page=activePage(ctx.document);assert.equal(page.querySelector('[data-note][data-level="2"]').value,p.chapters[2].note);assert.equal(page.querySelector('[data-note][data-level="3"]').value,p.chapters[3].note);
  assert.equal(page.querySelector('[data-note][data-level="4"]'),null,'locked chapters must not be editable in the notebook');
  const notebookNote=page.querySelector('[data-note][data-level="3"]');notebookNote.value='在总手记中补充';notebookNote.dispatchEvent(new ctx.window.Event('input',{bubbles:true}));await navigate(ctx,'#chapter/3');
  assert.equal(activePage(ctx.document).querySelector('[data-note]').value,'在总手记中补充');
  assert.equal(stored(ctx.window).chapters[2].note,'第二关：先保留 Weverse');assert.deepEqual(ctx.errors,[]);
});

test('backup import requires explicit replacement and cannot introduce skipped confirmations',async t=>{
  const current=confirmedThrough(1);current.chapters[1].note='当前记录保留';current.explore.favorites=['china-news'];
  const incoming=confirmedThrough(3);incoming.chapters[1].note='来自备份的第一关';incoming.chapters[3].note='来自备份的第三关';incoming.explore.favorites=['memes-bias'];
  const invalid=structuredClone(incoming);invalid.chapters[2].completed=false;
  const normalized=normalizeProgress(invalid);assert.equal(normalized.chapters[3].completed,false);assert.equal(isUnlocked(normalized,4),false);assert.equal(normalized.chapters[3].note,incoming.chapters[3].note);
  const ctx=await builtDom({saved:storageSeed(current),hash:'#notebook'});t.after(()=>ctx.window.close());
  const input=ctx.document.querySelector('#backup-file');
  const selectBackup=async value=>{const text=typeof value==='string'?value:JSON.stringify(value);Object.defineProperty(input,'files',{configurable:true,value:[{size:text.length,text:async()=>text}]});input.dispatchEvent(new ctx.window.Event('change',{bubbles:true}));await pause(20);};
  await selectBackup(incoming);
  assert.ok(ctx.document.querySelector('#confirm-import'));
  assert.equal(loadProgress(ctx.window.localStorage).chapters[1].note,current.chapters[1].note,'choosing a file alone must not replace records');
  ctx.document.querySelector('[data-dismiss-dialog]').click();
  assert.equal(loadProgress(ctx.window.localStorage).chapters[1].note,current.chapters[1].note);
  assert.deepEqual(loadProgress(ctx.window.localStorage).explore.favorites,current.explore.favorites);
  await selectBackup(incoming);ctx.document.querySelector('#confirm-import').click();
  const restored=loadProgress(ctx.window.localStorage);assert.equal(restored.chapters[1].note,incoming.chapters[1].note);assert.equal(restored.chapters[3].note,incoming.chapters[3].note);assert.equal(isUnlocked(restored,4),true);
  assert.deepEqual(restored.explore.favorites,incoming.explore.favorites);
  await selectBackup('{this is not JSON');
  assert.equal(loadProgress(ctx.window.localStorage).chapters[3].note,incoming.chapters[3].note);assert.deepEqual(ctx.errors,[]);
});
