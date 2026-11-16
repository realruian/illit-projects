import { intro, tasks, quiz, levels, sources } from "./content.js";
import { chapters23 } from "./chapters-23.js";
import { chapters45 } from "./chapters-45.js";
// Optional, one-step suggestions replace the original report-like assignments.
const relaxedSuggestions = {
  1: [
    ["先认识一位成员", "今天先点开一个名字就好，不用一次记住五个人。"],
    ["听听 Magnetic", "听一小段也可以，喜欢哪句就再听一遍。"],
    ["留一句心情", "比如「今天觉得某个舞台很好看」。想写就写，不写也能继续。"],
  ],
  2: [
    ["看看哪个平台顺手", "点开一个你熟悉的平台介绍，不必全部注册或关注。"],
    ["挑一个常用入口", "在信息清单里留一个以后想再看的地方，也可以先不选。"],
    ["按自己的节奏看消息", "想主动打开看看就好，不必每条推送都追。"],
  ],
  3: [
    ["随便挑一段内容", "团综、直拍或幕后，今天只看想看的那一种。"],
    [
      "换个镜头看看",
      "看看全景里成员怎样配合，不用记住动作，也不用作比较报告。",
    ],
    [
      "留住一个喜欢的瞬间",
      "记个关键词、收藏一段视频，或者只记在心里，都可以。",
    ],
  ],
  4: [
    [
      "听懂一个词就好",
      "知道音源是数字歌曲、实体专辑是具体商品，就已经有收获。",
    ],
    ["点选你的回归兴趣", "听歌、看舞台、收藏，想看哪个就点哪个，不用全参加。"],
    ["记住一个小区别", "看 MV、买专辑和打歌拿一位是不同的事，不必背榜单公式。"],
  ],
  5: [
    [
      "认识会员的一件事",
      "会员提供什么，要看对应服务说明；不等于一定能买到票。",
    ],
    ["随便选一种活动", "点开签售或演唱会核对表，知道大概会遇到什么就好。"],
    ["选自己的舒适区", "线上看看、以后再了解也很好，不需要马上报名或购买。"],
  ],
};
export const chapters = [
  {
    id: 1,
    title: levels[0].title,
    intro: intro.subtitle,
    goals: intro.goals,
    tasks,
    quiz,
    sources,
  },
  ...chapters23,
  ...chapters45,
].map((c) => ({
  ...c,
  title: levels[c.id - 1].title,
  tasks: relaxedSuggestions[c.id].map(([title, text], index) => ({
    id: c.tasks[index].id,
    title,
    text,
    ...(c.id === 1 && index === 1
      ? { link: c.tasks[index].link, linkLabel: "听听官方 MV" }
      : {}),
  })),
}));
