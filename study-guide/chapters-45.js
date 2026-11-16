// Official information checked on 2026-11-08. Event examples are dated, not live applications.
export const chapters45 = [
  {
    id: 4,
    title: "理解韩国打歌与回归",
    eyebrow: "04 / COMEBACK NOTEBOOK",
    intro:
      "从一张回归日程表开始，把新歌、专辑、舞台、榜单和应援放回各自的位置。看懂它们，你就能按自己的时间和预算，选择喜欢的参与方式。",
    goals: [
      "分清音源、实体专辑和主要榜单的统计对象",
      "读懂打歌舞台与当期投票规则",
      "做一份不以消费或刷量为前提的回归计划",
    ],
    image: "assets/break-even.webp",
    imageAlt: "ILLIT 第五张迷你专辑 BREAK EVEN 官方封面",
    imageCredit: {
      label: "BREAK EVEN · BELIFT LAB 官方专辑资料",
      url: "https://beliftlab.com/artist/discography/ILLIT/22",
    },
    sections: [
      {
        id: "comeback-map",
        title: "回归，是一段有节奏的新作品发布期",
        kicker: "FIRST, THE BIG PICTURE",
        intro:
          "K-pop 语境里的「回归」通常指推出新音乐并展开宣传活动，不一定是长时间休息后的重新活动。概念照、预告片、音源、MV、实体专辑和打歌舞台可能在不同日期出现，不能把其中任意一个时间当成全部活动的开始。",
        items: [
          {
            title: "发布前：先读日程，不急着下单",
            label: "BEFORE RELEASE",
            text: "先在官方公告中找到作品名、发行日、时间和发布平台，再按自己的兴趣标记概念照、曲目表、MV 预告等节点。预售开始不等于音源已经发布；不同地区和版本也可能采用不同的销售安排。可以只收藏公告、看照片、听预告，没有「必须集齐」的入门门槛。",
            steps: [
              "记下作品名和公告发布时间。",
              "把音源、MV、实体专辑的日期分开记录。",
              "确认时区；KST 与 JST 都是 UTC+9，比北京时间快 1 小时。",
            ],
          },
          {
            title: "发布当天：把一首歌真正听进去",
            label: "RELEASE DAY",
            text: "先通过官方艺人页、官方 MV 或正版音乐平台找到作品，再看歌名、歌词字幕和制作信息。不同地区的平台上架时间、字幕与会员功能可能不同。普通收听就有价值：按照平台正常方式播放、收藏或分享自己喜欢的作品，不使用多账号、脚本、虚假播放或规避平台规则的方法。",
          },
          {
            title: "宣传期：用日期整理舞台",
            label: "PROMOTION",
            text: "同一首歌会有不同服装、镜头、编舞细节和现场表现。记录「歌曲＋节目＋日期」，比只存一个没有说明的视频链接更方便回看。官方专辑页确认作品本身，艺人公告确认出席安排，电视台频道确认具体舞台；一张回归日程表不能保证所有节目都会出演。",
            url: "https://beliftlab.com/artist/discography/ILLIT/22",
            linkLabel: "查看 BREAK EVEN 官方作品资料",
          },
        ],
      },
      {
        id: "charts-explained",
        title: "音源、实体与榜单，分别在记录什么？",
        kicker: "READ THE NUMBERS",
        intro:
          "「音源很好」「卖了很多专辑」「拿到一位」说的是不同结果。比较数据前，先读榜单名称、统计范围、时间段和计量方式。不同榜单的数字不能直接相减，也不能简单当成同一个总销量。",
        items: [
          {
            title: "音源：数字音乐的使用情况",
            label: "DIGITAL",
            text: "音源是可在线收听或下载的录音作品。流媒体播放、付费下载与音乐视频观看在不同平台有各自的记录方式；一个 YouTube MV 的播放量，不等于韩国音乐平台的音源成绩。Circle 的 Digital Chart 综合其公布的数字音乐使用指标；Global K-pop Chart 则观察全球 K-pop 流媒体使用。先问「哪个榜、哪个地区、哪段时间」，再解释数字。",
            url: "https://circlechart.kr/page_community/faq.circle",
            linkLabel: "阅读 Circle 官方榜单说明",
          },
          {
            title: "实体专辑：买到的是一个具体版本",
            label: "PHYSICAL",
            text: "实体专辑可能有不同封面、规格、附属品和购买渠道。先看商品页的实际内容、语言、配送地区、运费与退换条件，再决定是否需要。抽选活动、店铺特典和普通专辑是不同条件，不能只凭封面判断是否符合活动资格。不买专辑，也可以完整学习这五关。",
          },
          {
            title: "Hanteo：看其销售网络汇集的实体销售",
            label: "HANTEO",
            text: "Hanteo 以其合作销售网络提供的数据编制实体专辑销售榜，具有实时销售统计的特点。它不是所有商店、所有地区零售量的自动总和。若你在意某次购买是否计入，应检查商家是否为对应认证销售渠道，以及商品页对版本和统计的说明；不要凭店铺名称或网友截图作保证。",
            url: "https://www.hanteochart.com/en/about",
            linkLabel: "查看 Hanteo 官方介绍",
          },
          {
            title: "Circle：Album 与 Retail Album 也不相同",
            label: "CIRCLE",
            text: "Circle 官方说明中，Album Chart 以唱片的出货量扣除退货量计算；Retail Album Chart 记录参与统计的零售渠道销售。出货、零售与 Hanteo 所覆盖的销售数据有不同口径，所以出现差值并不自动意味着某个榜单出错。写笔记时保留完整榜名和统计周期，不只写一个孤立的「销量」。",
            url: "https://circlechart.kr/page_community/faq.circle",
            linkLabel: "核对 Circle 的统计口径",
          },
        ],
      },
      {
        id: "music-show-guide",
        title: "先认节目，再看这一期怎么评选",
        kicker: "THE MUSIC SHOW GUIDE",
        intro:
          "追星讨论里常会遇到下面六个打歌节目名称。它们属于不同电视台和制作体系，播出状态、嘉宾、候选资格、计分项目和投票方式都可能调整。这里是识别节目与寻找规则的入口，不是一份保证全部节目当前播出或 ILLIT 当期出席的排期表。",
        items: [
          {
            title: "THE SHOW",
            label: "SBS",
            text: "遇到这个名字，先从 SBS 节目页核对最新公告和节目状态，再找当期舞台或候选说明。旧教程里写的播出日、投票 App 和计分比例，不足以证明今天仍适用。",
            url: "https://programs.sbs.co.kr/show/theshow/main",
            linkLabel: "THE SHOW 官方节目页",
          },
          {
            title: "SHOW CHAMPION",
            label: "MBC M / MBC PLUS",
            text: "在 MBC PLUS 的节目栏目查找 SHOW CHAMPION。节目有自己的榜单与候选规则；「出席舞台」和「进入当期评选」是两个问题，不能只凭演出片段判断。",
            url: "https://www.mbcplus.com/web/program/list.do",
            linkLabel: "MBC PLUS 官方节目目录",
          },
          {
            title: "M COUNTDOWN",
            label: "MNET",
            text: "从 Mnet Plus 的官方节目与公告入口确认当期内容。看到投票页面时，先核对活动名称、账号要求、截止时区、允许次数和候选名单，不从第三方链接直接提交。",
            url: "https://www.mnetplus.world/en",
            linkLabel: "Mnet Plus 官方入口",
          },
          {
            title: "Music Bank / 音乐银行",
            label: "KBS",
            text: "KBS 的 Music Bank 舞台常会以节目名和日期发布。查看官方节目页和公告，分清本期出演信息与榜单说明，不把别的节目的权重套用过来。",
            url: "https://program.kbs.co.kr/2tv/enter/musicbank/pc/index.html",
            linkLabel: "Music Bank 官方节目页",
          },
          {
            title: "Show! Music Core / 音乐中心",
            label: "MBC",
            text: "在 MBC 节目页确认节目与回放信息，再寻找对应日期的 ILLIT 舞台。观看权限、完整回放与片段是否可用，可能因地区或服务条件而不同。",
            url: "https://m.imbc.com/program/1000788100000100000",
            linkLabel: "音乐中心官方节目页",
          },
          {
            title: "Inkigayo / 人气歌谣",
            label: "SBS",
            text: "在人气歌谣官方页检查本期信息。节目成绩可以涉及多种指标，但不能凭一份旧图表推断当期分数，更不能把某个 App 里的活动都当成人气歌谣正式投票。",
            url: "https://programs.sbs.co.kr/enter/gayo/main",
            linkLabel: "人气歌谣官方节目页",
          },
        ],
      },
      {
        id: "support-at-your-pace",
        title: "应援可以很具体，也可以很轻松",
        kicker: "YOUR PACE, YOUR CHOICE",
        intro:
          "榜单是了解音乐传播的一种方式，不是给粉丝打分的标准。选择认真听歌、看一个舞台、记住一句官方应援，已经是在参与这次回归。",
        items: [
          {
            title: "投票前，用四个问题过滤信息",
            text: "不同节目可能把音源、唱片、节目播放、观众参与等指标纳入评选，但没有一套适用于所有节目的固定权重与统一投票期。每次都以当期节目或其指定平台的官方规则为准。投票不是义务，本站也不代投、不提供购买票数的服务。",
            steps: [
              "这是哪一个节目、哪一期的正式活动？",
              "公告写了什么资格、候选范围和投票次数？",
              "截止时间采用哪个时区？是否需要付费，自己是否愿意？",
              "结果在哪里公布？无法核实就先不参加。",
            ],
          },
          {
            title: "应援法：知道何时回应，比喊得大声更重要",
            text: "官方应援法会标记适合回应的歌词、名字或节拍。可以先看官方文字，再配合舞台练习，从一句回应开始。日文站的 Cheering 栏目是实用入口；现场仍要服从场地规则，控制应援物高度，不妨碍别人。这里不复制整篇歌词，也不要求你背完才能继续。",
            url: "https://illit-official.jp/cheering",
            linkLabel: "ILLIT 官方应援法目录",
          },
          {
            title: "给这一轮回归留一页笔记",
            text: "写下最喜欢的歌曲、一个舞台的节目和日期、一条新学到的规则，以及这周愿意花的时间。预算可以是零。把可靠消息的原公告一起保存，遇到规则更新时改笔记，而不是让旧截图替你作决定。",
          },
        ],
      },
    ],
    tool: {
      type: "comeback-planner",
      title: "选一种方式，做你的回归准备",
      intro:
        "选择你最想参与的方向，生成一份可照着做的准备清单。这里仅整理学习计划，不会播放刷量、代投、购买或提交任何活动。",
      choices: [
        {
          id: "listen",
          label: "认真听歌",
          title: "我的听歌计划",
          text: "给作品一点专注的时间，留下自己的听感。",
          steps: [
            "从官方资料记下作品名、发行时间与时区。",
            "选择自己可以正常使用的正版音乐平台。",
            "听一遍作品，记录喜欢的声线、编曲或歌词主题。",
            "收藏官方 MV 或艺人页，按平台正常规则自由收听。",
          ],
        },
        {
          id: "stage",
          label: "看一个舞台",
          title: "我的舞台观察计划",
          text: "从一段完整表演开始，看见同一首歌的不同表情。",
          steps: [
            "核对艺人当期出席公告。",
            "找到电视台或艺人官方频道发布的完整舞台。",
            "记录节目、歌曲、日期，分清舞台、直拍与彩排。",
            "选一个喜欢的细节写进笔记；应援法可以稍后慢慢练。",
          ],
        },
        {
          id: "album",
          label: "了解专辑",
          title: "我的专辑选择计划",
          text: "先看清内容与成本，再决定是否收藏。",
          steps: [
            "在官方作品页确认专辑名称。",
            "比较版本的实际内容、规格与自己喜欢的视觉。",
            "阅读销售渠道、配送地区、运费和活动资格说明。",
            "设定含运费的预算；只做比较、不购买也算完成。",
          ],
        },
        {
          id: "vote",
          label: "读懂投票",
          title: "我的规则核对计划",
          text: "先成为能辨别信息的人，再决定是否参与。",
          steps: [
            "确定节目和当期活动名称。",
            "从节目官方入口找到指定投票规则。",
            "记下资格、次数、时间及时区，检查是否涉及费用。",
            "决定参加或跳过；不使用代投、脚本或违规多账号。",
          ],
        },
      ],
    },
    tasks: [
      {
        id: "s4-timeline",
        title: "整理一页回归日程",
        text: "选一张官方专辑，写下作品名、音源或 MV 时间、一个宣传节点和原公告链接。保留时区，旧活动加上「历史记录」。",
        link: "https://beliftlab.com/artist/discography/ILLIT/22",
        linkLabel: "从官方专辑页开始",
      },
      {
        id: "s4-charts",
        title: "用自己的话分清两种数字",
        text: "在笔记里解释 Hanteo 销售统计与 Circle Album 出货扣退货的差别，再写一句为什么二者不能直接当成同一总销量。",
        link: "https://circlechart.kr/page_community/faq.circle",
        linkLabel: "复核 Circle 官方说明",
      },
      {
        id: "s4-plan",
        title: "选一项参与方式",
        text: "使用上方计划工具，完成其中一件小事：听一首歌、记录一个舞台、比较版本或核对一条规则。无需购买、投票或达到播放次数。",
      },
    ],
    quiz: [
      {
        id: "s4-q1",
        question: "Hanteo 与 Circle Album Chart 的数字不相同，先怎么理解？",
        options: [
          "它们统计口径不同，应先核对榜名、周期与范围",
          "较大的数字一定是错误数据",
          "两个数字相加就是全世界售出的专辑",
        ],
        answer: 0,
        explanation:
          "Hanteo 汇集其销售网络的数据；Circle Album Chart 看出货扣除退货。范围和口径不同，不能直接相加或当成同一个总数。",
      },
      {
        id: "s4-q2",
        question: "看到一张去年的打歌投票教程，你应该怎么做？",
        options: [
          "直接沿用里面的时间、App 和次数",
          "去当期节目官方渠道核对资格、平台与截止时间",
          "默认六个节目使用相同投票规则",
        ],
        answer: 1,
        explanation:
          "投票平台、候选资格、次数和权重都可能调整。旧教程可以帮助认识名词，实际参与必须看当期官方规则。",
      },
      {
        id: "s4-q3",
        question: "这次回归不买专辑、不投票，还能完成这一关吗？",
        options: [
          "不行，至少购买一张专辑",
          "必须让歌曲达到指定播放次数",
          "可以，完成知识学习和自己选择的实践任务即可",
        ],
        answer: 2,
        explanation:
          "学习不以消费或数据贡献为门槛。认真听歌、观察舞台和辨别规则都是真实的参与。",
      },
    ],
    sources: [
      {
        title: "BELIFT LAB · BREAK EVEN 官方作品页",
        url: "https://beliftlab.com/artist/discography/ILLIT/22",
        supports: "专辑身份、官方视觉与作品入口；核对于 2026-11-08。",
      },
      {
        title: "Hanteo Chart · About",
        url: "https://www.hanteochart.com/en/about",
        supports: "Hanteo 实体专辑销售统计与官方体系介绍。",
      },
      {
        title: "Circle Chart · 官方 FAQ",
        url: "https://circlechart.kr/page_community/faq.circle",
        supports:
          "Digital、Global K-pop、Album 与 Retail Album 的不同统计口径。",
      },
      {
        title: "MBC PLUS · 官方节目目录",
        url: "https://www.mbcplus.com/web/program/list.do",
        supports: "SHOW CHAMPION 所属平台与官方节目查找入口。",
      },
      {
        title: "Mnet Plus · 官方入口",
        url: "https://www.mnetplus.world/en",
        supports:
          "M COUNTDOWN 相关内容与当期活动核验入口；不据此推定统一投票规则。",
      },
      {
        title: "ILLIT Japan · Cheering",
        url: "https://illit-official.jp/cheering",
        supports: "官方应援法目录；具体作品以目录当期更新为准。",
      },
    ],
  },
  {
    id: 5,
    title: "体验深度追星",
    eyebrow: "05 / A LITTLE CLOSER",
    intro:
      "会员、签售和演唱会，是不同的参与路径。先看懂资格、抽选、付款、身份与现场规则，再决定哪一段体验值得你投入。你的第一步可以只是做一份清楚的准备清单。",
    goals: [
      "理解 GLOBAL 与 JAPAN 会员的适用范围",
      "分清报名、抽选、付款与入场的不同环节",
      "从当期官方公告独立检查一次线下参与条件",
    ],
    image: "assets/alternate-group.webp",
    imageAlt: "ILLIT 五位成员在 I’LL LIKE YOU 时期的 BETWEEN 版本官方概念照",
    imageCredit: {
      label: "I’LL LIKE YOU / BETWEEN · BELIFT LAB 官方概念照",
      url: "https://beliftlab.com/artist/discography/ILLIT/11",
    },
    sections: [
      {
        id: "membership-basics",
        title: "会员是一项服务，不是一张通行保证",
        kicker: "MEMBERSHIP, EXPLAINED",
        intro:
          "免费加入 Weverse 社群、购买付费粉丝会员、购买实体会员礼盒，是需要分别阅读的内容。看见「会员优先」时，也要继续读它究竟提供了报名资格、优先抽选，还是某种内容权益。",
        items: [
          {
            title: "GLOBAL 与 JAPAN：先匹配活动，再选会员",
            label: "CHOOSE THE RIGHT MEMBERSHIP",
            text: "ILLIT 在 Weverse Shop 有 GLOBAL 与 JAPAN 会员产品。它们服务的销售渠道、地区条件和部分权益可能不同；同一账号可持有不同类别，不等于两者权益自动互通。日本官网的会员限定栏目和日本场先行活动，要读该活动究竟接受 JAPAN、GLOBAL，还是另设入口。不要仅因为自己住在海外就推定必须买某一类。",
            url: "https://shop.weverse.io/en/shop/USD/artists/120/notices/11015",
            linkLabel: "查看 GLOBAL / JAPAN 会员官方说明",
          },
          {
            title: "看有效期，也看续费与账号",
            label: "CHECK THE DETAILS",
            text: "先确认当前商品页标注的有效期、权益内容、购买与续费条件。官方 JAPAN 会员商品说明包含有效期及自动续费相关安排；是否启用自动付款，应在自己账号的会员或付款设置中核对，不能假定到期一定自动停止。会员名字、账号和活动填写信息之后可能参与核验，购买前要认真确认，不把账号、订单号或证件发到公开笔记。",
            url: "https://shop.weverse.io/ja/shop/JPY/artists/120/sales/67270",
            linkLabel: "阅读 JAPAN 会员当前商品说明",
          },
          {
            title: "续费不会保证中奖或有票",
            label: "ELIGIBILITY ≠ A WIN",
            text: "会员可能提供某些场次的报名或先行抽选资格，但名额、活动开放范围与结果由当期规则决定。购买或续费不保证抽中演唱会、签售或特别活动。部分活动要求报名日和演出日都保持有效，也可能只认指定的会员类型；已经有会员也要逐项核对。",
          },
        ],
      },
      {
        id: "fansign-flow",
        title: "签售：商品、报名、抽选是三个环节",
        kicker: "A FANSIGN IS AN EVENT",
        intro:
          "线下签售、视频通话签售、见面或签名相关活动可能使用不同方式。不要把网友参加另一场的经验当成统一规则，也不要把买到一张专辑理解成已经得到见面资格。",
        items: [
          {
            title: "先找到活动公告和指定销售页面",
            label: "READ BEFORE BUYING",
            text: "确认主办或销售渠道、活动形式、可报名商品、购买期间、是否需要另填报名表、报名截止和中奖公布位置。有的活动只认可指定标识商品、指定商店或特定订单条件；普通同名专辑未必有效。是否按购买数量累计机会、哪些版本不参加，都只能从这一场的官方规则判断。先算好包含运费的预算，不为不确定的结果不断追加消费。",
          },
          {
            title: "把「申请成功」与「中选」分开",
            label: "AFTER APPLYING",
            text: "提交申请只说明进入了该活动的流程。接下来还要等官方结果，核对获选者的确认、付款或回复期限，以及现场或视频通话的准备要求。实名、年龄、地区、证件、账号与设备条件按本场公告执行。身份资料只在可信的官方指定流程提交；本站的清单不会收集证件或替你提交报名。",
          },
          {
            title: "真实例子：活动还没到，报名却已结束",
            label: "HISTORICAL EXAMPLE · 2026-10",
            text: "ILLIT 的 BREAK EVEN Soundwave 签售官方公告列出：活动安排在 2026 年 11 月 12 日，申请期却是 10 月 28 日至 30 日（韩国时间）。因此截至本站核对日 2026 年 11 月 8 日，不能因为活动日还没到就认为仍能报名。这个例子用来练习阅读「申请期、结果日、活动日」；名额、商品和身份要求必须回到原公告，不能沿用到下一场。",
            url: "https://weverse.io/illit/notice/40425",
            linkLabel: "查看这场 Soundwave 签售官方公告",
          },
        ],
      },
      {
        id: "concert-checklist",
        title: "演唱会：从买票资格走到真正入场",
        kicker: "BEFORE YOU GO",
        intro:
          "「有资格报名」「抽中了」「付过款」「领到了票」「通过入场核验」是不同状态。用一张流程清单把它们串起来，可以避免错过截止时间，也能帮助你在订交通住宿前评估不确定性。",
        items: [
          {
            title: "先行、一般发售、升级：看清这一轮在卖什么",
            label: "TICKETING",
            text: "会员先行可能是抽选，并非先到先得；一般发售也不保证有余票。VIP 或其他升级申请可能要求你已经通过指定批次买到基础票，并不总是一张可单独购买的完整门票。每次都核对申请对象、会员类别、张数限制、同行人要求、受理地区与付款方式，再决定要不要进入流程。",
          },
          {
            title: "证件、票面与会员资料要能对应",
            label: "IDENTITY",
            text: "查阅当场可接受的证件类型、是否要求有效期内的原件、票面姓名与同行人的核验方式，以及电子会员卡需要如何出示。以日本 PRESS START 的 2026 年 6 月 3 日官方说明为例，部分席种需进行本人确认，并明确不接受会员卡截图及不符合要求的证件形式。这是该场历史规则，不代表每一场都查同样的资料；真正出发前要按本次公告准备所列实体证件原件。",
            url: "https://illit-official.jp/news/dbba4207392e",
            linkLabel: "阅读历史场次的本人确认说明",
          },
          {
            title: "最后一周，重新读一次现场须知",
            label: "ON THE DAY",
            text: "确认开场与开演时间、交通、领票方式、包袋限制、拍摄规定、应援物尺寸和场地要求。不要依赖非官方转卖或借用他人实名票，票务限制也适用于无偿转让等情况时，以当场说明为准。保持应援物不遮挡视线，不在禁止的场合拍摄；如果临时有健康或出演调整，跟随官方更新安排自己的行程。",
          },
        ],
      },
      {
        id: "read-real-notices",
        title: "一起拆开一则真实公告",
        kicker: "NOTICE READING PRACTICE",
        intro:
          "不要只看转发图片里的大标题。先确认原网站和发布时间，再把公告拆成「谁能参加、做什么、何时截止、下一步在哪里」。同一活动可能发布多轮补充说明，后续更新也要一起读。",
        items: [
          {
            title: "2026-10-22：日本安可场 VIP 升级受理",
            label: "HISTORICAL EXAMPLE",
            text: "PRESS START ENCORE 日本场这轮 VIP 升级公告要求申请人先持有指定 JAPAN 会员先行批次中选并完成付款的指定席票，然后参加升级抽选。它不是一份对所有人开放的新门票销售。该轮申请已于 2026 年 10 月 28 日结束；这里仅示范如何识别「已有基础票」这一前提，不提供报名，也不把这个前提套用到其他场次。",
            url: "https://illit-official.jp/news/be59fccc0bed",
            linkLabel: "读这轮升级抽选原公告",
          },
          {
            title: "2026-11-06：结果出来，还要看后续状态",
            label: "FOLLOW-UP NOTICE",
            text: "同一场的结果通知继续说明结果查询与付款安排，并指向日本官网会员 TICKET 页的专用入口。这个例子提醒我们：「报名结束」不是流程结束，收到消息后还要分清自己是中选、待付款，还是已经完成出票条件。当前是否仍可操作、具体截止时刻和付款方式，要直接看这一轮的后续公告，旧教程不能替你判断。",
            url: "https://illit-official.jp/news/805e05cbb1c9",
            linkLabel: "看这轮结果与后续说明",
          },
          {
            title: "给自己的信息渠道设一个安静的提醒",
            label: "A REPEATABLE HABIT",
            text: "固定查看 ILLIT Weverse 的 Notice、日本官网 NEWS，以及活动指定票务或商店。收藏原公告，笔记只记录公开信息和自己的待办：公告日期、申请窗口、结果日、付款或确认截止、活动日、必需材料与更新时间。提醒只为你保留选择，不需要全天守着消息。",
            url: "https://illit-official.jp/news/",
            linkLabel: "ILLIT 日本官网最新 NEWS",
          },
        ],
      },
    ],
    tool: {
      type: "event-checklist",
      title: "活动前，做一次自己的条件核对",
      intro:
        "选一个想了解的方向，得到一张准备清单。此处只模拟整理，不进行购买、报名、付款或资料提交，也不判断你已经满足活动资格。",
      choices: [
        {
          id: "membership",
          label: "了解会员",
          title: "会员购买前核对",
          text: "先弄清服务内容与自己的需要，再决定是否购买。",
          steps: [
            "确认要了解 GLOBAL 还是 JAPAN，以及活动接受的会员类型。",
            "阅读当前商品的权益、有效期、地区与账号要求。",
            "核对姓名等资料能否与未来活动要求对应。",
            "查看续费、自动付款和取消条件，设置自己的到期提醒。",
            "接受会员不保证有票或中奖；只比较资料也可以完成学习。",
          ],
        },
        {
          id: "fansign",
          label: "了解签售",
          title: "签售报名信息核对",
          text: "用一则原公告区分购买、申请与获选。",
          steps: [
            "确认主办、活动形式、日期与官方指定销售链接。",
            "找出有资格的商品、购买期及单独报名要求。",
            "记录申请截止、结果日与当选后要完成的事项。",
            "核对年龄、地区、实名、证件及设备等本场条件。",
            "设定预算并接受未中选的可能；不在本站提交任何个人证件。",
          ],
        },
        {
          id: "concert",
          label: "准备演唱会",
          title: "演唱会出发前核对",
          text: "从资格到入场逐项确认，避免只停在「我有一张票」。",
          steps: [
            "确认本轮是抽选、售票还是升级，以及必要的基础票条件。",
            "核对会员类型、有效期、同行人及地区条件。",
            "记录结果、付款、领票和入场的不同时间。",
            "按当前场次说明准备实体证件原件及对应票务、会员资料。",
            "再次核对交通、应援物、拍摄与场地要求，再安排出行。",
          ],
        },
        {
          id: "offline",
          label: "其他线下活动",
          title: "线下公告阅读清单",
          text: "快闪、公开录制和特别活动也需要逐场看规则。",
          steps: [
            "从艺人官方公告确认活动真实存在与主办信息。",
            "区分自由入场、预约、抽选与现场购买，不自行推定。",
            "检查适用会员、年龄、地区及指定证明材料。",
            "记录集合地点、到达时间、取消办法与现场秩序要求。",
            "临行前查更新，只通过官方指定流程行动。",
          ],
        },
      ],
    },
    tasks: [
      {
        id: "s5-choose",
        title: "选择一种值得了解的体验",
        text: "选择会员、签售、演唱会或其他线下活动，写下为什么想体验，以及时间、预算或出行上的边界。预算写零、只研究规则也可以。",
      },
      {
        id: "s5-notice",
        title: "拆解一则有日期的官方公告",
        text: "用本关历史公告或最新公告，记录申请资格、申请截止、结果日、活动日和后续义务。注明这是已结束示例还是仍在受理，不能只看活动日。",
        link: "https://weverse.io/illit/notice/40425",
        linkLabel: "使用 Soundwave 公告练习",
      },
      {
        id: "s5-check",
        title: "完成一张准备清单",
        text: "使用上方工具，确认还缺哪些公开信息、应该去哪里核实。笔记里不写证件号码、密码、完整订单或付款资料；完成学习不需要真的报名。",
      },
    ],
    quiz: [
      {
        id: "s5-q1",
        question: "购买或续费粉丝会员，一般能保证什么？",
        options: [
          "所有演唱会都有票",
          "按该商品规则获得会员权益；活动资格与结果还要看当期公告",
          "所有签售至少中选一次",
        ],
        answer: 1,
        explanation:
          "会员权益、活动报名资格与抽选结果是不同层次。GLOBAL 与 JAPAN 也不能默认互通；必须读商品和活动当前规则。",
      },
      {
        id: "s5-q2",
        question: "一场活动在下周举行，是否一定还能报名？",
        options: [
          "一定可以，活动没开始就能报名",
          "只要购买任意同名专辑就能补报",
          "不一定，要看该活动自己的申请窗口是否已结束",
        ],
        answer: 2,
        explanation:
          "活动日、申请截止与结果日不是同一天。本关 Soundwave 示例的活动日在 11 月，报名却已在 10 月结束。",
      },
      {
        id: "s5-q3",
        question: "准备演唱会身份核验，最可靠的做法是什么？",
        options: [
          "读本场最新官方须知，准备它要求的原件并核对票面资料",
          "带一张旧场次使用过的证件照片就足够",
          "用朋友的实名会员卡和票一定能入场",
        ],
        answer: 0,
        explanation:
          "不同场次和席种的要求可能不同。要按本场官方说明核对有效证件原件、票面及会员信息，不能靠历史经验保证入场。",
      },
    ],
    sources: [
      {
        title: "Weverse Shop · ILLIT GLOBAL / JAPAN Membership 说明",
        url: "https://shop.weverse.io/en/shop/USD/artists/120/notices/11015",
        supports: "会员类别与续版商品官方入口；实际权益以当前商品页为准。",
      },
      {
        title: "Weverse Shop · JAPAN Membership 当前商品页",
        url: "https://shop.weverse.io/ja/shop/JPY/artists/120/sales/67270",
        supports:
          "会员有效期、同账号购买及自动续费相关说明；核对于 2026-11-08。",
      },
      {
        title: "Weverse · BREAK EVEN Soundwave 签售公告",
        url: "https://weverse.io/illit/notice/40425",
        supports:
          "2026-10-28 至 10-30 申请、11-12 活动的历史示例；不是开放报名按钮。",
      },
      {
        title: "ILLIT Japan · 2026-06-03 PRESS START 现场说明",
        url: "https://illit-official.jp/news/dbba4207392e",
        supports:
          "历史场次实名、证件原件、会员卡与现场规范；不沿用为所有场次规则。",
      },
      {
        title: "ILLIT Japan · 2026-10-22 安可场 VIP 升级",
        url: "https://illit-official.jp/news/be59fccc0bed",
        supports:
          "先持有指定已付款基础票、再申请升级的历史抽选示例；申请期已结束。",
      },
      {
        title: "ILLIT Japan · 2026-11-06 升级结果通知",
        url: "https://illit-official.jp/news/805e05cbb1c9",
        supports: "结果查询与付款流程独立于报名的实例；操作以当期公告为准。",
      },
      {
        title: "ILLIT Japan · 最新 NEWS",
        url: "https://illit-official.jp/news/",
        supports: "公告更新与日本活动官方信息入口。",
      },
    ],
  },
];
