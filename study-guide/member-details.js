// Member reading notes: facts paraphrased from official interviews, checked 2026-11-08.
// Chinese full-name spellings are labelled as common Chinese usage, not invented official stage names.
const profileSource = {
  title: "BELIFT LAB · 官方成员资料",
  url: "https://beliftlab.com/artist/profile/ILLIT",
};
const chineseNameSource = {
  title: "每日经济 MK China · 成员中文姓名对照",
  url: "https://www.mk.co.kr/china/article/67623",
};
const interview = (id, name) => ({
  title: `Weverse Magazine · ${name} 出道访谈（官方中文）`,
  url: `https://magazine.weverse.io/article/view/${id}?artist=ILLIT&lang=zh-cn`,
});

export const memberNameSources = [
  chineseNameSource,
  {
    title: "Weverse Magazine · MOKA 访谈（日文姓名原字）",
    url: "https://magazine.weverse.io/article/view/1499?artist=ILLIT&lang=ja",
  },
];

export const memberDetails = {
  yunah: {
    zh: "卢玧我",
    fullName: "卢玧我 / YUNAH / 윤아",
    nameNote: "卢玧我是中文资料常用写法；官方活动名为 YUNAH。",
    summary:
      "YUNAH 是五位成员中年纪最大的一位，也是三位 2004 年出生的成员之一。她在出道访谈里回顾了五年的练习生活：小学参加合唱团，初中加入戏剧部，并在比赛时获得发掘机会。她把积极的态度视作自己的力量，也会坦然承认练习时遇到困难。认识她时，可以把舞台上专注于表情与配合的一面，和日常里会接话、与成员演小情景剧的一面放在一起看。年龄最长不等于自动担任队长，不必用固定担当限制对她的认识。",
    listenFor:
      "看《Magnetic》或《Lucky Girl Syndrome》时，留意她与 MOKA 的双人配合。她们在采访中提到，会通过对视让动作和情绪更自然地同步。",
    recognizeTips: [
      "先对应「卢玧我 — YUNAH — 윤아」这三个写法，再用同一场舞台的姓名字幕巩固记忆。",
      "认识线索可以是双人互动、表情和说话方式；发色和妆容会随回归变化。",
    ],
    highlights: [
      {
        title: "舞台上的细节",
        text: "出道准备时，她专门练习在《Magnetic》的较大体力消耗下保持明亮表情，并调整演唱的语气和舞蹈细节。",
      },
      {
        title: "日常里的温度",
        text: "她与 WONHEE 会即兴演情景剧，也喜欢看料理视频。她曾为成员们做大酱汤，并把大家吃得开心当作很有成就感的时刻。",
      },
    ],
    sources: [
      profileSource,
      interview(1072, "YUNAH"),
      interview(1073, "MOKA"),
      chineseNameSource,
    ],
  },
  minju: {
    zh: "朴慜柱",
    fullName: "朴慜柱 / MINJU / 민주",
    nameNote:
      "中文常用写作朴慜柱；也会遇到朴敏柱、朴敏珠等异译，检索时认准 MINJU。",
    summary:
      "MINJU 同样出生于 2004 年。想从声音认识成员，可以先听她在《Magnetic》和《My World》中的开头演唱。她在出道访谈里说，自己最初从舞蹈学习起步，后来在练习中发现了对唱歌的喜爱；录制出道专辑时，也尝试接受制作人的建议，探索不同于以往的唱法。她与 YUNAH 从练习生时期便相识，彼此是能够察觉对方情绪、互相依靠的朋友。镜头里的安静只是她的一面，她也在采访里提到熟悉之后喜欢开玩笑。",
    listenFor:
      "先听《Magnetic》的导入，再听《My World》的导入：这两个开头都由她参与演唱。比较同一个声音在两首歌中呈现的不同气氛，比死记“音色标签”更容易认识她。",
    recognizeTips: [
      "把「朴慜柱 — MINJU — 민주」作为一组记忆；“慜”与常见的“敏”不是同一个字。",
      "可以用歌曲开头的声音作为第二条记忆线，再回到有姓名字幕的官方舞台找人。",
    ],
    highlights: [
      {
        title: "从练习里找到唱歌的乐趣",
        text: "她提到《R U Next?》中演唱《I Don’t Care》的舞台让自己很有自信，也让她更确定想展现自己的声线。",
      },
      {
        title: "认识她的另一面",
        text: "她曾说自己很好奇粉丝们的生活，例如吃了什么、最近过得如何。把访谈中的日常交流与舞台放在一起，就不会只记住一个外表印象。",
      },
    ],
    sources: [profileSource, interview(1071, "MINJU"), chineseNameSource],
  },
  moka: {
    zh: "境萌花",
    fullName: "境 萌花 / さかい もか / MOKA",
    nameNote: "境萌花是她的日文姓名汉字；官方活动名为 MOKA，韩文写作 모카。",
    summary:
      "MOKA 的姓名汉字是境萌花，与 MINJU、YUNAH 同为 2004 年出生。她在出道访谈中回忆，小时候受到喜欢 K-pop 的妈妈影响，初中开始学习翻跳，也曾参加 KCON 的翻跳活动。成为练习生后，她经历过在线训练与离家练习的阶段，来到韩国时还需要克服语言的不熟悉。准备《Magnetic》时，她会反复研究副歌前的氛围、自己的表情和与成员的对视，让“可爱、调皮和帅气”能在同一个舞台里自然切换。",
    listenFor:
      "留意《Magnetic》和《Lucky Girl Syndrome》进入副歌之前的段落：MOKA 在访谈中说，她想用这些暂时收拢的唱段制造期待感。也可以观察她与 YUNAH 的互动。",
    recognizeTips: [
      "把「境萌花 — MOKA — 모카」对起来；姓名里的“萌花”与 MOKA 发音相关，不是粉丝另起的昵称。",
      "同一场舞台先看她的独立镜头，再看她怎样转向、对视和配合其他成员。",
    ],
    highlights: [
      {
        title: "不仅是一个镜头表情",
        text: "她会先想清楚唱段需要什么情绪，再决定表情和姿势；这些是练习和尝试的结果，而不是固定的人设。",
      },
      {
        title: "生活里喜欢照顾人",
        text: "她说自己会自然地想为成员做点事，也喜欢看料理视频，曾在独自生活时尝试简单料理。她希望大家能感受到组合像朋友和姐妹相处的气氛。",
      },
    ],
    sources: [
      profileSource,
      interview(1073, "MOKA"),
      memberNameSources[1],
      chineseNameSource,
    ],
  },
  wonhee: {
    zh: "李沅禧",
    fullName: "李沅禧 / WONHEE / 원희",
    nameNote: "李沅禧是中文资料常用写法；官方活动名为 WONHEE。",
    summary:
      "WONHEE 出生于 2007 年。她在出道访谈里回顾，成为练习生约一个月便参加《R U Next?》，之后再与成员们一起经历出道准备。她并不是带着丰富舞台经验入场的人：学生时期喜欢体育，也当过学校活动主持人，后来一步步习惯拍摄、镜头与正式演出。她特别在意把歌唱细节表达好，例如尾音、气息和音程，也把和成员及时交换意见当作团队练习的重要部分。认识她时，可以留意“把新事物一点点学会”的成长过程。",
    listenFor:
      "在《Magnetic》副歌之前，留意她的演唱；再听《My World》中音程较有变化的句子。她在访谈里谈过这两处的气息、尾音和动态处理，可以把它们当作听歌的小观察。",
    recognizeTips: [
      "把「李沅禧 — WONHEE — 원희」对应记住；“沅禧”不是按英文直接拼写出来的两个常见字。",
      "同一成员在正式舞台与轻松日常里的状态可能不同，先用姓名字幕确认，再形成自己的观察。",
    ],
    highlights: [
      {
        title: "遇到不懂的就求助",
        text: "她提到，在节目中遇到不会的动作时，成员们愿意在轻松气氛里回应她的求助，这让她能够更愉快地学习。",
      },
      {
        title: "把心情写下来",
        text: "当情绪需要整理时，她会先记在备忘录或日记里，再慢慢想清楚原因。她希望自己能和粉丝朝着同一个方向走下去。",
      },
    ],
    sources: [profileSource, interview(1070, "WONHEE"), chineseNameSource],
  },
  iroha: {
    zh: "外园彩羽",
    fullName: "外园彩羽 / IROHA / 이로하",
    nameNote:
      "外园彩羽是中文资料常用写法；官方活动名为 IROHA，韩文写作 이로하。",
    summary:
      "IROHA 出生于 2008 年，是五位成员中年纪最小的一位；韩语里常用“忙内”称呼组合中最年幼的人。她在出道访谈中提到，十一岁从日本来到韩国做练习生，之前已经熟悉嘻哈与编舞，之后又学习 K-pop 对线条、手部和细节的不同要求。她会反复录音和练习，也会主动为每句歌词设计适合的表情。与此同时，她很容易从云朵、小动物照片和日常小事里获得快乐。《Midnight Fiction》中像小狗的云朵意象，就来自她的想象。",
    listenFor:
      "可以先看《Lucky Girl Syndrome》的表情与舞蹈，再留意《Magnetic》中她对较柔和声音的处理。她自己也把舞台表情与演唱方式的拓展视为出道时的新发现。",
    recognizeTips: [
      "把「外园彩羽 — IROHA — 이로하」连起来记忆，检索官方内容时使用 IROHA 最稳妥。",
      "先观察完整动作与手部线条，再看面部表情如何跟着歌词变化，不需要用发色或固定造型记人。",
    ],
    highlights: [
      {
        title: "喜欢挑战，也会复盘",
        text: "她提到自己享受挑战带来的收获，练习时会根据反馈调整动作，并提前思考拍摄所需的姿势与表情。",
      },
      {
        title: "从很小的事情里感到幸运",
        text: "挑软糖、看小动物、发现有趣的云朵，都是她在访谈中举过的快乐来源。这也是认识她舞台之外一面的轻松切口。",
      },
    ],
    sources: [profileSource, interview(1067, "IROHA"), chineseNameSource],
  },
};
