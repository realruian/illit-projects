import { members, intro, terms, levels, sources } from "./content.js";
import { memberDetails, memberNameSources } from "./member-details.js";
import { chapters } from "./curriculum.js";
import { assetSources } from "./assets-data.js";
import { exploreTopics } from "./explore-content.js";
import {
  STORAGE_KEY,
  freshProgress,
  loadProgress,
  saveProgress,
  isUnlocked,
  canConfirm,
  confirmChapter,
  getCurrentLevel,
  normalizeProgress,
} from "./progression.js";

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const external = (url, label, cls = "") =>
  `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)}<span class="sr-only">（在新标签页打开）</span></a>`;
const memberImages = {
  yunah: "assets/yunah.webp",
  minju: "assets/minju.webp",
  moka: "assets/moka.webp",
  wonhee: "assets/wonhee.webp",
  iroha: "assets/iroha.webp",
};
const chapterNames = ["", "一", "二", "三", "四", "五"];
const chapterRoute = (id) => (id === 1 ? "#lesson" : `#chapter/${id}`);
const chapterFor = (id) => chapters.find((c) => c.id === id);
let storage;
try {
  storage = window.localStorage;
} catch {
  storage = {
    getItem: () => null,
    setItem: () => {
      throw new Error("blocked");
    },
    removeItem: () => {},
  };
}
let progress = loadProgress(storage),
  activeLevel = 1,
  selectedMember = 0,
  currentPage = null,
  noteTimer,
  toastTimer,
  previousDialogFocus,
  pendingImport;
const openFunCards = new Set();
const dialog = $("#info-dialog");
function announce(message) {
  clearTimeout(toastTimer);
  $("#toast").textContent = message;
  $("#toast").hidden = false;
  toastTimer = setTimeout(() => {
    $("#toast").hidden = true;
  }, 4200);
}
function persist() {
  const saved = saveProgress(storage, progress);
  $$("[data-save-status],#save-status").forEach(
    (e) =>
      (e.textContent = saved
        ? "已保存在当前浏览器"
        : "浏览器未允许保存，请导出或备份记录"),
  );
  return saved;
}
function downloadText(text, name, type = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function closeMobileMenu() {
  $(".menu-toggle").setAttribute("aria-expanded", "false");
  $(".menu-toggle").setAttribute("aria-label", "打开导航");
  $("#mobile-nav").hidden = true;
}
function showDialog(kicker, html) {
  previousDialogFocus = document.activeElement;
  $("#dialog-kicker").textContent = kicker;
  $("#dialog-content").innerHTML = html;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("dialog-open");
  $("#close-dialog").focus();
}
function closeDialog() {
  dialog.close();
}
function confirmedCount() {
  return chapters.filter((c) => progress.chapters[c.id].completed).length;
}
function renderLevels() {
  const current = getCurrentLevel(progress);
  $("#level-list").innerHTML = levels
    .map((l) => {
      const saved = progress.chapters[l.id],
        unlocked = isUnlocked(progress, l.id),
        status = saved.completed
          ? "已由你确认 / CONFIRMED"
          : unlocked
            ? "现在可以学习 / READY"
            : "待解锁 / LOCKED";
      return `<div class="level-row ${l.id === current ? "is-current" : ""}"><span class="level-number">0${l.id}</span><h3 class="level-title">${l.title}<small>${status}</small></h3><p class="level-description">${l.description}</p>${unlocked ? `<a class="level-action" href="${chapterRoute(l.id)}"><span>${saved.completed ? "回看本关" : "进入本关"}</span><span aria-hidden="true">↗</span></a>` : `<button class="level-action" data-preview-level="${l.id}" aria-label="查看第${l.id}关简介：${l.title}"><span>查看简介</span><span aria-hidden="true">＋</span></button>`}</div>`;
    })
    .join("");
}
function updateGlobal() {
  const current = getCurrentLevel(progress),
    count = confirmedCount();
  $("[data-overall]").innerHTML = `0${count}<span>/ 05</span>`;
  $("[data-current-level]").textContent =
    count === 5 ? "五关全部已确认" : `当前第${chapterNames[current]}关`;
  $$("[data-continue]").forEach((e) => {
    e.textContent = count === 5 ? "回看旅程" : count ? "继续心动" : "开始心动";
    e.closest("a").href = chapterRoute(current);
  });
  const homeContinue = $("[data-home-continue]");
  homeContinue.textContent =
    count === 5
      ? "回看第五关"
      : current === 1
        ? "继续第一关"
        : `继续第${chapterNames[current]}关`;
  homeContinue.closest("a").href = chapterRoute(current);
  renderLevels();
}

$("#member-strip").innerHTML = members
  .map(
    (m) =>
      `<a class="member-preview" href="#lesson/members/${m.id}"><div class="member-thumb"><img src="${memberImages[m.id]}" alt="${memberDetails[m.id].zh} ${m.name} 官方成员照" width="800" height="1067" loading="lazy"></div><div class="member-label"><span>${m.name}</span><span>${memberDetails[m.id].zh}</span></div></a>`,
  )
  .join("");
$("#goals-list").innerHTML = intro.goals
  .map((g, i) => `<p class="goal"><span>0${i + 1}</span><span>${g}</span></p>`)
  .join("");
$("#member-tabs").innerHTML = members
  .map(
    (m, i) =>
      `<button role="tab" id="tab-${m.id}" aria-controls="member-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-member="${i}"><span>${m.name}</span><small>${memberDetails[m.id].zh}</small></button>`,
  )
  .join("");
const extraMember = document.createElement("div");
extraMember.id = "member-extra";
$("#member-panel").after(extraMember);
function selectMember(index, focus = false) {
  selectedMember = (index + members.length) % members.length;
  const m = members[selectedMember],
    d = memberDetails[m.id],
    panel = $("#member-panel");
  panel.setAttribute("aria-labelledby", `tab-${m.id}`);
  panel.innerHTML = `<div class="member-portrait image-swap"><img src="${memberImages[m.id]}" alt="${d.zh} ${m.name} 官方档案照" width="800" height="1067"><span class="member-photo-label">ILLIT / ${m.name}</span></div><div class="member-detail"><p class="eyebrow">MEET 0${selectedMember + 1} / 05</p><h3>${m.name}</h3><p class="member-chinese">${d.zh} <span lang="ko">${m.ko}</span></p><dl class="member-fact"><dt>BIRTHDAY / 生日</dt><dd>${m.birthday}</dd></dl><p class="member-summary">${esc(d.summary)}</p><div class="member-switcher"><button data-member-step="-1" aria-label="上一位成员">←</button><span aria-live="polite">0${selectedMember + 1} / 05</span><button data-member-step="1" aria-label="下一位成员">→</button></div></div>`;
  $("#member-extra").innerHTML =
    `<div class="member-deep-read"><div class="member-listen"><p class="eyebrow">LISTEN & LOOK / 听歌的小观察</p><p>${esc(d.listenFor)}</p></div><div class="member-highlights">${d.highlights.map((h) => `<article><h4>${esc(h.title)}</h4><p>${esc(h.text)}</p></article>`).join("")}</div><div class="recognition-tips"><h4>怎样慢慢记住她</h4><ol>${d.recognizeTips.map((t) => `<li>${esc(t)}</li>`).join("")}</ol></div><details class="reading-sources"><summary>姓名说明与访谈出处</summary><p>${esc(d.nameNote)} 以下内容为官方访谈的中文转述，不是固定担当或人设标签。</p><ul>${d.sources.map((s) => `<li>${external(s.url, s.title)}</li>`).join("")}</ul></details></div>`;
  $$("[data-member]").forEach((b, i) => {
    b.setAttribute("aria-selected", String(i === selectedMember));
    b.tabIndex = i === selectedMember ? 0 : -1;
  });
  if (focus) $(`#tab-${m.id}`).focus();
}
$("#member-tabs").addEventListener("keydown", (e) => {
  const focused = e.target.closest("[role=tab]");
  if (!focused) return;
  let n = Number(focused.dataset.member);
  if (e.key === "ArrowRight") n++;
  else if (e.key === "ArrowLeft") n--;
  else if (e.key === "Home") n = 0;
  else if (e.key === "End") n = 4;
  else return;
  e.preventDefault();
  selectMember(n, true);
});
$("#timeline").innerHTML = intro.timeline
  .map(
    (t) =>
      `<article class="timeline-row"><span class="timeline-date">${t.date}</span><h3 class="timeline-title">${t.title}</h3><p class="timeline-text">${t.text}</p></article>`,
  )
  .join("");
$("#term-grid").innerHTML = terms
  .map(
    (t, i) =>
      `<button class="term-card" data-term="${i}" aria-pressed="false" aria-label="翻开术语：${t.term}"><span class="term-card-inner"><span class="term-face term-front"><span class="term-no">FAN DICTIONARY / 0${i + 1}</span><span class="term-word">${t.term}</span><span class="term-en">${t.en}</span><span class="term-hint"><span>翻过来看看</span><span aria-hidden="true">↗</span></span></span><span class="term-face term-back" aria-hidden="true"><strong>${t.term}</strong><span class="term-definition">${t.definition}</span><span class="term-example">${t.example}</span><span class="term-hint"><span>返回词条</span><span aria-hidden="true">↶</span></span></span></span></button>`,
  )
  .join("");

function allFunCards() {
  return exploreTopics.flatMap((topic) =>
    topic.cards.map((card) => ({
      ...card,
      topicId: topic.id,
      topicTitle: topic.title,
    })),
  );
}
function renderExploreHome() {
  $("#explore-tiles").innerHTML = exploreTopics
    .map(
      (topic, index) =>
        `<a class="explore-tile" href="#explore/${topic.id}"><span class="eyebrow">SIDE ${["A", "B", "C"][index]} / 自由探索</span><h3>${esc(topic.title)}</h3><p>${esc(topic.intro)}</p><span class="explore-tile-link">随便看看 <span aria-hidden="true">↗</span></span></a>`,
    )
    .join("");
}
function renderExplore(topicId = "china", cardToOpen = "") {
  const topic = exploreTopics.find((t) => t.id === topicId) || exploreTopics[0];
  const favorites = progress.explore.favorites;
  const favoritePage = topicId === "favorites";
  const cards = favoritePage
    ? allFunCards().filter((card) => favorites.includes(card.id))
    : topic.cards;
  if (cardToOpen && cards.some((card) => card.id === cardToOpen))
    openFunCards.add(cardToOpen);
  $("#explore-page").innerHTML =
    `<section class="explore-heading section-width"><div><p class="eyebrow">A LITTLE SIDE QUEST / 自由探索</p><h1 id="explore-title" tabindex="-1">想看哪张，<br>就点开哪张。</h1><p>中文内容、追星表达和歌曲小彩蛋。挑你感兴趣的逛一逛，喜欢的可以收藏起来。</p></div><div class="explore-welcome"><span aria-hidden="true">✦</span><p class="handwritten">Just a little fun.</p><button class="text-link" data-random-fun>今天随便看一张 ↗</button></div></section><nav class="explore-nav section-width" aria-label="自由探索主题">${exploreTopics.map((t) => `<a href="#explore/${t.id}" data-explore-topic="${t.id}" ${!favoritePage && topic.id === t.id ? 'aria-current="page"' : ""}>${esc(t.title)}</a>`).join("")}<a href="#explore/favorites" data-explore-topic="favorites" ${favoritePage ? 'aria-current="page"' : ""}>我的趣味收藏 <span>${favorites.length}</span></a></nav><section class="explore-reading section-width"><div class="section-heading"><div><p class="eyebrow">${favoritePage ? "MY LITTLE COLLECTION" : esc(topic.eyebrow)}</p><h2>${favoritePage ? "这些，都是你喜欢的。" : esc(topic.title)}</h2></div><span class="subtle">随时浏览 · 点开解释 · 喜欢就收藏</span></div><p class="reading-intro">${favoritePage ? "收藏可以反复看，也可以随时取消。这里不计入五关学习进度。" : esc(topic.intro)}</p><div class="fun-card-grid">${cards.length ? cards.map((card) => `<article id="fun-${card.id}" class="fun-card"><div class="fun-card-top"><span class="eyebrow">${esc(card.label || (favoritePage ? card.topicTitle : "LITTLE DISCOVERY"))}</span><button class="favorite-button" data-favorite="${card.id}" aria-pressed="${favorites.includes(card.id)}" aria-label="${favorites.includes(card.id) ? "取消收藏" : "收藏"}：${esc(card.title)}">${favorites.includes(card.id) ? "♥ 已收藏" : "♡ 收藏"}</button></div><h3><button data-fun-card="${card.id}" aria-expanded="${openFunCards.has(card.id)}" aria-controls="fun-body-${card.id}"><span>${esc(card.title)}</span><span aria-hidden="true">${openFunCards.has(card.id) ? "－" : "＋"}</span></button></h3><p>${esc(card.text)}</p><div class="fun-card-body" id="fun-body-${card.id}" ${openFunCards.has(card.id) ? "" : "hidden"}>${card.extra ? `<p>${esc(card.extra)}</p>` : ""}${card.sourceNote ? `<p class="fun-source-note">${esc(card.sourceNote)}</p>` : ""}${card.url ? external(card.url, `${card.linkLabel || "看看出处"} ↗`, "text-link") : ""}</div></article>`).join("") : '<p class="empty-favorites">还没有收藏。去点开一张喜欢的卡片，就可以把它留在这里。</p>'}</div>${!favoritePage ? `<details class="reading-sources"><summary>内容出处与平台说明</summary><ul>${topic.sources.map((source) => `<li>${external(source.url, source.title)}</li>`).join("")}</ul><p>通用表达与歌曲趣味会分别标注；有出处的意象不等于粉丝公认的梗。国内平台账号若未核验，不会标成艺人官方。</p></details>` : ""}</section>`;
}

function taskMarkup(id) {
  const c = chapterFor(id),
    s = progress.chapters[id];
  return c.tasks
    .map(
      (t, i) =>
        `<div class="task"><label for="task-${id}-${i}"><input id="task-${id}-${i}" data-task="${i}" data-level="${id}" type="checkbox" ${s.tasks[i] ? "checked" : ""} ><span><strong>${esc(t.title)}</strong><span class="task-text">${esc(t.text)}</span></span></label>${t.link ? external(t.link, `${t.linkLabel || "官方资源"} ↗`, "text-link") : ""}</div>`,
    )
    .join("");
}
function quizMarkup(id) {
  const c = chapterFor(id),
    s = progress.chapters[id];
  return c.quiz
    .map((q, i) => {
      const a = s.answers[i],
        answered = a !== null;
      return `<article class="quiz-item"><h3 id="question-${id}-${i}" class="quiz-question"><span>0${i + 1}</span>${esc(q.question)}</h3><div class="quiz-options" role="radiogroup" aria-labelledby="question-${id}-${i}">${q.options.map((o, j) => `<button class="quiz-option " role="radio" data-level="${id}" data-question="${i}" data-answer="${j}" aria-checked="${a === j}" tabindex="${a === j || (a === null && j === 0) ? 0 : -1}" ><span>${String.fromCharCode(65 + j)}</span>${esc(o)}</button>`).join("")}</div><p class="quiz-feedback " role="status" ${answered ? "" : "hidden"}>${answered ? `补充说明： ${esc(q.explanation)}` : ""}</p></article>`;
    })
    .join("");
}
function practiceMarkup(id) {
  return `<section id="chapter-practice" class="practice-section"><div class="section-width"><div class="section-heading"><div><p class="eyebrow">MAKE IT YOURS / CHAPTER 0${id}</p><h2>挑喜欢的，随手试试看。</h2></div><span class="subtle">想做就做，也可以直接继续。</span></div><div class="practice-layout"><div><h3 class="mini-heading">随手试试 · 可跳过 <span data-task-count></span></h3><div data-task-list>${taskMarkup(id)}</div></div><div id="chapter-notes" class="notebook"><div class="notebook-head"><span class="eyebrow">MY LITTLE NOTE / 0${id}</span><span aria-hidden="true">✎</span></div><label for="note-${id}">留下一点属于你的记录。</label><textarea id="note-${id}" data-note data-level="${id}" rows="7" maxlength="8000" placeholder="记下你的选择、计划，或还想了解的问题……">${esc(progress.chapters[id].note)}</textarea><div class="note-footer"><span data-save-status role="status">仅保存在当前浏览器</span><button class="inline-button" data-export-note="${id}">导出本关手记 ↗</button></div><p class="note-hint">每关单独保存。不用写满，也不用勾选完。按自己的节奏就好。</p></div></div></div></section><section class="quiz-section section-width" aria-labelledby="chapter-quiz-heading"><div class="section-heading"><div><p class="eyebrow">A SMALL RECAP</p><h2 id="chapter-quiz-heading">想巩固时，再随手想一想。</h2></div><span class="subtle">可跳过，不计分，不影响继续学习。</span></div><details class="optional-quiz"><summary>展开三个小问题（可跳过）</summary><div data-quiz-list>${quizMarkup(id)}</div></details></section><section class="confirmation-section section-width"><div class="confirmation-mark" aria-hidden="true">✦</div><p class="eyebrow">ONE STEP CLOSER / 0${id}</p><h2 data-confirmation-title></h2><p data-confirmation-copy></p><p data-completion-status role="status" class="completion-status"></p><button class="solid-link" data-confirm-chapter="${id}">该部分已确认 <span aria-hidden="true">↗</span></button><a class="solid-link" data-next-chapter hidden href="${id < 5 ? chapterRoute(id + 1) : "#notebook"}">${id < 5 ? `进入第${chapterNames[id + 1]}关` : "回顾我的五关手记"} <span aria-hidden="true">↗</span></a><a class="text-link back-to-route" href="#home/route">返回完整学习路线 ↗</a></section>`;
}
function studyRoot(id) {
  return id === 1 ? $("#lesson-page") : $("#chapter-page");
}
function updateStudy(id) {
  const root = studyRoot(id),
    s = progress.chapters[id];
  if (!root || !s) return;
  const done = s.tasks.filter(Boolean).length;
  $$("[data-task-count]", root).forEach(
    (e) => (e.textContent = done ? `已试过 ${done} 项` : "任选"),
  );
  $$("[data-task-progress]", root).forEach(
    (e) => (e.textContent = "随手体验 · 可跳过"),
  );
  const confirm = $("[data-confirm-chapter]", root),
    next = $("[data-next-chapter],#next-level", root);
  if (confirm) {
    confirm.disabled = !canConfirm(progress, id) || s.completed;
    confirm.hidden = s.completed;
  }
  if (next) next.hidden = !s.completed;
  const heading = $("[data-confirmation-title],#confirmation-title", root),
    copy = $("[data-confirmation-copy],#confirmation-copy", root),
    status = $("[data-completion-status],#completion-status", root);
  if (heading)
    heading.textContent = s.completed
      ? `第${chapterNames[id]}关，已由你确认。`
      : `第${chapterNames[id]}关，由你来确认。`;
  if (copy)
    copy.textContent = s.completed
      ? id === 5
        ? "五段旅程都已留下你的确认。以后也可以回来复习和更新笔记。"
        : `下一关「${levels[id].title}」已解锁，准备好时再继续。`
      : "读到这里，准备好了就继续。实践和小问题都可以跳过。";
  if (status)
    status.textContent = s.completed
      ? `CONFIRMED / ${confirmedCount()} OF 05`
      : canConfirm(progress, id)
        ? "不需要交作业或答题。点击下方按钮，由你确认继续。"
        : "准备好时，由你主动确认继续。";
}
function renderFirstPractice() {
  $("#task-list").innerHTML = taskMarkup(1);
  $("#quiz-list").innerHTML = quizMarkup(1);
  $("#personal-note").value = progress.chapters[1].note;
  updateStudy(1);
}
function knowledgeMarkup(section, index) {
  return `<section id="reading-${index}" class="learning-section ${index % 2 ? "learning-surface" : ""}"><div class="section-width"><div class="section-heading"><div><p class="eyebrow">${esc(section.kicker || `READING / 0${index + 1}`)}</p><h2>${esc(section.title)}</h2></div></div>${section.intro ? `<p class="reading-intro">${esc(section.intro)}</p>` : ""}<div class="knowledge-list">${section.items.map((item, i) => `<article class="knowledge-item"><div class="knowledge-label"><span>0${i + 1}</span><h3>${esc(item.title)}</h3>${item.label ? `<small>${esc(item.label)}</small>` : ""}</div><div class="knowledge-copy"><p>${esc(item.text)}</p>${item.steps?.length ? `<ol>${item.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}${item.url ? external(item.url, `${item.linkLabel || "打开官方入口"} ↗`, "text-link") : ""}</div></article>`).join("")}</div></div></section>`;
}
function toolMarkup(id) {
  const t = chapterFor(id).tool,
    s = progress.chapters[id].tool,
    choices = t.choices,
    selected =
      s.choice && choices.some((c) => c.id === s.choice)
        ? s.choice
        : choices[0].id;
  const choice = choices.find((c) => c.id === selected),
    multi = t.type === "comeback-planner";
  const selectedRoutes = (s.selected || []).filter((key) =>
    choices.some((c) => c.id === key),
  );
  const list = multi
    ? choices.filter((c) => selectedRoutes.includes(c.id))
    : [choice];
  return `<div class="section-heading"><div><p class="eyebrow">TRY IT HERE / CHAPTER 0${id}</p><h2>${esc(t.title)}</h2></div></div><p class="reading-intro">${esc(t.intro)}</p><div class="choice-tabs" role="group" aria-label="${esc(t.title)}">${choices.map((c) => `<button data-tool-choice="${esc(c.id)}" data-level="${id}" aria-pressed="${multi ? selectedRoutes.includes(c.id) : c.id === selected}">${esc(c.label)}</button>`).join("")}</div><div class="tool-results" aria-live="polite">${list.length ? list.map((c) => `<article class="tool-result"><p class="eyebrow">YOUR CHOICE / ${esc(c.label)}</p><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p>${c.steps?.length ? (t.type === "event-checklist" ? `<div class="event-checks">${c.steps.map((step, i) => `<label><input type="checkbox" data-tool-check="${esc(c.id)}-${i}" data-level="${id}" ${s.checks?.[`${c.id}-${i}`] ? "checked" : ""}><span>${esc(step)}</span></label>`).join("")}</div>` : `<ol>${c.steps.map((step) => `<li>${esc(step)}</li>`).join("")}</ol>`) : ""}${c.url ? external(c.url, `${c.linkLabel || "官方入口"} ↗`, "text-link") : ""}${t.type === "channels" ? `<label class="channel-save"><input type="checkbox" data-channel-save="${esc(c.id)}" data-level="${id}" ${(s.saved || []).includes(c.id) ? "checked" : ""}><span>加入我的信息清单</span></label>` : ""}</article>`).join("") : '<p class="empty-tool">先选一项你想参与的方式，生成自己的回归小计划。</p>'}</div>${
    t.type === "channels"
      ? `<p class="tool-saved">我的信息清单：${
          choices
            .filter((c) => (s.saved || []).includes(c.id))
            .map((c) => esc(c.label))
            .join("、") || "还没有添加。可以从一两个平台开始。"
        }</p>`
      : ""
  }<div class="tool-footer"><button class="text-link" data-tool-to-note="${id}">把这份选择写入本关笔记 ↗</button><span>工具只整理计划，不会代你关注、投票、报名或购买。</span></div>`;
}
function renderChapter(id) {
  const c = chapterFor(id);
  $("#chapter-page").innerHTML =
    `<div class="breadcrumb section-width"><a href="#home">首页</a><span>/</span><a href="#home/route">五关旅程</a><span>/</span><span>第${chapterNames[id]}关</span></div><section class="lesson-cover section-width"><div class="lesson-cover-copy"><p class="eyebrow">${esc(c.eyebrow || `CHAPTER 0${id}`)}</p><span class="chapter-outline" aria-hidden="true">0${id}</span><h1 id="chapter-title" class="subsequent-heading" tabindex="-1">${esc(c.title)}</h1><p>${esc(c.intro)}</p><a class="text-link" href="#chapter/${id}/reading-0">从本关第一节开始 ↓</a></div><figure><img src="${c.image}" alt="${esc(c.imageAlt)}" width="1500" height="1000"><figcaption>${esc(c.imageCredit?.label || "ILLIT 官方概念素材")}${c.imageCredit?.url ? external(c.imageCredit.url, "图片来源 ↗") : ""}</figcaption></figure></section><nav class="chapter-nav" aria-label="第${chapterNames[id]}关章节"><div class="section-width">${c.sections.map((s, i) => `<a href="#chapter/${id}/reading-${i}">0${i + 1} ${esc(s.title)}</a>`).join("")}<a href="#chapter/${id}/chapter-tool">站内练习</a><a href="#chapter/${id}/chapter-practice">随手体验</a></div></nav><div class="lesson-goals section-width"><p class="eyebrow">这一关，你会学到</p><div>${c.goals.map((g, i) => `<p class="goal"><span>0${i + 1}</span><span>${esc(g)}</span></p>`).join("")}</div></div>${c.sections.map(knowledgeMarkup).join("")}<section id="chapter-tool" class="chapter-tool section-width" data-tool-level="${id}">${toolMarkup(id)}</section>${practiceMarkup(id)}<div class="section-width chapter-source-note"><details class="reading-sources"><summary>本关核验来源 · 2026.11.08</summary><p>站内内容用于理解流程。活动日期、资格和投票办法以对应当期公告为准。</p><ul>${c.sources.map((s) => `<li>${external(s.url, s.title)}${s.supports ? `<span>${esc(s.supports)}</span>` : ""}</li>`).join("")}</ul></details></div>`;
  updateStudy(id);
}
function refreshTool(id) {
  const root = $(`[data-tool-level="${id}"]`);
  if (root) root.innerHTML = toolMarkup(id);
}
function renderLocked(id) {
  const l = levels[id - 1];
  $("#chapter-page").innerHTML = "";
  $("#locked-page").innerHTML =
    `<section class="locked-intro section-width"><p class="eyebrow">CHAPTER 0${id} / PREVIEW</p><span class="locked-number">0${id}</span><h1 id="locked-title" tabindex="-1">${l.title}</h1><p>${l.description}</p><p class="locked-reason">完成第${chapterNames[id - 1]}关，并主动点击「该部分已确认」后，本关完整学习内容才会开放。</p><a class="solid-link" href="${chapterRoute(getCurrentLevel(progress))}">继续当前关卡 <span aria-hidden="true">↗</span></a><a class="text-link" href="#home/route">查看完整路线 ↗</a></section>`;
}
function renderNotebook() {
  const count = confirmedCount();
  $("#notebook-page").innerHTML =
    `<section class="notebook-overview section-width"><p class="eyebrow">MY LITTLE FAN NOTES</p><h1 id="notebook-title" tabindex="-1">每一次靠近，<br>都值得记下来。</h1><p>五关手记各自保存。当前已由你确认 ${count}/5 关；记录仅保存在本浏览器，换设备前可以先备份。</p><div class="notebook-actions"><button class="solid-link" data-export-all-notes>导出全部手记 ↗</button><button class="text-link" data-backup>备份进度与手记 ↗</button><button class="text-link" data-restore>导入备份 ↗</button><a class="text-link" href="#explore/favorites">看看我的趣味收藏 ↗</a></div></section><div class="section-width notebook-collection">${chapters
      .map((c) => {
        const unlocked = isUnlocked(progress, c.id);
        return `<article class="notebook-entry"><div><p class="eyebrow">CHAPTER 0${c.id} / ${progress.chapters[c.id].completed ? "CONFIRMED" : unlocked ? "LEARNING" : "LOCKED"}</p><h2>${c.title}</h2>${unlocked ? `<a class="text-link" href="${chapterRoute(c.id)}">返回本关 ↗</a>` : '<p class="subtle">解锁本关后，开始记录。</p>'}</div><div>${unlocked ? `<label class="sr-only" for="book-note-${c.id}">第${chapterNames[c.id]}关手记</label><textarea id="book-note-${c.id}" data-note data-level="${c.id}" rows="5" maxlength="8000" placeholder="这一关，你想留下什么？">${esc(progress.chapters[c.id].note)}</textarea><div class="note-footer"><span data-save-status role="status">仅保存在当前浏览器</span><button class="inline-button" data-export-note="${c.id}">导出本关 ↗</button></div>` : '<div class="notebook-locked">这一页，等下一次心动再写。</div>'}</div></article>`;
      })
      .join("")}</div>`;
}
function chooseAnswer(id, q, a, focus = false) {
  if (!isUnlocked(progress, id)) return;
  progress.chapters[id].answers[q] = a;
  persist();
  const root = studyRoot(id);
  $("[data-quiz-list],#quiz-list", root).innerHTML = quizMarkup(id);
  updateStudy(id);
  if (focus) $(`[data-question="${q}"][data-answer="${a}"]`, root).focus();
}
function previewLevel(id) {
  if (isUnlocked(progress, id)) {
    location.hash = chapterRoute(id);
    return;
  }
  const l = levels[id - 1];
  showDialog(
    `CHAPTER 0${id} / PREVIEW`,
    `<h2 id="dialog-title">${l.title}</h2><p>${l.description}</p><p class="dialog-note">完成第${chapterNames[id - 1]}关并主动确认后解锁。现在可以先了解这一段旅程的主题。</p><a class="solid-link" href="${chapterRoute(getCurrentLevel(progress))}" data-dismiss-dialog>继续当前关卡 <span aria-hidden="true">↗</span></a>`,
  );
}
function showSources() {
  const all = [
    ...sources,
    ...memberNameSources,
    ...Object.values(memberDetails).flatMap((d) => d.sources),
    ...chapters.slice(1).flatMap((c) => c.sources),
    ...exploreTopics.flatMap((t) => t.sources),
  ];
  const unique = [...new Map(all.map((s) => [s.url, s])).values()];
  showDialog(
    "CREDITS / CHECKED 2026.11.08",
    `<h2 id="dialog-title">资料与素材来源</h2><p>这是非官方个人中文学习空间。中文名字采用可核验的常用写法；成员故事来自访谈转述，核心讲解可以直接在站内阅读。照片与标志权利归原权利人所有。</p><h3 class="source-group-title">学习资料与姓名核验</h3><ul>${unique.map((s) => `<li>${external(s.url, s.title)}${s.supports ? `<span>${esc(s.supports)}</span>` : ""}</li>`).join("")}</ul><h3 class="source-group-title">摄影与视觉素材</h3><ul>${assetSources.map((a) => `<li>${external(a.sourcePage, a.name)}<span>${esc(a.period)}</span></li>`).join("")}</ul><p>图片为不同作品时期的官方素材。字体 Jost 使用 SIL Open Font License，中文采用设备系统字体。活动历史示例均不代表目前仍可报名。</p>`,
  );
}
function writeToolToNote(id) {
  const c = chapterFor(id),
    t = c.tool,
    s = progress.chapters[id].tool;
  const chosen =
    t.type === "comeback-planner"
      ? t.choices.filter((v) => (s.selected || []).includes(v.id))
      : t.type === "channels"
        ? t.choices.filter((v) => (s.saved || []).includes(v.id))
        : [t.choices.find((v) => v.id === s.choice) || t.choices[0]];
  if (!chosen.length) {
    announce("先选择你想保留的内容。");
    return;
  }
  const block =
    `【${t.title}】\n` +
    chosen
      .map(
        (v) =>
          `${v.label}：${v.title}\n${v.text}\n${(v.steps || []).map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
      )
      .join("\n\n");
  const before = progress.chapters[id].note;
  if (before.includes(block)) {
    announce("这份选择已经在你的本关笔记里。");
    return;
  }
  const combined = before ? `${before}\n\n${block}` : block;
  if (combined.length > 8000) {
    announce("本关笔记已接近字数上限，请先导出并整理。");
    return;
  }
  progress.chapters[id].note = combined;
  persist();
  $$(`[data-note][data-level="${id}"]`).forEach((e) => (e.value = combined));
  announce("已写入本关笔记；实践仍由你亲手勾选。");
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("a,button");
  if (!b) return;
  if (b.matches(".skip-link")) {
    e.preventDefault();
    const main = $("#main");
    main.tabIndex = -1;
    main.focus();
    main.scrollIntoView?.();
    return;
  }
  if (b.tagName === "A" && b.getAttribute("href") === location.hash) {
    e.preventDefault();
    locationChanged();
  }
  if (b.matches("[data-member]")) selectMember(Number(b.dataset.member));
  if (b.matches("[data-member-step]")) {
    const step = Number(b.dataset.memberStep);
    selectMember(selectedMember + step);
    $(`[data-member-step="${step}"]`).focus();
  }
  if (b.matches("[data-term]")) {
    const flipped = b.getAttribute("aria-pressed") !== "true",
      t = terms[Number(b.dataset.term)];
    b.setAttribute("aria-pressed", String(flipped));
    $(".term-front", b).setAttribute("aria-hidden", String(flipped));
    $(".term-back", b).setAttribute("aria-hidden", String(!flipped));
    b.setAttribute(
      "aria-label",
      flipped
        ? `${t.term}。${t.definition} ${t.example}。再次点击返回词条。`
        : `翻开术语：${t.term}`,
    );
  }
  if (b.matches("[data-answer]"))
    chooseAnswer(
      Number(b.dataset.level),
      Number(b.dataset.question),
      Number(b.dataset.answer),
      true,
    );
  if (b.matches("[data-preview-level]"))
    previewLevel(Number(b.dataset.previewLevel));
  if (b.matches("[data-fun-card]")) {
    const id = b.dataset.funCard,
      open = !openFunCards.has(id);
    open ? openFunCards.add(id) : openFunCards.delete(id);
    b.setAttribute("aria-expanded", String(open));
    document.getElementById(`fun-body-${id}`).hidden = !open;
    b.lastElementChild.textContent = open ? "－" : "＋";
  }
  if (b.matches("[data-favorite]")) {
    const id = b.dataset.favorite;
    if (!allFunCards().some((card) => card.id === id)) return;
    const set = new Set(progress.explore.favorites);
    set.has(id) ? set.delete(id) : set.add(id);
    progress.explore.favorites = [...set];
    persist();
    const [, topic, card] = location.hash.slice(1).split("/");
    renderExplore(topic, card);
    $(`[data-favorite="${id}"]`)?.focus();
    announce(set.has(id) ? "已留在你的趣味收藏。" : "已取消收藏。");
  }
  if (b.matches("[data-random-fun]")) {
    const cards = allFunCards(),
      card = cards[Math.floor(Math.random() * cards.length)];
    location.hash = `#explore/${card.topicId}/${card.id}`;
  }
  if (b.matches("[data-sources]")) showSources();
  if (b.id === "close-dialog" || b.matches("[data-dismiss-dialog]"))
    closeDialog();
  if (b.matches("[data-confirm-chapter]")) {
    const id = Number(b.dataset.confirmChapter);
    if (!canConfirm(progress, id) || progress.chapters[id].completed) return;
    progress = confirmChapter(progress, id);
    const saved = persist();
    if (id === 1) renderFirstPractice();
    else {
      const root = studyRoot(id);
      $("[data-task-list]", root).innerHTML = taskMarkup(id);
      $("[data-quiz-list]", root).innerHTML = quizMarkup(id);
      updateStudy(id);
    }
    updateGlobal();
    $("[data-next-chapter],#next-level", studyRoot(id)).focus();
    announce(
      saved
        ? `第${chapterNames[id]}关已由你确认${id < 5 ? "，下一关已解锁。" : "，五关旅程完成。"}`
        : "本次已确认，但当前浏览器不允许保存，请备份记录。",
    );
  }
  if (b.id === "reset-progress")
    showDialog(
      "YOUR LOCAL RECORDS",
      '<h2 id="dialog-title">重新开始这段旅程？</h2><p>这会清除当前浏览器里的五关记录、笔记、工具选择、趣味收藏和确认记录。可先备份，再决定是否清除。</p><div class="dialog-actions"><button class="solid-link" id="confirm-reset">清除本机学习记录</button><button class="inline-button" data-dismiss-dialog>保留记录</button></div>',
    );
  if (b.id === "confirm-reset") {
    clearTimeout(noteTimer);
    progress = freshProgress();
    persist();
    renderFirstPractice();
    updateGlobal();
    closeDialog();
    locationChanged();
    announce("本机记录已重置，第一关仍可从头开始。");
  }
  if (b.matches("[data-export-note]")) {
    const id = Number(b.dataset.exportNote),
      text = progress.chapters[id].note;
    if (!text.trim()) {
      announce("先写下一点记录，再导出手记。");
      return;
    }
    downloadText(
      `ILLIT · 第${chapterNames[id]}关 ${levels[id - 1].title}\n\n${text}\n`,
      `ILLIT-第${chapterNames[id]}关手记.txt`,
    );
    announce("本关手记已准备下载。");
  }
  if (b.matches("[data-export-all-notes]")) {
    const text = chapters
      .map(
        (c) =>
          `第${chapterNames[c.id]}关 ${c.title}\n${progress.chapters[c.id].note || "（还没有手记）"}`,
      )
      .join("\n\n——\n\n");
    downloadText(
      `ILLIT · 我的五关追星手记\n\n${text}`,
      "ILLIT-全部追星手记.txt",
    );
  }
  if (b.id === "backup-progress" || b.matches("[data-backup]")) {
    persist();
    downloadText(
      JSON.stringify(
        {
          app: "ILLIT personal guide",
          exportedAt: new Date().toISOString(),
          ...progress,
        },
        null,
        2,
      ),
      "ILLIT-学习记录备份.json",
      "application/json",
    );
    announce("五关进度与手记已准备备份。");
  }
  if (b.id === "restore-progress" || b.matches("[data-restore]")) {
    $("#backup-file").value = "";
    $("#backup-file").click();
  }
  if (b.id === "confirm-import" && pendingImport) {
    clearTimeout(noteTimer);
    progress = pendingImport;
    pendingImport = null;
    persist();
    renderFirstPractice();
    updateGlobal();
    closeDialog();
    locationChanged();
    announce("备份已导入，已恢复可验证的逐关确认记录。");
  }
  if (b.matches("[data-tool-choice]")) {
    const id = Number(b.dataset.level),
      t = chapterFor(id).tool,
      key = b.dataset.toolChoice;
    if (!isUnlocked(progress, id)) return;
    const saved = progress.chapters[id].tool;
    if (t.type === "comeback-planner") {
      const set = new Set(saved.selected || []);
      set.has(key) ? set.delete(key) : set.add(key);
      saved.selected = [...set];
    } else saved.choice = key;
    persist();
    refreshTool(id);
    $(`[data-tool-choice="${key}"]`, $(`[data-tool-level="${id}"]`)).focus();
  }
  if (b.matches("[data-tool-to-note]"))
    writeToolToNote(Number(b.dataset.toolToNote));
  if (b.matches(".menu-toggle")) {
    const open = b.getAttribute("aria-expanded") !== "true";
    b.setAttribute("aria-expanded", String(open));
    b.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
    $("#mobile-nav").hidden = !open;
  }
  if (b.closest("#mobile-nav")) closeMobileMenu();
  if (b.matches("[data-slide]")) changeSlide(Number(b.dataset.slide));
});
document.addEventListener("change", (e) => {
  const input = e.target;
  if (input.matches("[data-task]")) {
    const id = Number(input.dataset.level);
    if (!isUnlocked(progress, id)) return;
    progress.chapters[id].tasks[Number(input.dataset.task)] = input.checked;
    persist();
    updateStudy(id);
    updateGlobal();
  }
  if (input.matches("[data-channel-save]")) {
    const id = Number(input.dataset.level),
      s = progress.chapters[id].tool,
      set = new Set(s.saved || []);
    input.checked
      ? set.add(input.dataset.channelSave)
      : set.delete(input.dataset.channelSave);
    s.saved = [...set];
    persist();
    refreshTool(id);
    $(
      `[data-channel-save="${input.dataset.channelSave}"]`,
      $(`[data-tool-level="${id}"]`),
    )?.focus();
  }
  if (input.matches("[data-tool-check]")) {
    const id = Number(input.dataset.level),
      s = progress.chapters[id].tool;
    s.checks = {
      ...(s.checks || {}),
      [input.dataset.toolCheck]: input.checked,
    };
    persist();
  }
});
document.addEventListener("input", (e) => {
  const input = e.target;
  if (!input.matches("[data-note]")) return;
  const id = Number(input.dataset.level);
  if (!isUnlocked(progress, id)) return;
  progress.chapters[id].note = input.value.slice(0, 8000);
  $$(`[data-note][data-level="${id}"]`)
    .filter((el) => el !== input)
    .forEach((el) => (el.value = progress.chapters[id].note));
  const status = $(
    "[data-save-status],#save-status",
    input.closest(".notebook,.notebook-entry") || document,
  );
  if (status) status.textContent = "正在保存…";
  clearTimeout(noteTimer);
  noteTimer = setTimeout(persist, 300);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !$("#mobile-nav").hidden) {
    closeMobileMenu();
    $(".menu-toggle").focus();
  }
  const b = e.target.closest("[data-answer]");
  if (
    !b ||
    ![
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
    ].includes(e.key)
  )
    return;
  e.preventDefault();
  const id = Number(b.dataset.level),
    q = Number(b.dataset.question),
    len = chapterFor(id).quiz[q].options.length;
  let n = Number(b.dataset.answer);
  n =
    e.key === "Home"
      ? 0
      : e.key === "End"
        ? len - 1
        : (n + (["ArrowLeft", "ArrowUp"].includes(e.key) ? -1 : 1) + len) % len;
  chooseAnswer(id, q, n, true);
});
$("#backup-file").addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    if (file.size > 1000000) throw new Error("文件过大");
    const raw = JSON.parse(await file.text());
    if (
      !raw ||
      typeof raw !== "object" ||
      !(raw.chapters || Array.isArray(raw.tasks))
    )
      throw new Error("格式不符");
    pendingImport = normalizeProgress(raw);
    const count = chapters.filter(
      (c) => pendingImport.chapters[c.id].completed,
    ).length;
    showDialog(
      "RESTORE YOUR NOTES",
      `<h2 id="dialog-title">导入这份学习记录？</h2><p>备份包含 ${count} 个可验证的已确认关卡，以及各关手记。导入会替换本机当前记录，请先确认已备份现有内容。</p><div class="dialog-actions"><button class="solid-link" id="confirm-import">确认导入并替换</button><button class="inline-button" data-dismiss-dialog>保留当前记录</button></div>`,
    );
  } catch {
    announce("无法读取这份备份，请选择本站导出的 JSON 学习记录。");
  }
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  if (previousDialogFocus?.isConnected) previousDialogFocus.focus();
});
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (
      e.clientX < box.left ||
      e.clientX > box.right ||
      e.clientY < box.top ||
      e.clientY > box.bottom
    )
      closeDialog();
  }
});
window.addEventListener("pagehide", () => {
  clearTimeout(noteTimer);
  persist();
});
const slides = [
  {
    src: "assets/hero-group.webp",
    alt: "ILLIT 五位成员在草地白色转盘旁的官方概念照",
    label: "WITH VER. / 2024",
    period: "I’LL LIKE YOU",
    url: "https://beliftlab.com/artist/discography/ILLIT/11",
  },
  {
    src: "assets/lesson-group.webp",
    alt: "ILLIT 五位成员在冷白色被子下的官方概念照",
    label: "SUPER ME VER. / 2024",
    period: "SUPER REAL ME",
    url: "https://beliftlab.com/artist/discography/ILLIT/8",
  },
  {
    src: "assets/alternate-group.webp",
    alt: "ILLIT 五位成员在瓷砖墙前的官方概念照",
    label: "BETWEEN VER. / 2024",
    period: "I’LL LIKE YOU",
    url: "https://beliftlab.com/artist/discography/ILLIT/11",
  },
];
function changeSlide(index) {
  const s = slides[index];
  if (!s) return;
  const image = $("#hero-image");
  image.src = s.src;
  image.alt = s.alt;
  image.classList.remove("image-swap");
  void image.offsetWidth;
  image.classList.add("image-swap");
  $("#hero-caption").textContent = s.label;
  $("#hero-source").href = s.url;
  $(".photo-index").textContent = s.period;
  $$("[data-slide]").forEach((b, i) =>
    b.setAttribute("aria-pressed", String(i === index)),
  );
}
function locationChanged(initial = false) {
  clearTimeout(noteTimer);
  if (!initial) persist();
  const [requested, param, third] = location.hash.slice(1).split("/");
  let page =
    requested === "explore"
      ? "explore"
      : requested === "lesson"
        ? "lesson"
        : requested === "chapter"
          ? "chapter"
          : requested === "notebook"
            ? "notebook"
            : "home";
  let section =
    page === "chapter"
      ? third
      : page === "explore"
        ? third
          ? `fun-${third}`
          : null
        : param;
  const id = page === "chapter" ? Number(param) : 1;
  if (page === "chapter" && (!Number.isInteger(id) || id < 2 || id > 5)) {
    page = "home";
    section = "route";
  }
  if (page === "chapter") {
    activeLevel = id;
    if (isUnlocked(progress, id)) renderChapter(id);
    else {
      page = "locked";
      renderLocked(id);
    }
  } else if (page === "lesson") {
    activeLevel = 1;
    renderFirstPractice();
    if (third) {
      const i = members.findIndex((m) => m.id === third);
      if (i >= 0) selectMember(i);
    }
  } else if (page === "notebook") renderNotebook();
  else if (page === "explore") renderExplore(param, third);
  const changedPage = currentPage !== page;
  $$("[data-page]").forEach((el) => (el.hidden = el.dataset.page !== page));
  if (page !== "chapter") $("#chapter-page").innerHTML = "";
  document.title =
    page === "explore"
      ? "随便逛逛 · ILLIT 趣味空间"
      : page === "home"
        ? "ILLIT · 从这里开始心动"
        : page === "notebook"
          ? "我的五关手记｜ILLIT"
          : page === "lesson"
            ? "第一关 · 认识 ILLIT"
            : `第${chapterNames[id]}关 · ${levels[id - 1].title}｜ILLIT`;
  const homeNav = $("[data-nav=home]");
  if (page === "home") homeNav.setAttribute("aria-current", "page");
  else homeNav.removeAttribute("aria-current");
  const pageRoot = $(`[data-page="${page}"]`);
  const target = section
    ? $$("[id]", pageRoot).find((el) => el.id === section)
    : null;
  if (target) {
    target.scrollIntoView?.({
      behavior: initial || changedPage ? "instant" : "smooth",
      block: "start",
    });
    const h = $("h2", target);
    if (h && !initial) {
      h.tabIndex = -1;
      h.focus({ preventScroll: true });
    }
  } else if (!initial || location.hash) {
    window.scrollTo?.({ top: 0, behavior: "instant" });
    const h = $("h1", pageRoot);
    if (h && !initial) {
      h.tabIndex = -1;
      h.focus({ preventScroll: true });
    }
  }
  currentPage = page;
  closeMobileMenu();
  updateGlobal();
}
renderExploreHome();
selectMember(0);
renderFirstPractice();
updateGlobal();
locationChanged(true);
window.addEventListener("hashchange", () => locationChanged());
if (
  "IntersectionObserver" in window &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  document.documentElement.classList.add("js-reveal");
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  $$(".reveal").forEach((el) => observer.observe(el));
}
try {
  storage.setItem(`${STORAGE_KEY}.probe`, "1");
  storage.removeItem(`${STORAGE_KEY}.probe`);
} catch {
  $$("[data-save-status],#save-status").forEach(
    (e) => (e.textContent = "当前浏览器禁止本地保存，可导出或备份手记"),
  );
}
