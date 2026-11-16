// Editorial learning content. Facts checked against official sources on 2026-11-08.
// Chinese explanations are written for this personal, unofficial learning prototype.
export const checkedAt = '2026-11-08';

export const sources = [
  { id: 'profile', title: 'BELIFT LAB · ILLIT 官方资料', url: 'https://beliftlab.com/artist/profile/ILLIT', supports: '成员英文名、生日、出道日期与团名含义' },
  { id: 'names', title: 'Weverse Magazine · ILLIT 的歌单', url: 'https://magazine.weverse.io/article/view/1075?artist=ILLIT&lang=ko', supports: '五位成员的韩文姓名拼写' },
  { id: 'debut', title: 'BELIFT LAB · 出道专辑及 Showcase 公告', url: 'https://weverse.io/runext/notice/17844', supports: '2024 年 3 月 25 日以 SUPER REAL ME 出道' },
  { id: 'formation', title: 'Mnet Japan · ILLIT 出道节目介绍', url: 'https://mnetjp.com/program/3132/', supports: '由 R U Next? 节目诞生、出道作品与主打曲 Magnetic' },
  { id: 'gllit', title: 'Weverse · GLLIT 官方粉丝名公告', url: 'https://weverse.io/illit/notice/22094?hl=ko', supports: '2024 年 9 月 1 日公布的粉丝名称与含义' },
  { id: 'gllit-jp', title: '日本官网 · GLLIT 名称公告', url: 'https://illit-official.jp/news/5fde7018f59a', supports: '粉丝名公告的官方日文对应版本' },
  { id: 'debut-album', title: 'BELIFT LAB · SUPER REAL ME', url: 'https://beliftlab.com/artist/discography/ILLIT/8', supports: '出道作品、主打曲与官方 Magnetic MV 入口' },
];

export const members = [
  { id: 'yunah', name: 'YUNAH', ko: '윤아', birthday: '2004.01.15', short: '先把官方英文名 YUNAH 和韩文 윤아 对上，再从照片与舞台慢慢认识她。', source: sources[0].url, nameSource: sources[1].url },
  { id: 'minju', name: 'MINJU', ko: '민주', birthday: '2004.05.11', short: '记住 MINJU，也认一认韩文 민주。不同回归的发型会改变，姓名是更可靠的线索。', source: sources[0].url, nameSource: sources[1].url },
  { id: 'moka', name: 'MOKA', ko: '모카', birthday: '2004.10.08', short: 'MOKA 的韩文写作 모카。可以先收藏一张你喜欢的官方照片，建立自己的第一印象。', source: sources[0].url, nameSource: sources[1].url },
  { id: 'wonhee', name: 'WONHEE', ko: '원희', birthday: '2007.06.26', short: 'WONHEE 对应 원희。不用急着背完资料，先从一次自我介绍或一段舞台认识她。', source: sources[0].url, nameSource: sources[1].url },
  { id: 'iroha', name: 'IROHA', ko: '이로하', birthday: '2008.02.04', short: 'IROHA 的韩文是 이로하。把名字和官方成员照配对，就是今天足够好的开始。', source: sources[0].url, nameSource: sources[1].url },
];

export const intro = {
  title: '认识 ILLIT',
  subtitle: '从五个名字，开始你的第一份心动。',
  goals: ['认出五位成员，能把照片与姓名对应起来', '知道出道日期、团名与 GLLIT 的基本含义', '分清常见追星词，找到可信的官方资料'],
  facts: [
    { label: '来自哪里', title: 'BELIFT LAB', text: 'ILLIT 是 BELIFT LAB 旗下的女子组合。官方资料列出 YUNAH、MINJU、MOKA、WONHEE、IROHA 五位成员。', source: sources[0].url },
    { label: '名字的意思', title: 'I will + It', text: '团名结合表达自主意志的 “I will” 与象征独特事物的 “It”，寄托了成员拥有无限可能的含义。', source: sources[0].url },
    { label: '第一次见面', title: '2024.03.25', text: '以首张迷你专辑《SUPER REAL ME》正式出道，主打曲是《Magnetic》。', source: sources[2].url },
    { label: '一起闪耀', title: 'GLLIT · 글릿', text: '官方粉丝名来自 glitter，表达粉丝在 ILLIT 眼中闪耀，也让 ILLIT 闪耀的意义。', source: sources[4].url },
  ],
  timeline: [
    { date: '2023', title: '从 R U Next? 诞生', text: '通过组合诞生的节目了解起点即可，不必先补完所有节目才能开始喜欢她们。', source: sources[3].url },
    { date: '2024.03.25', title: 'SUPER REAL ME · 正式出道', text: '从《Magnetic》的官方 MV 开始，听听你最先记住的是哪段旋律。', source: sources[2].url },
    { date: '2024.09.01', title: '你好，GLLIT', text: '官方公布粉丝名称 GLLIT。喜欢音乐、看舞台、慢慢了解，都可以是你的追星方式。', source: sources[4].url },
  ],
  culture: '粉丝名是一种共同的称呼，不是需要消费才能获得的资格。付费会员是另一项服务，后面的关卡会单独说明。喜欢多久、看多少内容，都可以按自己的节奏。',
};

export const terms = [
  { id: 'comeback', term: '回归', en: 'COMEBACK', definition: '艺人推出新作品并展开相关宣传活动时，常被称为“回归”。不一定意味着之前暂停了活动。', example: '看到回归日程表，可以先找发行日期，再看概念照与 MV 的发布安排。' },
  { id: 'fancam', term: '直拍', en: 'FANCAM', definition: '通常指舞台中持续跟拍某位成员或整个组合的录像；电视台也会发布官方直拍。它与剪辑切换镜头的主舞台版本不同。', example: '想观察一位成员的完整动作，可以找官方标题中的 Fancam、직캠 或成员姓名。' },
  { id: 'variety', term: '团综', en: 'GROUP VARIETY', definition: '围绕组合成员制作的综艺或系列内容，常有游戏、旅行、聊天等形式。它不同于舞台表演或音乐录影带。', example: '初次观看不必追赶全部集数，可以从一个感兴趣的主题开始。' },
  { id: 'digital', term: '音源', en: 'DIGITAL MUSIC', definition: '这里通常指在音乐服务上发行的数字歌曲及其播放、下载表现，与实体专辑是不同维度。', example: '“听音源”可以先理解为在正规音乐服务上听歌；具体榜单规则在第四关再学。' },
  { id: 'musicshow', term: '打歌', en: 'MUSIC SHOW', definition: '通常指艺人在音乐节目中表演并宣传作品。一些节目设有排名与一位奖项，各节目计算方式不同。', example: '观看舞台不等于必须投票；先享受表演，规则需要时再查官方说明。' },
  { id: 'gllit', term: 'GLLIT', en: '글릿', definition: 'ILLIT 的官方粉丝名，灵感来自 glitter，包含粉丝与艺人让彼此闪耀的含义。', example: 'GLLIT 是粉丝的称呼；GLLIT Membership 是付费会员服务，两者不要混为一谈。', source: sources[4].url },
];

export const quiz = [
  { id: 'debut-date', question: 'ILLIT 的正式出道日期是？', options: ['2024 年 3 月 25 日', '2024 年 9 月 1 日', '2025 年 3 月 25 日'], answer: 0, explanation: '2024 年 3 月 25 日，ILLIT 以《SUPER REAL ME》出道。9 月 1 日是官方公布 GLLIT 名称的日期。', source: sources[2].url },
  { id: 'fan-name', question: '关于 GLLIT，哪种理解更准确？', options: ['只有购买会员才能这样称呼自己', '它是粉丝名，和付费会员服务是不同概念', '它是出道专辑的名称'], answer: 1, explanation: 'GLLIT 是官方粉丝名。官方同时介绍了名称与之后开放的会员服务，它们是不同概念；不需要用消费证明喜欢。', source: sources[4].url },
  { id: 'fancam-definition', question: '想看某位成员在一场舞台中的完整动作，可以优先找？', options: ['新闻文字摘要', '专辑预售页', '该成员的官方直拍'], answer: 2, explanation: '官方成员直拍通常持续跟拍某位成员，适合观察完整动作。记得确认上传账号是电视台或艺人官方。' },
];

export const tasks = [
  { id: 'meet-members', title: '和五位成员打个招呼', text: '打开五份成员档案，尝试把姓名与照片对应；不用一次记住所有细节。' },
  { id: 'watch-magnetic', title: '看一遍 Magnetic 官方 MV', text: '从官方入口观看，记下一处吸引你的旋律、舞蹈或画面。', link: 'https://www.youtube.com/watch?v=Vk5-c_v4gMU', linkLabel: '前往官方 MV' },
  { id: 'first-note', title: '留下你的第一句追星笔记', text: '写下今天记住的一个名字、一个词，或一处让你心动的细节。只属于你，不需要标准答案。' },
];

export const levels = [
  { id: 1, title: '认识 ILLIT', description: '成员、出道经历、粉丝文化和基本术语。' },
  { id: 2, title: '建立追星信息渠道', description: 'Weverse、X、Instagram、TikTok、YouTube。' },
  { id: 3, title: '开始日常追星', description: '团综、成员直播、直拍、幕后和最新动态。' },
  { id: 4, title: '理解韩国打歌与回归', description: '音源、专辑、打歌节目、榜单、投票与应援。' },
  { id: 5, title: '体验深度追星', description: '粉丝会员、签售、演唱会、线下活动。' },
];
