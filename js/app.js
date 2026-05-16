/*
 * 留白 coffee — 品牌展示型单页应用 (SPA)
 * 纯 HTML/CSS/原生 JS，零框架依赖
 * 包含：首页轮播、菜单搜索筛选收藏、关于品牌、联系方式、社区互动
 */

// ==============================
//  DOM 引用
// ==============================

const app = document.getElementById("app");
const nav = document.getElementById("mainNav");
const navLinks = [...nav.querySelectorAll("a[data-page]")];
const themeToggle = document.getElementById("themeToggle");
const musicBtn = document.getElementById("musicBtn");
const toast = document.getElementById("toast");
const modal = document.getElementById("detailModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

// ==============================
//  静态数据：图片 & 文案
// ==============================

/** 首页 Hero 轮播图 */
const heroImages = [
  "./img/hero-1.jpg",
  "./img/hero-2.jpg",
  "./img/hero-3.jpg",
  "./img/hero-4.jpg",
];

const heroCaptions = [
  "暖灯光与咖啡香交织的午后",
  "今日推荐：卡布奇诺",
  "安静座位与木质空间",
  "每日现烤甜点",
];

/** 关于页轮播图 */
const aboutImages = [
  "./img/about-slide-1.jpg",
  "./img/about-slide-2.jpg",
  "./img/about-slide-3.jpg",
  "./img/about-slide-4.jpg",
];

const aboutCaptions = [
  "柔和灯光与木质空间 — 自然光 · 木质感 · 安静氛围",
  "平衡风味 · 干净尾韵 — 以甜感为核心 · 日常饮用与轻松社交",
  "稳定出品 · 匠心手作 — 从研磨到萃取 · 每一杯都保持统一",
  "留白 · 品牌温度 — 保留空间与情绪的呼吸感",
];

/**
 * 菜单数据 — 结构：[名称, 描述, 图片路径, 价格(¥), 标签1, 标签2, 标签3]
 * 三分类：coffee 经典咖啡 / special 特调系列 / bakery 烘焙点心
 */
const menuData = {
  coffee: [
    ["留白拿铁", "柔和奶香与中度烘焙拼配豆，入口顺滑。", "./img/hero-2.jpg", 28, "奶香", "顺滑", "热门"],
    ["晨雾美式", "干净明亮，适合早晨醒神与长时间工作。", "./img/menu-2.jpg", 24, "清爽", "提神", "经典"],
    ["焦糖玛奇朵", "层次分明，焦糖香气与浓缩风味彼此衬托。", "./img/menu-3.jpg", 32, "甜香", "浓郁", "推荐"],
    ["手冲耶加雪菲", "花香与柑橘酸质平衡，尾韵干净。", "./img/menu-4.jpg", 36, "果香", "手冲", "精品"],
    ["榛果拿铁", "榛果香气与奶泡融合，口感温润。", "./img/menu-5.jpg", 30, "坚果", "温润", "热门"],
  ],
  special: [
    ["黑糖燕麦拿铁", "黑糖甜香搭配燕麦奶，温润不腻。", "./img/special-1.jpg", 34, "黑糖", "燕麦奶", "限定"],
    ["海盐雾盖可可", "咸甜交织，适合午後小憩。", "./img/special-2.jpg", 31, "可可", "雾盖", "限定"],
    ["抹茶云朵", "茶香清雅，口感轻盈顺滑。", "./img/special-3.jpg", 33, "抹茶", "轻盈", "热门"],
    ["桂花冷萃", "冷萃基底加入桂花蜜，清甜回甘。", "./img/special-4.jpg", 35, "花香", "冷萃", "季节"],
    ["焦糖海盐冰拿铁", "微咸焦糖平衡甜感，层次更丰富。", "./img/special-5.jpg", 34, "冰饮", "层次", "推荐"],
  ],
  bakery: [
    ["蓝莓司康", "外层微脆，内部松软，果香明显。", "./img/bakery-1.jpg", 18, "果香", "酥脆", "甜点"],
    ["黄油可颂", "层层起酥，黄油香浓。", "./img/bakery-2.jpg", 16, "酥皮", "经典", "热卖"],
    ["香蕉磅蛋糕", "湿润绵密，适合搭配热咖啡。", "./img/bakery-3.jpg", 19, "绵密", "下午茶", "推荐"],
    ["抹茶红豆卷", "茶香与豆香融合，口感柔软。", "./img/bakery-4.jpg", 22, "抹茶", "豆香", "人气"],
    ["提拉米苏杯", "咖啡酒香浓郁，细腻顺滑。", "./img/bakery-5.jpg", 26, "咖啡香", "细腻", "经典"],
  ],
};

/** 图片路径映射，按页面/分类组织 */
const imageMap = {
  about: [
    "./img/about-slide-1.jpg",
    "./img/about-slide-2.jpg",
    "./img/about-slide-3.jpg",
    "./img/about-slide-4.jpg",
  ],
  menu: {
    coffee: [
      "./img/hero-2.jpg",
      "./img/menu-2.jpg",
      "./img/menu-3.jpg",
      "./img/menu-4.jpg",
      "./img/menu-5.jpg",
    ],
    special: [
      "./img/special-1.jpg",
      "./img/special-2.jpg",
      "./img/special-3.jpg",
      "./img/special-4.jpg",
      "./img/special-5.jpg",
    ],
    bakery: [
      "./img/bakery-1.jpg",
      "./img/bakery-2.jpg",
      "./img/bakery-3.jpg",
      "./img/bakery-4.jpg",
      "./img/bakery-5.jpg",
    ],
  },
};

// ==============================
//  应用全局状态
// ==============================

const state = {
  page: "home",                                                              // 当前页面
  menuTab: "coffee",                                                         // 菜单分类标签
  search: "",                                                                // 搜索关键词
  favorites: new Set(JSON.parse(localStorage.getItem("liubai-favorites") || "[]")),
  theme: localStorage.getItem("liubai-theme") || "night",
  heroIndex: 0,                                                              // 首页轮播当前索引
  heroMode: "auto",                                                          // 轮播模式：auto 自动 / manual 手动
  aboutIndex: 0,                                                             // 关于页轮播当前索引
};

document.body.dataset.theme = state.theme;
themeToggle.textContent = state.theme === "night" ? "☀" : "☾";

// ==============================
//  工具函数
// ==============================

/** 显示底部 Toast 提示，1.5 秒后自动消失 */
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
}

/** 高亮当前页面对应的导航链接 */
function setActiveNav() {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.page === state.page);
  });
}

/** HTML 特殊字符转义，防止 XSS 攻击 */
function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * 切换按钮加载状态
 * @param {HTMLElement} element - 目标元素
 * @param {boolean} isBusy - 是否加载中
 * @param {string} [loadingLabel] - 加载时显示的文字
 */
function setBusy(element, isBusy, loadingLabel) {
  if (!element) return;

  element.classList.toggle("loading", isBusy);

  if (isBusy && loadingLabel) {
    element.dataset.originalLabel = element.dataset.originalLabel || element.textContent;
    element.textContent = loadingLabel;
  } else if (!isBusy && element.dataset.originalLabel) {
    element.textContent = element.dataset.originalLabel;
    delete element.dataset.originalLabel;
  }
}

// ==============================
//  页面渲染函数
//  每个 render*() 返回该页面完整的 HTML 字符串
// ==============================

/** 首页 — Hero 轮播 + 品牌亮点 + 日常故事 + 店内感受 + 今日片刻 */
function renderHome() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Warm · Calm · Crafted</p>
        <h1>留白 coffee</h1>
        <div class="hero-badges">
          <span class="status-chip"><span class="status-dot"></span> 营业中 08:00 - 21:00</span>
          <span class="status-chip">今日特调已上新</span>
          <span class="status-chip">支持收藏与详情查看</span>
          <span class="status-chip">适合工作 / 阅读 / 约会</span>
        </div>

        <div class="actions">
          <button class="btn primary" data-go="menu">浏览菜单</button>
          <button class="btn secondary" data-go="about">了解品牌</button>
          <button class="btn secondary" data-go="contact">联系到店</button>
        </div>

        <div class="stats">
          <article class="stat card"><strong>30+</strong><span>饮品与甜点</span></article>
          <article class="stat card"><strong>100%</strong><span>现磨现做</span></article>
          <article class="stat card"><strong>Daily</strong><span>稳定营业</span></article>
        </div>

        <div class="switch-ribbon">
          <button class="ribbon-btn ${state.heroMode === "auto" ? "active" : ""}" data-hero-mode="auto">自动轮播</button>
          <button class="ribbon-btn ${state.heroMode === "manual" ? "active" : ""}" data-hero-mode="manual">手动切换</button>
        </div>
      </div>

      <div class="preview" id="heroPreview">
        ${heroImages
          .map(
            (src, index) => `
              <div class="hero-slide ${index === state.heroIndex ? "active" : ""}" style="background-image:url('${src}')"></div>
            `
          )
          .join("")}

        <div class="preview-overlay">
          <div class="preview-top">
            <div class="anime-tag"><span class="heart"></span> Anime Café Mood</div>
            <div class="anime-tag" id="heroCaption">${heroCaptions[state.heroIndex]}</div>
          </div>

          <div class="mini-panel">
            <h3>今日推荐</h3>
            <p>浓缩与奶泡平衡，入口柔和，适合作为本日主推。</p>
          </div>
        </div>

        <div class="slider-dots" id="heroDots">
          ${heroImages
            .map(
              (_, index) => `
                <button class="slider-dot ${index === state.heroIndex ? "active" : ""}" data-hero-dot="${index}" aria-label="切换到第 ${index + 1} 张首页图片"></button>
              `
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Highlights</p>
          <h2>品牌亮点</h2>
        </div>
      </div>
      <div class="grid">
        <article class="card"><h3>视觉统一</h3><p>保留二次元氛围，但更适合品牌展示。</p></article>
        <article class="card"><h3>浏览清晰</h3><p>结构更像真实官网，重点信息更明确。</p></article>
        <article class="card"><h3>交互完整</h3><p>支持搜索、筛选、收藏、弹窗查看。</p></article>
        <article class="card"><h3>品牌故事</h3><p>从一杯咖啡开始，把安静、温暖和审美都放进日常。</p></article>
        <article class="card"><h3>空间氛围</h3><p>木质、柔光、留白布局，让每一次停留都更轻松。</p></article>
        <article class="card"><h3>今日推荐</h3><p>从经典拿铁到季节特调，提供更适合不同心情的选择。</p></article>
      </div>
    </section>

    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Story</p>
          <h2>留白咖啡馆的日常</h2>
        </div>
      </div>
      <div class="grid">
        <article class="card"><h3>早晨</h3><p>一杯美式和一份司康，开启缓慢但清醒的一天。</p></article>
        <article class="card"><h3>午后</h3><p>拿铁、甜点与窗边座位，是最适合发呆和工作的时刻。</p></article>
        <article class="card"><h3>傍晚</h3><p>冷萃或特调配上安静的音乐，适合约会和聊天。</p></article>
        <article class="card"><h3>夜晚</h3><p>灯光变柔，空间更安静，适合收尾一天的情绪。</p></article>
        <article class="card"><h3>雨天</h3><p>一边听雨一边喝热咖啡，最容易放空。</p></article>
        <article class="card"><h3>周末</h3><p>人流更轻松，适合约朋友一起慢慢坐。</p></article>
      </div>
    </section>

    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Preview</p>
          <h2>店内感受</h2>
        </div>
      </div>
      <div class="story-band">
        <article class="story-card"><h3>自然光</h3><p>窗边光线柔和，拍照与阅读都很舒服。</p></article>
        <article class="story-card"><h3>木质家具</h3><p>用更温润的材质弱化空间噪音。</p></article>
        <article class="story-card"><h3>轻音乐</h3><p>白噪音式节奏，适合长时间停留。</p></article>
        <article class="story-card"><h3>慢节奏</h3><p>让咖啡不只是饮品，也是一段短暂停顿。</p></article>
        <article class="story-card"><h3>窗边座位</h3><p>适合一个人发呆、做笔记或安静工作。</p></article>
        <article class="story-card"><h3>主题装饰</h3><p>季节性的杯套和桌牌，让每次来店都有新鲜感。</p></article>
      </div>
    </section>

    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Moments</p>
          <h2>今日片刻</h2>
        </div>
      </div>
      <div class="event-grid">
        <article class="event-card"><h3>第一杯咖啡</h3><p>每天清晨的第一杯，决定了今天的节奏。</p></article>
        <article class="event-card"><h3>手冲时刻</h3><p>手冲的萃取过程，让味道更清晰，也更有仪式感。</p></article>
        <article class="event-card"><h3>甜点上桌</h3><p>香气和摆盘一起出现，心情会立刻变轻。</p></article>
        <article class="event-card"><h3>社群留言</h3><p>来自顾客的分享，是店里最真实的反馈。</p></article>
        <article class="event-card"><h3>午间加餐</h3><p>一份司康加一杯热饮，最适合忙碌间隙。</p></article>
        <article class="event-card"><h3>晚间收尾</h3><p>关店前的最后一杯，常常最安静也最治愈。</p></article>
      </div>
    </section>
  `;
}

/** 菜单页 — 搜索筛选 + 分类标签 + 收藏 + 点单建议 */
function renderMenu() {
  const keyword = state.search.trim().toLowerCase();

  // 按关键词过滤当前分类下的菜品
  const filteredItems = menuData[state.menuTab].filter((item) => {
    if (!keyword) return true;
    return [item[0], item[1], item[4], item[5], item[6]].join(" ").toLowerCase().includes(keyword);
  });

  const cards = filteredItems
    .map((item) => {
      const isFavorite = state.favorites.has(item[0]);

      return `
        <article class="menu-card" data-item="${item[0]}">
          <img src="${item[2]}" alt="${item[0]}" />
          <div class="card-body">
            <div class="menu-topline">
              <h3>${item[0]}</h3>
              <button class="fav-btn ${isFavorite ? "active" : ""}" data-fav="${item[0]}">${isFavorite ? "❤" : "♡"}</button>
            </div>
            <p class="muted-p">${item[1]}</p>
            <div class="menu-topline">
              <span class="price">¥${item[3]}</span>
              <span class="muted-p">${item[6]}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  // 根据当前分类生成对应的标题和说明文案
  const sectionLabel = state.menuTab === "coffee" ? "经典咖啡" : state.menuTab === "special" ? "特调系列" : "烘焙点心";
  const introText =
    state.menuTab === "coffee"
      ? "适合日常饮用的稳定风味，强调干净、顺口与平衡。"
      : state.menuTab === "special"
        ? "季节感更强、风味更有记忆点的限定/创意组合。"
        : "适合搭配咖啡的现烤点心，强调口感和香气的层次。";

  const quickGuide =
    state.menuTab === "coffee"
      ? [
          ["手冲耶加雪菲", "花香与柑橘酸质，清爽干净。"],
          ["晨雾美式", "醒神提气，适合早晨和工作时段。"],
          ["留白拿铁", "柔和奶香，口感顺滑。"],
          ["榛果拿铁", "坚果香与奶泡的温润组合。"],
        ]
      : state.menuTab === "special"
        ? [
            ["黑糖燕麦拿铁", "黑糖甜香与燕麦奶的柔和融合。"],
            ["抹茶云朵", "茶香清雅，口感轻盈。"],
            ["桂花冷萃", "清甜回甘，夏日感很强。"],
            ["焦糖海盐冰拿铁", "微咸焦糖平衡甜感。"],
          ]
        : [
            ["黄油可颂", "层层起酥，黄油香浓。"],
            ["蓝莓司康", "外脆内软，果香明显。"],
            ["提拉米苏杯", "咖啡酒香浓郁。"],
            ["香蕉磅蛋糕", "湿润绵密，适合热咖啡。"],
          ];

  return `
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Menu</p>
          <h1>精选菜单</h1>
        </div>
        <div class="section-actions">
          <input class="search" id="menuSearch" type="search" value="${state.search}" placeholder="搜索饮品、甜点、标签" />
        </div>
      </div>

      <div class="menu-intro">
        <div class="menu-panel">
          <h3>${sectionLabel}</h3>
          <p>${introText}</p>
          <div class="menu-badge-row">
            <span class="menu-badge">推荐</span>
            <span class="menu-badge">热销</span>
            <span class="menu-badge">季节限定</span>
            <span class="menu-badge">适合拍照</span>
          </div>
        </div>

        <div class="menu-panel">
          <h3>本页说明</h3>
          <div class="menu-list">
            ${quickGuide
              .map(
                ([name, desc]) => `
                  <div class="menu-list-item">
                    <div>
                      <strong>${name}</strong>
                      <span>${desc}</span>
                    </div>
                    <span>✓</span>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </div>

      <div class="tabs">
        <button class="tab ${state.menuTab === "coffee" ? "active" : ""}" data-tab="coffee">咖啡</button>
        <button class="tab ${state.menuTab === "special" ? "active" : ""}" data-tab="special">特调</button>
        <button class="tab ${state.menuTab === "bakery" ? "active" : ""}" data-tab="bakery">烘焙</button>
      </div>

      <div class="menu-grid">${cards || '<div class="card">没有找到匹配内容。</div>'}</div>

      <div class="banner">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <p class="eyebrow">Selection Guide</p>
            <h2>点单建议</h2>
          </div>
        </div>
        <div class="promo-grid">
          <article class="promo-card"><h3>第一次来</h3><p>建议从留白拿铁、晨雾美式开始，风味更容易接受。</p></article>
          <article class="promo-card"><h3>喜欢甜感</h3><p>黑糖燕麦拿铁、焦糖玛奇朵、提拉米苏杯很适合。</p></article>
          <article class="promo-card"><h3>喜欢清爽</h3><p>手冲耶加雪菲、桂花冷萃、海盐雾盖可可会更清透。</p></article>
          <article class="promo-card"><h3>下午茶搭配</h3><p>蓝莓司康、黄油可颂、香蕉磅蛋糕都很百搭。</p></article>
        </div>
      </div>

      <div class="banner">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <p class="eyebrow">Hot List</p>
            <h2>热销排行</h2>
          </div>
        </div>
        <div class="grid">
          <article class="card"><h3>1. 留白拿铁</h3><p>稳定、顺滑、适配大多数人群。</p></article>
          <article class="card"><h3>2. 黑糖燕麦拿铁</h3><p>甜感高，适合偏爱奶咖的人。</p></article>
          <article class="card"><h3>3. 抹茶云朵</h3><p>高颜值与轻盈口感兼具。</p></article>
          <article class="card"><h3>4. 蓝莓司康</h3><p>早餐和下午茶都很受欢迎。</p></article>
          <article class="card"><h3>5. 焦糖玛奇朵</h3><p>经典甜香，适合初次来店。</p></article>
          <article class="card"><h3>6. 手冲耶加雪菲</h3><p>清爽花果香，适合慢慢品味。</p></article>
        </div>
      </div>

      <div class="banner">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <p class="eyebrow">Seasonal</p>
            <h2>季节限定</h2>
          </div>
        </div>
        <div class="grid">
          <article class="card"><h3>桂花冷萃</h3><p>夏秋时段的花香冷饮，清爽回甘。</p></article>
          <article class="card"><h3>焦糖海盐冰拿铁</h3><p>带一点咸味的平衡型冰饮。</p></article>
          <article class="card"><h3>海盐雾盖可可</h3><p>适合天气热的时候来一杯。</p></article>
          <article class="card"><h3>抹茶红豆卷</h3><p>茶香与豆香的节令甜点组合。</p></article>
          <article class="card"><h3>柚子气泡美式</h3><p>清爽气泡感，适合夏天午后。</p></article>
          <article class="card"><h3>杏仁奶咖</h3><p>更轻盈的坚果奶香版本。</p></article>
        </div>
      </div>

      <div class="banner">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <p class="eyebrow">Pairing Tips</p>
            <h2>搭配推荐</h2>
          </div>
        </div>
        <div class="grid">
          <article class="card"><h3>热饮 + 酥点</h3><p>适合清晨和冷天气，口感很稳。</p></article>
          <article class="card"><h3>冷萃 + 柑橘系甜点</h3><p>更清爽，适合夏天。</p></article>
          <article class="card"><h3>奶咖 + 巧克力甜点</h3><p>适合喜欢浓郁风味的人。</p></article>
          <article class="card"><h3>手冲 + 原味司康</h3><p>能更突出咖啡本身层次。</p></article>
        </div>
      </div>
    </section>
  `;
}

/** 关于页 — 品牌理念 + 价值观 + 旅程 + 团队 + 轮播图 */
function renderAbout() {
  return `
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">About</p>
          <h1>关于留白 coffee</h1>
        </div>
      </div>

      <div class="about-layout">
        <section>
          <div class="about-hero">
            <h2>我们想做一个什么样的咖啡馆</h2>
            <p class="about-note">
              留白 coffee 关注风味、空间与体验，希望在视觉和服务上都保持稳定、舒适、专业的品牌感。
              这里不只是喝咖啡的地方，也是可以安静停留、整理思绪、与朋友轻声聊天的空间。
            </p>
          </div>

          <div class="feature-band">
            <article class="card"><h3>品牌初心</h3><p>让咖啡和空间都保留一点"留白"，给人安静、放松、愿意停留的感觉。</p></article>
            <article class="card"><h3>风味方向</h3><p>以平衡、甜感、干净尾韵为核心，围绕日常饮用和轻松社交设计菜单。</p></article>
            <article class="card"><h3>空间体验</h3><p>强调自然光、木质感、舒适座位与适合工作阅读的安静氛围。</p></article>
          </div>

          <div class="timeline">
            <div class="timeline-item"><strong>豆子与烘焙</strong><span>我们优先选择风味干净、甜感明显的咖啡豆，并配合轻中度烘焙，保持日常饮用的稳定性。</span></div>
            <div class="timeline-item"><strong>出品标准</strong><span>从研磨、萃取到奶泡细节都尽量保持统一，让每一杯都具有一致的口感和温度。</span></div>
            <div class="timeline-item"><strong>空间氛围</strong><span>店内采用柔和灯光、木质桌椅和留白式布局，尽量减少视觉噪音，让人更容易放松。</span></div>
            <div class="timeline-item"><strong>品牌活动</strong><span>会不定期推出联名甜点、主题杯套、季节限定饮品和社区打卡活动。</span></div>
          </div>
        </section>

        <aside class="about-carousel" id="aboutCarousel">
          ${aboutImages
            .map(
              (src, index) => `
            <div class="about-slide ${index === state.aboutIndex ? "active" : ""}" style="background-image:url('${src}')"></div>
          `
            )
            .join("")}
          <div class="about-carousel-overlay"></div>
          <div class="about-carousel-caption" id="aboutCaption">${aboutCaptions[state.aboutIndex]}</div>
          <div class="about-carousel-dots" id="aboutDots">
            ${aboutImages
              .map(
                (_, index) => `
              <button class="about-dot ${index === state.aboutIndex ? "active" : ""}" data-about-dot="${index}" aria-label="切换到第 ${index + 1} 张关于页面图片"></button>
            `
              )
              .join("")}
          </div>
        </aside>
      </div>

      <div class="banner">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <p class="eyebrow">Values</p>
            <h2>品牌价值观</h2>
          </div>
        </div>
        <div class="values-grid">
          <article class="value-card"><h3>稳定</h3><p>每一杯都维持同样的品质标准。</p></article>
          <article class="value-card"><h3>温柔</h3><p>空间、语言和服务都尽量舒适自然。</p></article>
          <article class="value-card"><h3>清晰</h3><p>菜单和信息表达直观明确，减少选择负担。</p></article>
          <article class="value-card"><h3>留白</h3><p>保留空间与情绪的呼吸感，让人愿意停留。</p></article>
        </div>
      </div>

      <div class="banner">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <p class="eyebrow">Journey</p>
            <h2>品牌旅程</h2>
          </div>
        </div>
        <div class="journey-grid">
          <article class="journey-step"><h3>第 1 步</h3><p>从一个安静的咖啡角落开始。</p></article>
          <article class="journey-step"><h3>第 2 步</h3><p>逐渐形成自己的风味和空间语言。</p></article>
          <article class="journey-step"><h3>第 3 步</h3><p>把"好喝"和"好看"一起带给更多人。</p></article>
          <article class="journey-step"><h3>第 4 步</h3><p>让社区和品牌体验成为长期连接。</p></article>
        </div>
      </div>

      <div class="banner">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <p class="eyebrow">Team</p>
            <h2>团队介绍</h2>
          </div>
        </div>
        <div class="grid">
          <article class="card"><h3>店长</h3><p>负责整体运营与每日出品节奏。</p></article>
          <article class="card"><h3>咖啡师</h3><p>专注萃取、奶泡与稳定风味。</p></article>
          <article class="card"><h3>烘焙伙伴</h3><p>负责甜点、司康与日常备货。</p></article>
          <article class="card"><h3>社区运营</h3><p>负责活动、社群和留言互动。</p></article>
          <article class="card"><h3>视觉设计</h3><p>让品牌视觉更统一、更柔和。</p></article>
          <article class="card"><h3>门店支持</h3><p>负责后勤与高峰期的门店协助。</p></article>
        </div>
      </div>
    </section>
  `;
}

/** 联系页 — 到店信息 + 营业时间 + 联系方式 + 交通指引 + 服务流程 */
function renderContact() {
  return `
    <section class="panel">
      <div class="section-head">
        <div>
          <p class="eyebrow">Contact</p>
          <h1>联系与到店</h1>
        </div>
      </div>

      <div class="contact-grid">
        <article class="card">
          <div class="contact-hero">
            <h2>到店信息</h2>
            <p class="contact-note">青禾路 88 号，留白 coffee。地处安静街区，步行可达，适合工作日午后与周末放松。</p>
          </div>

          <div class="contact-stack">
            <div class="contact-card"><span class="label">Address</span><p id="storeAddress">青禾路 88 号，留白 coffee</p></div>
            <div class="contact-card"><span class="label">Nearby</span><p>附近有地铁口、书店与小型公园，适合散步后来店休息。</p></div>
            <div class="contact-card">
              <span class="label">Actions</span>
              <div class="contact-actions">
                <button class="menu-chip" data-copy-address>复制地址</button>
                <button class="menu-chip" data-open-map>打开导航</button>
              </div>
            </div>
          </div>
        </article>

        <article class="card">
          <h3>营业时间</h3>
          <div class="info-list">
            <div class="info-row"><strong>周一 - 周五</strong><span>08:00 - 21:00</span></div>
            <div class="info-row"><strong>周六 - 周日</strong><span>09:00 - 22:00</span></div>
            <div class="info-row"><strong>最后点单</strong><span>闭店前 30 分钟</span></div>
            <div class="info-row"><strong>高峰时段</strong><span>14:00 - 17:00</span></div>
          </div>
        </article>

        <article class="card">
          <h3>联系方式</h3>
          <p id="storePhone">010-5688-1024</p>
          <p class="muted-p" style="margin-top:8px">可用于预订座位、团购咨询、活动合作和企业接待。</p>
          <div class="contact-actions"><button class="menu-chip" data-call>一键拨号</button></div>
        </article>

        <article class="card">
          <h3>服务说明</h3>
          <div class="timeline">
            <div class="timeline-item"><strong>堂食</strong><span>支持双人桌、四人桌与窗边单人座。</span></div>
            <div class="timeline-item"><strong>外带</strong><span>可快速出杯，适合上班路上顺手带走。</span></div>
            <div class="timeline-item"><strong>活动合作</strong><span>欢迎联名、拍摄、品牌体验和社群活动预约。</span></div>
            <div class="timeline-item"><strong>预约建议</strong><span>周末建议提前预约窗边座位，体验会更舒适。</span></div>
          </div>
        </article>
      </div>

      <div class="banner">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <p class="eyebrow">Location</p>
            <h2>位置与交通</h2>
          </div>
        </div>
        <div class="location-grid">
          <article class="location-card"><h3>地铁</h3><p>步行 8 分钟可达。</p></article>
          <article class="location-card"><h3>公交</h3><p>附近 3 条线路可到。</p></article>
          <article class="location-card"><h3>停车</h3><p>街边有少量停车位。</p></article>
          <article class="location-card"><h3>骑行</h3><p>门口支持短暂停放。</p></article>
          <article class="location-card"><h3>步行</h3><p>沿街道直走就能看到门头。</p></article>
          <article class="location-card"><h3>导航建议</h3><p>建议在白天到店，周边更容易找到车位。</p></article>
        </div>
      </div>

      <div class="banner">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <p class="eyebrow">Quick Links</p>
            <h2>常用入口</h2>
          </div>
        </div>
        <div class="quick-links-grid">
          <article class="banner-card"><h3>预约座位</h3><p>适合双人约会、阅读和拍照。</p></article>
          <article class="banner-card"><h3>活动合作</h3><p>欢迎品牌联名与小型展览合作。</p></article>
          <article class="banner-card"><h3>外带服务</h3><p>通勤时顺手带一杯的稳定选择。</p></article>
          <article class="banner-card"><h3>企业接待</h3><p>支持团购和办公下午茶方案。</p></article>
          <article class="banner-card"><h3>到店咨询</h3><p>可提前确认座位、人数和时段。</p></article>
          <article class="banner-card"><h3>节日礼盒</h3><p>节日时会有咖啡豆和甜点礼盒。</p></article>
        </div>
      </div>

      <div class="banner">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <p class="eyebrow">Service Path</p>
            <h2>服务流程</h2>
          </div>
        </div>
        <div class="journey-grid">
          <article class="journey-step"><h3>咨询</h3><p>电话或到店了解座位、活动与点单建议。</p></article>
          <article class="journey-step"><h3>下单</h3><p>堂食、外带都可快速完成。</p></article>
          <article class="journey-step"><h3>制作</h3><p>咖啡与甜点按顺序出品。</p></article>
          <article class="journey-step"><h3>反馈</h3><p>欢迎在社区留下体验和建议。</p></article>
          <article class="journey-step"><h3>回访</h3><p>如有团购或活动需求可再次联系确认。</p></article>
          <article class="journey-step"><h3>复购</h3><p>收藏饮品后，下次来店点单会更快。</p></article>
        </div>
      </div>

      <div class="banner">
        <div class="section-head" style="margin-bottom:0">
          <div>
            <p class="eyebrow">Collaboration</p>
            <h2>合作说明</h2>
          </div>
        </div>
        <div class="grid">
          <article class="card"><h3>品牌联名</h3><p>适合饮品、甜点和视觉内容合作。</p></article>
          <article class="card"><h3>场地拍摄</h3><p>支持小型拍摄和内容取景。</p></article>
          <article class="card"><h3>社群活动</h3><p>欢迎读书会、打卡活动和限定任务。</p></article>
          <article class="card"><h3>团体预订</h3><p>适合公司下午茶与小型聚会。</p></article>
        </div>
      </div>
    </section>
  `;
}

/** 社区页 — 三栏布局：左侧状态 + 中间动态流 + 右侧发布表单 */
function renderCommunity() {
  return `
    <section class="community-shell">
      <aside class="community-rail">
        <div class="community-hero">
          <p class="eyebrow">Community</p>
          <h2>留白社区</h2>
          <p>分享到店体验、推荐搭配、拍照瞬间与今日心情。</p>
        </div>

        <div class="community-stats">
          <div class="community-stat"><strong id="communityCount">0</strong><span>社区动态</span></div>
          <div class="community-stat"><strong id="communityReplyCount">0</strong><span>累计回复</span></div>
          <div class="community-stat"><strong>24h</strong><span>持续开放</span></div>
        </div>

        <div class="community-stat"><strong>热门标签</strong><span>#拿铁 #抹茶 #司康 #窗边座位 #今日推荐</span></div>
        <div class="community-stat"><strong>精选主题</strong><span>#下午茶 #工作区 #季节限定 #安静读书</span></div>
        <div class="community-stat"><strong>本周热帖</strong><span>窗边座位、黑糖燕麦拿铁、桂花冷萃。</span></div>
      </aside>

      <section class="community-main">
        <div class="community-header">
          <div>
            <p class="eyebrow">Feed</p>
            <h1>社区动态</h1>
          </div>
          <div class="menu-badge-row">
            <span class="menu-badge">热帖榜</span>
            <span class="menu-badge">最近回复</span>
            <span class="menu-badge">本周精选</span>
          </div>
        </div>

        <div class="community-feed" id="communityFeed"></div>

        <div class="banner">
          <div class="section-head" style="margin-bottom:0">
            <div>
              <p class="eyebrow">Featured</p>
              <h2>精选热帖</h2>
            </div>
          </div>
          <div class="grid">
            <article class="card"><h3>窗边光线太美</h3><p>很多顾客喜欢在窗边拍照，画面非常柔和。</p></article>
            <article class="card"><h3>黑糖拿铁回购率高</h3><p>甜感和咖啡香平衡得很好，适合大多数人。</p></article>
            <article class="card"><h3>桂花冷萃很清爽</h3><p>夏天最受欢迎的限定之一，反馈很好。</p></article>
            <article class="card"><h3>提拉米苏杯搭配拿铁</h3><p>是社区里常被提到的经典下午茶组合。</p></article>
            <article class="card"><h3>窗边阅读打卡</h3><p>很多人喜欢来这里带一本书坐一下午。</p></article>
            <article class="card"><h3>新品试饮反馈</h3><p>社区讨论会帮助我们调整新品风味。</p></article>
          </div>
        </div>

        <div class="banner">
          <div class="section-head" style="margin-bottom:0">
            <div>
              <p class="eyebrow">Topics</p>
              <h2>热门话题</h2>
            </div>
          </div>
          <div class="grid">
            <article class="card"><h3>#窗边座位</h3><p>最常被提到的拍照和阅读位置。</p></article>
            <article class="card"><h3>#黑糖燕麦拿铁</h3><p>甜感和奶香都很稳定。</p></article>
            <article class="card"><h3>#桂花冷萃</h3><p>季节限定讨论度最高的饮品之一。</p></article>
            <article class="card"><h3>#提拉米苏杯</h3><p>咖啡与甜点搭配里的经典选择。</p></article>
          </div>
        </div>
      </section>

      <aside class="community-side">
        <div>
          <p class="eyebrow">Post</p>
          <h2>发布动态</h2>
        </div>

        <form class="community-form" id="commentForm" novalidate>
          <input id="commentName" type="text" placeholder="你的昵称" maxlength="24" required />
          <textarea id="commentText" placeholder="分享你的体验、照片灵感或建议..." maxlength="300" required></textarea>
          <button class="community-submit" type="submit">发布动态</button>
          <p class="feedback" id="commentFeedback" aria-live="polite"></p>
        </form>

        <div class="timeline">
          <div class="timeline-item"><strong>最近活跃</strong><span>今晚 7 点后会有更多安静座位。</span></div>
          <div class="timeline-item"><strong>本周热议</strong><span>黑糖燕麦拿铁、抹茶云朵、桂花冷萃。</span></div>
          <div class="timeline-item"><strong>发帖提示</strong><span>可以分享拍照点位、搭配建议或来店感受。</span></div>
          <div class="timeline-item"><strong>互动建议</strong><span>回复别人的动态，会更容易被大家看到。</span></div>
        </div>
      </aside>
    </section>
  `;
}

/** 根据 state.page 返回对应页面 HTML */
function renderPage() {
  if (state.page === "home") return renderHome();
  if (state.page === "menu") return renderMenu();
  if (state.page === "about") return renderAbout();
  if (state.page === "contact") return renderContact();
  return renderCommunity();
}

/** 打开菜单详情弹窗 */
function openMenuDetail(item) {
  modalBody.innerHTML = `
    <div class="modal-body">
      <div class="modal-img loading-skeleton" style="background-image:url('${item[2]}')"></div>
      <div>
        <p class="eyebrow">Detail</p>
        <h2 style="margin:0 0 8px">${item[0]}</h2>
        <p class="desc">${item[1]}</p>

        <div class="modal-meta">
          <span class="tag">¥${item[3]}</span>
          <span class="tag">${item[4]}</span>
          <span class="tag">${item[5]}</span>
          <span class="tag">${item[6]}</span>
        </div>

        <div class="actions" style="margin-top:16px">
          <button class="btn primary" id="buyBtn">加入点单</button>
          <button class="btn secondary" id="shareBtn">收藏灵感</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");

  document.getElementById("buyBtn").onclick = () => showToast(`已加入点单：${item[0]}`);
  document.getElementById("shareBtn").onclick = () => showToast(`已收藏灵感：${item[0]}`);
}

// ==============================
//  首页轮播逻辑
// ==============================

/** 根据 state.heroIndex 更新 slide/dot/caption 的激活状态 */
function updateHeroCarousel() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot");
  const heroCaption = document.getElementById("heroCaption");

  slides.forEach((slide, index) => slide.classList.toggle("active", index === state.heroIndex));
  dots.forEach((dot, index) => dot.classList.toggle("active", index === state.heroIndex));
  if (heroCaption) heroCaption.textContent = heroCaptions[state.heroIndex];
}

/** 重新渲染 Hero 指示点 DOM */
function renderHeroDots() {
  const heroDots = document.getElementById("heroDots");
  if (!heroDots) return;

  heroDots.innerHTML = heroImages
    .map(
      (_, index) => `
        <button class="slider-dot ${index === state.heroIndex ? "active" : ""}" data-hero-dot="${index}" aria-label="切换到第 ${index + 1} 张首页图片"></button>
      `
    )
    .join("");

  updateHeroCarousel();
}

// ==============================
//  视觉特效：粒子 & 樱花
// ==============================

/** 创建背景闪烁粒子（14 颗随机位置） */
function createSparkles() {
  const container = document.getElementById("sparkles");
  for (let i = 0; i < 14; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.animationDuration = 6 + Math.random() * 8 + "s";
    sparkle.style.animationDelay = -Math.random() * 10 + "s";
    sparkle.style.top = -10 - Math.random() * 100 + "vh";
    container.appendChild(sparkle);
  }
}

/** 周期性生成樱花飘落元素，2.4 秒间隔 */
function createSakura() {
  setInterval(() => {
    const sakura = document.createElement("span");
    sakura.className = "sakura";
    sakura.style.left = Math.random() * 100 + "vw";
    sakura.style.animationDuration = 8 + Math.random() * 8 + "s";
    sakura.style.opacity = 0.35 + Math.random() * 0.35;
    document.body.appendChild(sakura);
    setTimeout(() => sakura.remove(), 16000);
  }, 2400);
}

// ==============================
//  自动轮播定时器
// ==============================

/** 首页 Hero 自动轮播，每 4.5 秒切换 */
function autoHeroSlider() {
  setInterval(() => {
    if (state.page !== "home") return;
    if (state.heroMode !== "auto") return;
    state.heroIndex = (state.heroIndex + 1) % heroImages.length;
    renderHeroDots();
  }, 4500);
}

// ==============================
//  关于页轮播逻辑
// ==============================

/** 根据 state.aboutIndex 更新关于页 slide/dot/caption */
function updateAboutCarousel() {
  const slides = document.querySelectorAll(".about-slide");
  const dots = document.querySelectorAll(".about-dot");
  const caption = document.getElementById("aboutCaption");

  slides.forEach((slide, index) => slide.classList.toggle("active", index === state.aboutIndex));
  dots.forEach((dot, index) => dot.classList.toggle("active", index === state.aboutIndex));
  if (caption) caption.textContent = aboutCaptions[state.aboutIndex];
}

/** 重新渲染关于页轮播指示点 */
function renderAboutDots() {
  const aboutDots = document.getElementById("aboutDots");
  if (!aboutDots) return;

  aboutDots.innerHTML = aboutImages
    .map(
      (_, index) => `
        <button class="about-dot ${index === state.aboutIndex ? "active" : ""}" data-about-dot="${index}" aria-label="切换到第 ${index + 1} 张关于页面图片"></button>
      `
    )
    .join("");

  updateAboutCarousel();
}

/** 关于页自动轮播，每 4 秒切换 */
function autoAboutSlider() {
  setInterval(() => {
    if (state.page !== "about") return;
    state.aboutIndex = (state.aboutIndex + 1) % aboutImages.length;
    renderAboutDots();
  }, 4000);
}

// ==============================
//  社区互动 — 数据 + 渲染 + 事件
// ==============================

/**
 * 绑定社区页所有交互逻辑
 * - 从 localStorage 加载帖子数据
 * - 渲染帖子列表（含回复嵌套）
 * - 发布新帖、点赞、回复、置顶、编辑、删除
 */
function bindCommunityEvents() {
  if (state.page !== "community") return;

  const STORAGE_KEY = "liubai-community-v1";
  const form = document.getElementById("commentForm");
  const nameInput = document.getElementById("commentName");
  const textInput = document.getElementById("commentText");
  const feed = document.getElementById("communityFeed");
  const count = document.getElementById("communityCount");
  const replyCount = document.getElementById("communityReplyCount");
  const feedback = document.getElementById("commentFeedback");
  const submitBtn = form?.querySelector(".community-submit");

  /** 从 localStorage 读取帖子列表 */
  function loadPosts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  /** 保存帖子列表到 localStorage */
  function savePosts(posts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }

  function setFeedback(text, type = "") {
    feedback.textContent = text;
    feedback.className = `feedback${type ? ` ${type}` : ""}`;
  }

  function formatTime(isoString) {
    const date = new Date(isoString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  /** 首次访问时写入预设种子帖，方便演示 */
  function seedPosts() {
    const posts = loadPosts();
    if (posts.length > 0) return; // 已有数据则跳过

    const now = new Date().toISOString();
    const seed = [
      { id: crypto.randomUUID(), name: "留白店长", text: "今天推荐热美式配蓝莓司康，适合安静工作。", createdAt: now, likes: 12, pinned: true, replies: [{ id: crypto.randomUUID(), name: "阿澄", text: "已经加入今天的下午茶清单了！", createdAt: now }] },
      { id: crypto.randomUUID(), name: "小夏", text: "窗边座位的光线太舒服了，拍照特别出片。", createdAt: now, likes: 8, pinned: false, replies: [{ id: crypto.randomUUID(), name: "橘子汽水", text: "想看同款拍照机位！", createdAt: now }, { id: crypto.randomUUID(), name: "店员", text: "靠近吧台右侧的窗边最好看。", createdAt: now }] },
      { id: crypto.randomUUID(), name: "阿澄", text: "黑糖燕麦拿铁很顺口，甜度刚好，不会盖住咖啡香。", createdAt: now, likes: 15, pinned: false, replies: [{ id: crypto.randomUUID(), name: "小鱼", text: "这个我也想试！", createdAt: now }] },
      { id: crypto.randomUUID(), name: "橘子汽水", text: "今天的抹茶云朵颜值好高，绿色和奶泡层次太好看了。", createdAt: now, likes: 21, pinned: false, replies: [{ id: crypto.randomUUID(), name: "留白店长", text: "拍照建议从左上角俯拍。", createdAt: now }] },
      { id: crypto.randomUUID(), name: "小鱼", text: "提拉米苏杯的咖啡香很浓，配热拿铁就是完美下午茶。", createdAt: now, likes: 18, pinned: false, replies: [{ id: crypto.randomUUID(), name: "阿澄", text: "你这个搭配我记下了。", createdAt: now }] },
      { id: crypto.randomUUID(), name: "月见", text: "店里的木质空间很安静，适合带电脑来待一下午。", createdAt: now, likes: 9, pinned: false, replies: [] },
      { id: crypto.randomUUID(), name: "青柠", text: "桂花冷萃入口很清爽，夏天喝起来特别舒服。", createdAt: now, likes: 14, pinned: false, replies: [{ id: crypto.randomUUID(), name: "小夏", text: "这个季节限定感拉满。", createdAt: now }] },
      { id: crypto.randomUUID(), name: "店员", text: "今晚 7 点以后人会少一些，适合想安静聊天或拍照的朋友。", createdAt: now, likes: 11, pinned: false, replies: [{ id: crypto.randomUUID(), name: "橘子汽水", text: "收到，今晚就去！", createdAt: now }] },
    ];
    savePosts(seed);
  }

  /** 头像渐变配色库，按名字长度取色 */
  const avatarPalette = [
    "linear-gradient(135deg,#ff9cc8,#ffd27d)",
    "linear-gradient(135deg,#8de8ff,#7ce8b0)",
    "linear-gradient(135deg,#a78bfa,#ff9cc8)",
    "linear-gradient(135deg,#ffd27d,#ff9cc8)",
    "linear-gradient(135deg,#8de8ff,#4da8ff)",
  ];

  /** 根据名称关键词匹配身份标签 */
  function identityLabel(name) {
    const lower = String(name || "").toLowerCase();
    if (lower.includes("店员") || lower.includes("店长")) return "店员";
    if (lower.includes("澄") || lower.includes("鱼") || lower.includes("夏")) return "常客";
    if (lower.includes("橘") || lower.includes("青柠") || lower.includes("月见")) return "摄影党";
    return "咖啡友";
  }

  function avatarBackground(name) {
    return avatarPalette[String(name || "").length % avatarPalette.length];
  }

  /**
   * 渲染帖子列表到页面
   * - 排序：置顶优先，然后按时间倒序
   * - 包含回复嵌套渲染
   * - loading-skeleton 用于首帧闪烁提示
   */
  function renderFeed() {
    const posts = loadPosts()
      .slice()
      .sort((a, b) => Number(b.pinned === true) - Number(a.pinned === true) || new Date(b.createdAt) - new Date(a.createdAt));
    const totalReplies = posts.reduce((sum, post) => sum + (post.replies?.length || 0), 0);

    count.textContent = posts.length;
    replyCount.textContent = totalReplies;

    feed.innerHTML = posts.length
      ? posts
          .map((post, index) => {
            const replies = (post.replies || [])
              .map(
                (reply) => `
                  <div class="card" style="margin-top:10px;padding:12px;background:rgba(255,255,255,.04)">
                    <div class="post-user" style="margin-bottom:8px">
                      <div class="avatar" style="width:32px;height:32px;font-size:.8rem;background:${avatarBackground(reply.name)}">${escapeHtml(reply.name).slice(0, 1).toUpperCase()}</div>
                      <div>
                        <div class="post-name" style="font-size:.92rem">${escapeHtml(reply.name)} <span class="post-pill" style="margin-left:6px;padding:2px 8px;font-size:.72rem">${identityLabel(reply.name)}</span></div>
                        <div class="post-time">${formatTime(reply.createdAt)}</div>
                      </div>
                    </div>
                    <p class="post-content" style="font-size:.95rem">${escapeHtml(reply.text)}</p>
                  </div>
                `
              )
              .join("");

            return `
              <article class="community-post loading-skeleton" data-post-id="${post.id}">
                <div class="post-top">
                  <div class="post-user">
                    <div class="avatar" style="background:${avatarBackground(post.name)}">${escapeHtml(post.name).slice(0, 1).toUpperCase()}</div>
                    <div>
                      <div class="post-name">${escapeHtml(post.name)} <span class="post-pill" style="margin-left:6px;padding:2px 8px;font-size:.72rem">${identityLabel(post.name)}</span></div>
                      <div class="post-time">${formatTime(post.createdAt)}</div>
                    </div>
                  </div>
                  <span class="post-pill">${post.pinned ? "置顶" : "#" + (posts.length - index)}</span>
                </div>

                <p class="post-content">${escapeHtml(post.text)}</p>

                <div class="post-actions">
                  <span class="post-pill">❤ ${post.likes || 0}</span>
                  <span class="post-pill">💬 ${(post.replies || []).length}</span>
                  <span class="post-pill">留白 coffee</span>
                  <button class="post-action-btn" data-like-post="${post.id}">点赞</button>
                  <button class="post-action-btn" data-reply-post="${post.id}">回复</button>
                  <button class="post-action-btn" data-pin-post="${post.id}">${post.pinned ? "取消置顶" : "置顶"}</button>
                  <button class="post-action-btn" data-edit-post="${post.id}">编辑</button>
                  <button class="post-action-btn" data-delete-post="${post.id}">删除</button>
                </div>

                <div class="post-replies">${replies}</div>
              </article>
            `;
          })
          .join("")
      : '<article class="community-post"><p class="post-content">还没有动态，发布第一条社区内容吧。</p></article>';

    requestAnimationFrame(() =>
      feed.querySelectorAll(".loading-skeleton").forEach((el) => el.classList.remove("loading-skeleton"))
    );
  }

  seedPosts();
  renderFeed();

  // ---- 发布帖子 ----
  form.onsubmit = (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (!name || !text) {
      setFeedback("请输入昵称和动态内容。", "error");
      return;
    }

    setBusy(submitBtn, true, "发布中…");
    setFeedback("正在发布…");

    setTimeout(() => {
      const posts = loadPosts();
      posts.push({ id: crypto.randomUUID(), name, text, createdAt: new Date().toISOString(), likes: 0, pinned: false, replies: [] });
      savePosts(posts);
      nameInput.value = "";
      textInput.value = "";
      setFeedback("发布成功。", "success");
      setBusy(submitBtn, false);
      renderFeed();
      setTimeout(() => setFeedback(""), 1800);
    }, 420);
  };

  // ---- 帖子操作：点赞/回复/置顶/编辑/删除（事件委托） ----
  feed.onclick = (event) => {
    const posts = loadPosts();
    const likeBtn = event.target.closest("[data-like-post]");
    const replyBtn = event.target.closest("[data-reply-post]");
    const pinBtn = event.target.closest("[data-pin-post]");
    const editBtn = event.target.closest("[data-edit-post]");
    const deleteBtn = event.target.closest("[data-delete-post]");

    const find = (id) => posts.find((p) => p.id === id);

    if (likeBtn) {
      const post = find(likeBtn.dataset.likePost);
      if (!post) return;
      post.likes = (post.likes || 0) + 1;
      savePosts(posts);
      renderFeed();
      showToast("已点赞");
      return;
    }

    if (replyBtn) {
      const post = find(replyBtn.dataset.replyPost);
      if (!post) return;
      const input = prompt("输入回复内容");
      if (input === null) return;
      const txt = input.trim();
      if (!txt) { setFeedback("回复不能为空。", "error"); return; }
      post.replies = post.replies || [];
      post.replies.push({ id: crypto.randomUUID(), name: "匿名回复", text: txt, createdAt: new Date().toISOString() });
      savePosts(posts);
      renderFeed();
      showToast("回复已发布");
      return;
    }

    if (pinBtn) {
      const post = find(pinBtn.dataset.pinPost);
      if (!post) return;
      post.pinned = !post.pinned;
      savePosts(posts);
      renderFeed();
      showToast(post.pinned ? "已置顶" : "已取消置顶");
      return;
    }

    if (editBtn) {
      const post = find(editBtn.dataset.editPost);
      if (!post) return;
      const input = prompt("编辑动态内容", post.text);
      if (input === null) return;
      const txt = input.trim();
      if (!txt) { setFeedback("内容不能为空。", "error"); return; }
      post.text = txt;
      savePosts(posts);
      renderFeed();
      showToast("动态已更新");
      return;
    }

    if (deleteBtn) {
      const post = find(deleteBtn.dataset.deletePost);
      if (!post) return;
      if (!confirm("确定删除这条动态吗？")) return;
      savePosts(posts.filter((p) => p.id !== post.id));
      renderFeed();
      showToast("动态已删除");
    }
  };
}

// ==============================
//  页面内交互绑定（data-* 事件委托）
// ==============================

/**
 * 根据当前渲染的页面 DOM，绑定各类交互事件
 * - data-go：页面跳转
 * - data-hero-mode / data-hero-dot：首页轮播
 * - data-about-dot：关于页轮播
 * - data-tab：菜单分类切换
 * - data-fav：收藏/取消收藏
 * - menu-card：菜单详情弹窗
 * - data-copy-address / data-call / data-open-map：联系页
 */
function bindPageEvents() {
  // ---- 页面跳转按钮 ----
  app.querySelectorAll("[data-go]").forEach((btn) => {
    btn.onclick = () => {
      state.page = btn.dataset.go;
      render();
    };
  });

  // ---- 首页轮播模式切换 ----
  app.querySelectorAll("[data-hero-mode]").forEach((btn) => {
    btn.onclick = () => {
      app.querySelectorAll("[data-hero-mode]").forEach((el) => el.classList.remove("active"));
      btn.classList.add("active");
      state.heroMode = btn.dataset.heroMode;
      showToast(`已切换为 ${btn.textContent} 模式`);
    };
  });

  // ---- 首页轮播指示点 ----
  app.querySelectorAll("[data-hero-dot]").forEach((btn) => {
    btn.onclick = () => {
      state.heroIndex = Number(btn.dataset.heroDot);
      renderHeroDots();
      showToast("已切换首页图片");
    };
  });

  // ---- 关于页轮播指示点 ----
  app.querySelectorAll("[data-about-dot]").forEach((btn) => {
    btn.onclick = () => {
      state.aboutIndex = Number(btn.dataset.aboutDot);
      renderAboutDots();
    };
  });

  // ---- 菜单搜索 ----
  const menuSearch = document.getElementById("menuSearch");
  if (menuSearch) {
    menuSearch.oninput = () => {
      state.search = menuSearch.value;
      render();
    };
  }

  // ---- 菜单分类标签 ----
  app.querySelectorAll("[data-tab]").forEach((btn) => {
    btn.onclick = () => {
      app.querySelectorAll("[data-tab]").forEach((el) => el.classList.remove("active"));
      btn.classList.add("active");
      state.menuTab = btn.dataset.tab;
      render();
    };
  });

  // ---- 收藏按钮 ----
  app.querySelectorAll("[data-fav]").forEach((btn) => {
    btn.onclick = (event) => {
      event.stopPropagation();
      const name = btn.dataset.fav;
      if (state.favorites.has(name)) {
        state.favorites.delete(name);
        showToast(`已取消收藏：${name}`);
      } else {
        state.favorites.add(name);
        showToast(`已收藏：${name}`);
      }
      localStorage.setItem("liubai-favorites", JSON.stringify([...state.favorites]));
      render();
    };
  });

  // ---- 菜单卡片弹窗 ----
  app.querySelectorAll(".menu-card").forEach((card) => {
    card.onclick = () => {
      const item = Object.values(menuData).flat().find((value) => value[0] === card.dataset.item);
      if (item) openMenuDetail(item);
    };
  });

  // ---- 联系页：复制地址 ----
  const copyBtn = app.querySelector("[data-copy-address]");
  if (copyBtn) {
    copyBtn.onclick = () =>
      navigator.clipboard.writeText("青禾路 88 号，留白 coffee").then(() => showToast("地址已复制")).catch(() => showToast("复制失败，请手动复制"));
  }

  // ---- 联系页：一键拨号 ----
  const callBtn = app.querySelector("[data-call]");
  if (callBtn) callBtn.onclick = () => { window.location.href = "tel:010-5688-1024"; };

  // ---- 联系页：打开地图导航 ----
  const mapBtn = app.querySelector("[data-open-map]");
  if (mapBtn) {
    mapBtn.onclick = () => window.open("https://www.google.com/maps/search/%E9%9D%92%E7%A6%BE%E8%B7%AF+88+%E5%8F%B7", "_blank", "noopener,noreferrer");
  }

  bindCommunityEvents();
}

// ==============================
//  氛围音乐（Web Audio API）
//  — 仅社区页面播放，咖啡馆白噪音风格
// ==============================

const ambientMusic = (() => {
  let ctx = null;
  let nodes = [];
  let gainNode = null;
  let _playing = false;

  /** 启动音频上下文（需在用户手势中触发） */
  function ensureContext() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.state === "suspended") ctx.resume();
  }

  /** 创建一个柔和的持续音色（类 Pad 合成器） */
  function createPad(freq, type, panVal, output) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const pan = ctx.createStereoPanner();

    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = 0;
    lfo.frequency.value = 0.03 + Math.random() * 0.05;
    lfoGain.gain.value = 0.012;
    pan.pan.value = panVal;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(pan);
    pan.connect(output);

    osc.start();
    lfo.start();

    gain.gain.linearRampToValueAtTime(0.06 + Math.random() * 0.04, ctx.currentTime + 1.5);

    return { osc, gain, lfo, pan };
  }

  return {
    get playing() { return _playing; },

    start() {
      ensureContext();
      if (_playing) return;
      _playing = true;

      gainNode = ctx.createGain();
      gainNode.gain.value = 0.28;
      gainNode.connect(ctx.destination);

      const pads = [
        [130.81, "sine", -0.7],    // C3
        [164.81, "sine", 0.2],     // E3
        [196.00, "sine", -0.1],    // G3
        [261.63, "triangle", -0.6],// C4
        [329.63, "triangle", 0.5], // E4
        [87.31, "sine", 0],       // F2
        [110.00, "sine", 0.3],     // A2
        [220.00, "triangle", -0.3],// A3
      ];

      nodes = pads.map(([freq, type, pan]) => createPad(freq, type, pan, gainNode));
    },

    stop() {
      if (!_playing) return;
      _playing = false;
      nodes.forEach((n) => {
        try { n.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1); } catch (_) {}
        setTimeout(() => { try { n.osc.stop(); n.lfo.stop(); } catch (_) {} }, 1200);
      });
      nodes = [];
    },
  };
})();

// ==============================
//  全局初始事件（页面无关）
// ==============================

/** 绑定顶栏导航、主题切换、弹窗关闭、汉堡菜单、页脚导航 */
function setInitialEvents() {
  const burgerBtn = document.getElementById("burgerBtn");

  // ---- 顶栏导航 ----
  nav.onclick = (event) => {
    const link = event.target.closest("a[data-page]");
    if (!link) return;
    event.preventDefault();
    state.page = link.dataset.page;
    history.replaceState(null, "", link.getAttribute("href"));
    nav.classList.remove("open");
    burgerBtn.textContent = "☰";
    render();
  };

  // ---- 汉堡菜单（手机端） ----
  burgerBtn.onclick = () => {
    const isOpen = nav.classList.toggle("open");
    burgerBtn.textContent = isOpen ? "✕" : "☰";
  };

  // ---- 主题切换 ----
  themeToggle.onclick = () => {
    state.theme = state.theme === "night" ? "day" : "night";
    document.body.dataset.theme = state.theme;
    localStorage.setItem("liubai-theme", state.theme);
    themeToggle.textContent = state.theme === "night" ? "☀" : "☾";
    showToast(state.theme === "night" ? "已切换夜间模式" : "已切换日间模式");
  };

  musicBtn.onclick = () => {
    if (!ambientMusic.playing) {
      ambientMusic.start();
      musicBtn.textContent = "♫";
      musicBtn.style.color = "var(--accent)";
      showToast("氛围音乐已开启");
    } else {
      ambientMusic.stop();
      musicBtn.textContent = "♪";
      musicBtn.style.color = "";
      showToast("氛围音乐已暂停");
    }
  };

  // ---- 弹窗关闭 ----
  modalClose.onclick = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  };

  modal.onclick = (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });

  // ---- 页脚导航 ----
  document.querySelector(".site-footer").onclick = (event) => {
    const link = event.target.closest("a[data-page]");
    if (!link) return;
    event.preventDefault();
    state.page = link.dataset.page;
    history.replaceState(null, "", link.getAttribute("href"));
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

// ==============================
//  核心渲染入口
// ==============================

/** 重新渲染整页内容，绑定事件，初始化轮播 */
function render() {
  setActiveNav();
  app.innerHTML = renderPage();
  bindPageEvents();
  if (state.page === "home") renderHeroDots();
  if (state.page === "about") renderAboutDots();
}

// ==============================
//  应用启动
// ==============================
createSparkles();
createSakura();
setInitialEvents();
render();
autoHeroSlider();
autoAboutSlider();

// ==============================
//  回到顶部按钮
// ==============================

const backToTop = document.getElementById("backToTop");

/** 当滚动超过一屏时显示按钮，否则隐藏 */
function toggleBackToTop() {
  backToTop.classList.toggle("show", window.scrollY > window.innerHeight * 0.6);
}

backToTop.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.addEventListener("scroll", toggleBackToTop, { passive: true });
toggleBackToTop();