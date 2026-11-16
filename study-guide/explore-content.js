// Optional, freely browsable side stories. Sources checked on 2026-11-08.
// Historical interviews below describe the debut / bomb eras, not fixed member roles.

export const exploreTopics = [
  {
    id: "china",
    title: "国内追星小地图",
    eyebrow: "CHINA / 挑一个顺手的入口",
    intro:
      "不用把所有 App 都装一遍。想看动态、找同好或安静听歌，各有一个顺手的入口。这里把已核验的官方账号和普通平台入口分别标明，按心情逛就好。资料核查：2026-11-08。",
    cards: [
      {
        id: "china-weibo",
        title: "微博：先认准她们的原帖",
        label: "已核验 · 官方账号",
        text: "ILLIT 的官方微博是 ILLIT_BELIFTLAB。想在中文社区看动态，可以先从这张名片出发，再逛话题和评论区。遇到活动时间或作品消息，回到官方原帖看上下文，会比只看一张截图清楚。",
        extra:
          "超话和粉丝整理帖适合找同好；具体活动规则以主办方或艺人官方公告为准。只看看、点个喜欢，也是一种很舒服的追星方式。",
        url: "https://www.weibo.com/n/ILLIT_BELIFTLAB",
        linkLabel: "打开 ILLIT 官方微博",
        sourceNote: "由 ILLIT 官方 Weverse 视频说明回链核验 · 2026-11-08",
      },
      {
        id: "china-bilibili",
        title: "B站：从官方空间开始看",
        label: "已核验 · 官方账号",
        text: "ILLIT 有官方 B站空间，不用先在一大堆同名账号里猜。可以从官方上传的视频开始，再按兴趣看翻跳、乐器改编或有来源的中文解说。弹幕很热闹，想专心看表情时，也可以暂时关掉。",
        extra:
          "粉丝创作和官方发布各有乐趣。看解说时顺手留意简介里的原始出处，就能继续找到完整采访或正版视频。",
        url: "https://space.bilibili.com/3546608109095338",
        linkLabel: "打开 ILLIT 官方 B站空间",
        sourceNote:
          "空间 ID 由 ILLIT 官方 Weverse 视频说明回链核验 · 2026-11-08",
      },
      {
        id: "china-xiaohongshu",
        title: "小红书：逛逛日常灵感",
        label: "社区发现 · 平台入口",
        text: "想轻松看看追星日常，可以搜索“ILLIT 穿搭”“ILLIT 翻跳”或“ILLIT 手账”。把它当灵感小逛街：喜欢一套配色、一个手账排版，就可以收下。搜索结果里的博主，不会因为分享了她们就变成官方。",
        extra:
          "目前未取得 ILLIT 小红书账号的第一方回链证明，所以这里只提供平台入口。穿搭解析属于创作者的观察；同款商品是否有艺人授权，需要另看商品说明。",
        url: "https://www.xiaohongshu.com/explore",
        linkLabel: "去小红书逛逛",
        sourceNote:
          "普通平台入口，可能需要登录；未标注任何未核验账号为官方 · 2026-11-08",
      },
      {
        id: "china-qqmusic",
        title: "QQ音乐：把喜欢的歌留下",
        label: "音乐服务 · 平台入口",
        text: "在 QQ音乐里搜索 ILLIT，再用专辑名和曲名找到想听的版本。可以把喜欢的歌收进自己的歌单，通勤或散步时再听。歌手资料页是平台整理的音乐入口，和成员亲自发动态的社交账号是两回事。",
        extra:
          "可试着搜 SUPER REAL ME、Magnetic 或 jellyous。是否能完整播放、是否需要会员，以你所在地区和平台当下页面显示为准。",
        url: "https://y.qq.com/",
        linkLabel: "打开 QQ音乐",
        sourceNote: "已核验平台首页；未猜测 ILLIT 歌手页 ID · 2026-11-08",
      },
      {
        id: "china-netease",
        title: "网易云音乐：给日常选个配乐",
        label: "音乐服务 · 平台入口",
        text: "如果平时用网易云音乐，直接搜 ILLIT 就好，不必为了入坑重新搬家。可以按“出门时”“睡前”“今天想开心一点”来分歌单。评论区适合分享听歌感受；关于歌词出处和作品背景，仍可对照官方资料。",
        extra:
          "这里只链接网易云音乐平台首页，没有把同名用户或歌单作者当成官方账号。曲库和试听权限会变化，打开后以平台显示为准。",
        url: "https://music.163.com/",
        linkLabel: "打开网易云音乐",
        sourceNote:
          "平台域名由网易集团官网回链核验；未核验精确歌手页 · 2026-11-08",
      },
    ],
    sources: [
      {
        title: "ILLIT 官方 Weverse：视频说明中的国内账号入口",
        url: "https://weverse.io/illit/highlight?hl=zh-CN",
      },
      {
        title: "关联官方视频：MINJU《10 Minutes》Cover",
        url: "https://weverse.io/illit/media/4-240709711",
      },
      { title: "QQ音乐平台首页", url: "https://y.qq.com/" },
      {
        title: "网易集团官网：云音乐入口",
        url: "https://www.netease.com/?page_info=1",
      },
      { title: "小红书平台入口", url: "https://www.xiaohongshu.com/explore" },
    ],
  },
  {
    id: "memes",
    title: "梗与有趣表达",
    eyebrow: "FAN TALK / 看懂一点就多一点乐趣",
    intro:
      "先把聊天里常见的小词翻译成人话，再看看 ILLIT 作品里那些可爱的表达。通用词按常见语境解释；歌曲小彩蛋都附上出处，轻松看就好。资料核查：2026-11-08。",
    cards: [
      {
        id: "memes-bias",
        title: "“入坑”以后，一定要选本命吗？",
        label: "通用表达",
        text: "“入坑”通常是开始认真喜欢、想多了解一点；“本命”常指自己特别偏爱的成员。你可以先听歌、慢慢认人，也可以一直喜欢全团。没有必须立刻选一个人的规定，今天的心动也不用变成长期承诺。",
        extra:
          "聊天例句：“我被这次舞台拉入坑了！”“我还没选本命，先都看看。”这些词是交流习惯，意思会随语境略有变化。",
        sourceNote: "中文粉丝社区通用说法；不是 ILLIT 官方称号或规则。",
      },
      {
        id: "memes-fans",
        title: "团粉、路人粉：只是方便聊天",
        label: "通用表达",
        text: "“团粉”常用来表达喜欢整个组合；“路人粉”常指有好感、偶尔听歌看舞台，但未必持续追更新的人。它们描述的是当下兴趣，不是粉丝等级。喜欢一首歌、一个成员，或整个组合，都能找到自己的乐趣。",
        extra:
          "不用为自己选一个最标准的标签。别人使用这些词时，也可以先看上下文，别急着把一句自我介绍理解成严格立场。",
        sourceNote: "中文粉丝社区通用说法；不是会员身份分类。",
      },
      {
        id: "memes-material",
        title: "“忙内”不是很忙，“物料”也不是快递",
        label: "通用表达",
        text: "“忙内”来自韩语 막내，指一个群体里年纪最小的人；“物料”在追星聊天中常统称照片、视频、采访等内容。所以“今天物料好多”大致就是：今天有好多新东西可以看，并不是多了一份待办清单。",
        extra:
          "看到不懂的词，先用这句话替换试试。并非所有粉丝整理的“物料”都是官方发布，想继续看完整内容时，可以找原作者或官方出处。",
        sourceNote:
          "막내 的含义见韩国国立国语院学习词典；“物料”为中文粉丝社区常用引申义。",
      },
      {
        id: "memes-magnetic",
        title: "Magnetic 手指看着轻巧，做起来呢？",
        label: "官方采访 · 舞蹈小彩蛋",
        text: "如果你也被《Magnetic》的手部动作吸引，可以放心承认“看起来会，手还没会”。MOKA 在出道采访里说，这组手部动作起初对她也不容易；练着练着，她才觉得有趣，还想象它会变成挑战。",
        extra:
          "这是成员本人分享的练习感受，不是给粉丝的技术要求。跟着比划两下，或单纯欣赏舞台，都能享受这个小亮点。",
        url: "https://magazine.weverse.io/article/view/1073?artist=ILLIT&lang=zh-cn",
        linkLabel: "可选：读 MOKA 出道访谈",
        sourceNote: "Weverse Magazine 官方中文出道访谈（2024）。",
      },
      {
        id: "memes-cat",
        title: "“借来的猫”原来是歌名",
        label: "官方作品 · 歌名小彩蛋",
        text: "《Do the Dance》的韩文标题是“빌려온 고양이”，字面意思是“借来的猫”。官方介绍用这个意象形容初次约会里紧张、出糗后的局促感。因此看到这几个字，可以先想到这首歌，而不是猜成员多了一个外号。",
        extra:
          "MINJU 在 Apple Music 的专辑介绍里也解释了这个说法，并提到猫主题编舞。这里介绍的是歌名意象，不把它当作每位粉丝都在使用的固定梗。",
        url: "https://beliftlab.com/artist/discography/ILLIT/15",
        linkLabel: "可选：看 bomb 官方介绍",
        sourceNote: "BELIFT LAB《bomb》介绍；Apple Music 成员逐曲解说。",
      },
      {
        id: "memes-jellyous",
        title: "jellyous：吃醋的心情变成果冻",
        label: "官方作品 · 英文双关",
        text: "jellyous 把 jelly（果冻）和 jealous（吃醋）的声音玩在一起。MOKA 在专辑解说里说，它写的是和喜欢的人约见面时，期待又不确定的心情。乱糟糟的情绪，忽然有了一种软软的、彩色的形状。",
        extra:
          "这是一处有成员解说支持的歌名文字游戏。把标题和歌的情绪连起来，下次听到时，可能会多会心一笑。",
        url: "https://music.apple.com/us/album/bomb-ep/1817427556",
        linkLabel: "可选：看成员逐曲解说",
        sourceNote: "Apple Music《bomb》官方专辑页，MOKA 的 jellyous 解说。",
      },
      {
        id: "memes-gllit",
        title: "GLLIT，读到的是一群闪光的人",
        label: "官方名称 · 粉丝文化",
        text: "GLLIT 是官方粉丝名称，灵感来自 glitter，带着闪闪发光的意思。官方公告解释说：粉丝是 ILLIT 眼中闪亮的存在，也让 ILLIT 闪耀。记住这份双向含义，就读懂了名字里最温柔的部分。",
        extra:
          "粉丝名称与付费 GLLIT MEMBERSHIP 是两个概念。了解这个名字不需要先购买会员，也没有一张需要答对的资格试卷。",
        url: "https://weverse.io/illit/notice/22094?hl=ko",
        linkLabel: "可选：看官方命名公告",
        sourceNote:
          "BELIFT LAB 在 ILLIT Weverse 发布的粉丝名与会员公告（2024）。",
      },
    ],
    sources: [
      {
        title: "韩国国立国语院：韩国语基础词典（可搜索 막내）",
        url: "https://krdict.korean.go.kr/eng/mainAction",
      },
      {
        title: "Weverse Magazine：MOKA 出道访谈",
        url: "https://magazine.weverse.io/article/view/1073?artist=ILLIT&lang=zh-cn",
      },
      {
        title: "BELIFT LAB：bomb 官方介绍",
        url: "https://beliftlab.com/artist/discography/ILLIT/15",
      },
      {
        title: "Apple Music：成员讲解 bomb 每首歌",
        url: "https://music.apple.com/us/album/bomb-ep/1817427556",
      },
      {
        title: "Weverse：GLLIT 名称公告",
        url: "https://weverse.io/illit/notice/22094?hl=ko",
      },
    ],
  },
  {
    id: "discover",
    title: "听歌看舞台的小发现",
    eyebrow: "LITTLE DISCOVERIES / 喜欢可以很具体",
    intro:
      "同一首歌，多一个角度，就可能看见新的可爱。这里放几段来自出道时期官方采访的小故事，也准备了两个机位入口。想看哪条就看哪条，不用找齐所有细节。资料核查：2026-11-08。",
    cards: [
      {
        id: "discover-camera",
        title: "换个镜头，同一支舞也会变新",
        label: "机位小发现",
        text: "《Magnetic》官方练习室有 Fix Ver. 和 Moving Ver. 两种版本。固定机位适合从容看队形与走位，移动机位能感受镜头靠近时的表情和动作。哪一种让你更喜欢这首歌，就先看哪一种。",
        extra:
          "下方入口是固定机位；来源区另放了移动机位。它们是两种观看角度，没必要逐帧比较，也不用背住每次换位。",
        url: "https://weverse.io/illit/media/3-158035795",
        linkLabel: "看 Magnetic 固定机位",
        sourceNote:
          "ILLIT 官方 Weverse：Magnetic Dance Practice，Fix / Moving 两版（2024）。",
      },
      {
        id: "discover-eyecontact",
        title: "默契，有时藏在一眼里面",
        label: "YUNAH 分享 · 出道时期",
        text: "YUNAH 说，她和 MOKA 原本很亲近，但双人舞一开始还是不自然。后来她们多练习眼神交流，《Magnetic》的开头和 Bridge 就慢慢有了情绪同步的感觉。知道这段故事，那一眼会更有温度。",
        extra:
          "这里的 Bridge 是歌曲中连接段落的一部分。即使不记这个术语，也可以把它当作“唱到中间时，一小段特别的互动”。",
        url: "https://magazine.weverse.io/article/view/1072?artist=ILLIT&lang=zh-cn",
        linkLabel: "可选：读 YUNAH 出道访谈",
        sourceNote:
          "Weverse Magazine 官方中文出道访谈（2024）；描述当时编舞的练习过程。",
      },
      {
        id: "discover-moka-voice",
        title: "副歌来之前，先留一点期待",
        label: "MOKA 分享 · 声音细节",
        text: "MOKA 说，《Magnetic》和《Lucky Girl Syndrome》里，自己在副歌前的唱段会让情绪先平静一点，同时带出期待。原来活泼的歌，也有轻轻收住的瞬间；下次听，可能会注意到那道转弯。",
        extra:
          "这是她对出道专辑唱段的处理方式，不是固定的成员职务。觉得这一段好听，就把它留在自己的喜欢清单里。",
        url: "https://magazine.weverse.io/article/view/1073?artist=ILLIT&lang=zh-cn",
        linkLabel: "可选：读 MOKA 的声音小故事",
        sourceNote: "Weverse Magazine 官方中文出道访谈（2024）。",
      },
      {
        id: "discover-minju-intro",
        title: "有些心动，从第一句就开始",
        label: "MINJU 分享 · 歌曲开头",
        text: "MINJU 提到，她演唱了《My World》和《Magnetic》的导入部分。录音时，她从制作人的建议里发现许多以前没注意到的细节。如果一首歌的开头一下就抓住你，那份心动也有认真练习的声音。",
        extra:
          "“导入”就是歌曲开始、把你带进氛围的部分。这是具体歌曲的唱段介绍，不等于每一首歌都由同一个人开头。",
        url: "https://magazine.weverse.io/article/view/1071?artist=ILLIT&lang=zh-cn",
        linkLabel: "可选：读 MINJU 出道访谈",
        sourceNote: "Weverse Magazine 官方中文出道访谈（2024）。",
      },
      {
        id: "discover-cloud",
        title: "天上的那只小狗，来自 IROHA 的想象",
        label: "IROHA 分享 · 歌词小故事",
        text: "IROHA 说，《Midnight Fiction》里和小狗云一起散步的画面，来自她自己的想象。看到像小动物的云，她会觉得可爱又幸运。这原本是为《Lucky Girl Syndrome》想的画面，最后去了另一首歌。",
        extra:
          "所以下次抬头看到一朵有趣的云，也可以顺便想起这个小故事。歌曲里的奇妙世界，有时就从很普通的一天开始。",
        url: "https://magazine.weverse.io/article/view/1067?artist=ILLIT&lang=zh-cn",
        linkLabel: "可选：读 IROHA 的云朵小故事",
        sourceNote:
          "Weverse Magazine 官方中文出道访谈（2024）；采访明确说明该意象来自 IROHA。",
      },
    ],
    sources: [
      {
        title: "ILLIT 官方：Magnetic 练习室 · Fix Ver.",
        url: "https://weverse.io/illit/media/3-158035795",
      },
      {
        title: "ILLIT 官方：Magnetic 练习室 · Moving Ver.",
        url: "https://weverse.io/illit/media/4-158047823",
      },
      {
        title: "Weverse Magazine：YUNAH 出道访谈",
        url: "https://magazine.weverse.io/article/view/1072?artist=ILLIT&lang=zh-cn",
      },
      {
        title: "Weverse Magazine：MOKA 出道访谈",
        url: "https://magazine.weverse.io/article/view/1073?artist=ILLIT&lang=zh-cn",
      },
      {
        title: "Weverse Magazine：MINJU 出道访谈",
        url: "https://magazine.weverse.io/article/view/1071?artist=ILLIT&lang=zh-cn",
      },
      {
        title: "Weverse Magazine：IROHA 出道访谈",
        url: "https://magazine.weverse.io/article/view/1067?artist=ILLIT&lang=zh-cn",
      },
    ],
  },
];
