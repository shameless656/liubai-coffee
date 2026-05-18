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
  "./img/about-slide-1.webp",
  "./img/about-slide-2.webp",
  "./img/about-slide-3.webp",
  "./img/about-slide-4.webp",
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
    ["冰美式", "浓缩与冰水混合，清爽解暑，适合夏日午后。", "./img/menu-6.webp", 22, "清爽", "冰饮", "经典"],
    ["燕麦拿铁", "燕麦奶替代牛奶，口感更轻盈，谷物香气明显。", "./img/menu-7.webp", 30, "谷物", "轻盈", "推荐"],
    ["蜂蜜拿铁", "天然蜂蜜与浓缩融合，甜而不腻，适合秋冬。", "./img/menu-8.webp", 32, "蜂蜜", "温润", "人气"],
  ],
  special: [
    ["黑糖燕麦拿铁", "黑糖甜香搭配燕麦奶，温润不腻。", "./img/special-1.jpg", 34, "黑糖", "燕麦奶", "限定"],
    ["海盐雾盖可可", "咸甜交织，适合午後小憩。", "./img/special-2.jpg", 31, "可可", "雾盖", "限定"],
    ["抹茶云朵", "茶香清雅，口感轻盈顺滑。", "./img/special-3.jpg", 33, "抹茶", "轻盈", "热门"],
    ["桂花冷萃", "冷萃基底加入桂花蜜，清甜回甘。", "./img/special-4.jpg", 35, "花香", "冷萃", "季节"],
    ["焦糖海盐冰拿铁", "微咸焦糖平衡甜感，层次更丰富。", "./img/special-5.jpg", 34, "冰饮", "层次", "推荐"],
    ["蜜桃乌龙", "乌龙茶底搭配蜜桃果肉，清新鲜爽。", "./img/special-6.webp", 32, "果香", "茶底", "季节"],
    ["薄荷冰咖", "薄荷清凉感与浓缩融合，醒神解暑。", "./img/special-7.webp", 30, "薄荷", "冰饮", "限定"],
    ["摩卡星冰", "巧克力与咖啡层层叠加，顶部奶油轻盈。", "./img/special-8.webp", 36, "巧克力", "奶盖", "热门"],
  ],
  bakery: [
    ["蓝莓司康", "外层微脆，内部松软，果香明显。", "./img/bakery-1.jpg", 18, "果香", "酥脆", "甜点"],
    ["黄油可颂", "层层起酥，黄油香浓。", "./img/bakery-2.jpg", 16, "酥皮", "经典", "热卖"],
    ["香蕉磅蛋糕", "湿润绵密，适合搭配热咖啡。", "./img/bakery-3.jpg", 19, "绵密", "下午茶", "推荐"],
    ["抹茶红豆卷", "茶香与豆香融合，口感柔软。", "./img/bakery-4.jpg", 22, "抹茶", "豆香", "人气"],
    ["提拉米苏杯", "咖啡酒香浓郁，细腻顺滑。", "./img/bakery-5.jpg", 26, "咖啡香", "细腻", "经典"],
    ["杏仁可颂", "杏仁片洒满可颂表面，烤制后酥香加倍。", "./img/bakery-6.webp", 18, "坚果", "酥脆", "热卖"],
    ["曲奇饼干", "黄油曲奇搭配巧克力碎，酥松可口。", "./img/bakery-7.webp", 12, "酥松", "经典", "甜点"],
    ["轻芝士蛋糕", "日式轻芝士工艺，入口即化，奶香柔和。", "./img/bakery-8.webp", 24, "芝士", "绵密", "人气"],
  ],
};

/** 图片路径映射，按页面/分类组织 */
const imageMap = {
  about: [
    "./img/about-slide-1.webp",
    "./img/about-slide-2.webp",
    "./img/about-slide-3.webp",
    "./img/about-slide-4.webp",
  ],
  menu: {
    coffee: [
      "./img/hero-2.jpg",
      "./img/menu-2.jpg",
      "./img/menu-3.jpg",
      "./img/menu-4.jpg",
      "./img/menu-5.jpg",
      "./img/menu-6.webp",
      "./img/menu-7.webp",
      "./img/menu-8.webp",
    ],
    special: [
      "./img/special-1.jpg",
      "./img/special-2.jpg",
      "./img/special-3.jpg",
      "./img/special-4.jpg",
      "./img/special-5.jpg",
      "./img/special-6.webp",
      "./img/special-7.webp",
      "./img/special-8.webp",
    ],
    bakery: [
      "./img/bakery-1.jpg",
      "./img/bakery-2.jpg",
      "./img/bakery-3.jpg",
      "./img/bakery-4.jpg",
      "./img/bakery-5.jpg",
      "./img/bakery-6.webp",
      "./img/bakery-7.webp",
      "./img/bakery-8.webp",
    ],
  },
};

// ==============================
//  全局图片预加载 — 页面打开后立即下载所有图片到浏览器缓存
//  使用 new Image() 发起请求，无需等 DOM 渲染
// ==============================
(() => {
  /** 收集所有已知图片路径 */
  const urls = new Set([
    ...heroImages,
    ...aboutImages,
    ...Object.values(menuData).flat().map((item) => item[2]),
  ]);

  urls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
})();

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

/* 点单数据 — { 名称: {price, qty} }，从 localStorage 恢复 */
try {
  var savedOrder = JSON.parse(localStorage.getItem("liubai-order") || "{}");
} catch (e) { savedOrder = {}; }
state.order = savedOrder;

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
// ==============================
//  页面加载 — 从 pages/ 目录异步 fetch HTML
// ==============================

const pageCache = {};

async function fetchPage(name) {
  if (pageCache[name]) return pageCache[name];
  const res = await fetch('./pages/' + name + '.html');
  if (!res.ok) throw new Error('Failed to load ' + name);
  const html = await res.text();
  pageCache[name] = html;
  return html;
}

async function renderPage() {
  var map = { home: 'home', menu: 'menu', about: 'about', contact: 'contact', community: 'community' };
  var name = map[state.page] || 'community';
  try {
    return await fetchPage(name);
  } catch (e) {
    return '<section class="panel"><div class="section-head"><h2>页面加载失败</h2></div><p class="muted-p">请检查网络连接后刷新重试。</p></section>';
  }
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
    if (currentPage !== "home") return;
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
    if (currentPage !== "about") return;
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
  if (currentPage !== "community") return;

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
 * 绑定页面内交互事件入口
 * 涵盖：轮播控制、菜单搜索/收藏/点单/详情弹窗、联系页操作
 * 所有 data-* 事件委托均在主内容区 scope 内
 */

/** 持久化 order 到 localStorage */
function persistOrder() {
  localStorage.setItem("liubai-order", JSON.stringify(state.order));
}

/**
 * 重绘浮动点单栏 — 根据 state.order 渲染条目/数量/合计
 * 若无内容则移除 has-items 类使其折叠为小圆点
 */
function renderOrderBar() {
  var bar = document.getElementById("orderBar");
  var list = document.getElementById("orderList");
  var count = document.getElementById("orderCount");
  var total = document.getElementById("orderTotal");
  var empty = document.getElementById("orderEmpty");
  if (!bar || !list) return;

  var entries = Object.entries(state.order);
  var itemCount = 0;
  var totalPrice = 0;

  if (entries.length === 0) {
    bar.classList.remove("has-items");
    count.textContent = "0";
    total.textContent = "\u00A50";
    return;
  }

  bar.classList.add("has-items");
  list.innerHTML = entries.map(function (_a) {
    var name = _a[0];
    var o = _a[1];
    totalPrice += o.price * o.qty;
    itemCount += o.qty;
    return '<div class="order-item">'
      + '<span class="order-qty">'
      + '<button class="order-qty-btn" data-order-dec="' + name + '">\u2212</button>'
      + '<span class="order-qty-num">' + o.qty + '</span>'
      + '<button class="order-qty-btn" data-order-inc="' + name + '">+</button>'
      + '</span>'
      + '<span class="order-item-name">' + name + '</span>'
      + '<span class="order-item-price">\u00A5' + (o.price * o.qty) + '</span>'
      + '</div>';
  }).join("");

  count.textContent = itemCount;
  total.textContent = "\u00A5" + totalPrice;
}

/**
 * 添加产品或增加已有产品数量
 * @param {string} name - 产品名称
 * @param {number} price - 单价
 */
function addToOrder(name, price) {
  if (state.order[name]) {
    state.order[name].qty += 1;
  } else {
    state.order[name] = { price: price, qty: 1 };
  }
  persistOrder();
  renderOrderBar();
}

/** 初始化点单栏（从 localStorage 恢复并渲染） */
function initOrderUI() {
  renderOrderBar();
  /* 绑定点单栏内部按钮（事件委托） */
  var bar = document.getElementById("orderBar");
  if (!bar) return;
  bar.onclick = function (event) {
    var dec = event.target.closest("[data-order-dec]");
    var inc = event.target.closest("[data-order-inc]");
    if (dec) {
      event.stopPropagation();
      var name = dec.dataset.orderDec;
      if (state.order[name]) {
        state.order[name].qty -= 1;
        if (state.order[name].qty <= 0) delete state.order[name];
        persistOrder();
        renderOrderBar();
        showToast("\u5DF2\u51CF\u5C11\uFF1A" + name);
      }
      return;
    }
    if (inc) {
      event.stopPropagation();
      var name2 = inc.dataset.orderInc;
      addToOrder(name2, state.order[name2].price);
      showToast("\u5DF2\u589E\u52A0\uFF1A" + name2);
      return;
    }
  };

  /* 清空与结算按钮 */
  var clearBtn = document.getElementById("btnClearOrder");
  var checkoutBtn = document.getElementById("btnCheckout");
  if (clearBtn) {
    clearBtn.onclick = function () {
      if (Object.keys(state.order).length === 0) return;
      if (!confirm("确定清空点单列表吗？")) return;
      state.order = {};
      persistOrder();
      renderOrderBar();
      showToast("点单已清空");
    };
  }
  if (checkoutBtn) {
    checkoutBtn.onclick = function () {
      var entries = Object.entries(state.order);
      if (entries.length === 0) { showToast("请先添加商品到点单"); return; }
      var total = 0;
      var summary = entries.map(function (_a) { var n = _a[0], o = _a[1]; total += o.price * o.qty; return o.qty + "x " + n + " (" + o.price + ")"; }).join(", ");
      if (confirm("确认下单以下商品？\n" + summary + "\n\u5408\u8BA1\uFF1A\u00A5" + total + "\n\u7545\u996E\u60A8\u7684\u7F8E\u5473\u65F6\u5149\uFF01")) {
        state.order = {};
        persistOrder();
        renderOrderBar();
        showToast("\u4E0B\u5355\u6210\u529F\uFF01\u671F\u5F85\u4E3A\u60A8\u51C6\u5907\u3002");
      }
    };
  }
}

/** 根据 localStorage 中的收藏列表更新所有 fav-btn 的状态 */
function initFavoriteUI() {
  document.querySelectorAll("[data-fav]").forEach(function (btn) {
    var name = btn.dataset.fav;
    if (state.favorites.has(name)) {
      btn.textContent = "❤";
      btn.classList.add("active");
    } else {
      btn.textContent = "♡";
      btn.classList.remove("active");
    }
  });
}

function bindPageEvents() {
  // ---- 首页轮播模式切换 ----
  app.querySelectorAll("[data-hero-mode]").forEach((btn) => {
    btn.onclick = () => {
      app.querySelectorAll("[data-hero-mode]").forEach((el) => el.classList.remove("active"));
      btn.classList.add("active");
      state.heroMode = btn.dataset.heroMode;
      showToast("已切换为 " + btn.textContent + " 模式");
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

  // ---- 菜单搜索（DOM 驱动）----
  var menuSearch = document.getElementById("menuSearch");
  if (menuSearch) {
    menuSearch.oninput = function () {
      var kw = menuSearch.value.trim().toLowerCase();
      document.querySelectorAll(".menu-card").forEach(function (card) {
        var text = (card.textContent || "").toLowerCase();
        card.style.display = !kw || text.indexOf(kw) !== -1 ? "" : "none";
      });
    };
  }

  // ---- 点单按钮（+）----
  app.querySelectorAll("[data-order]").forEach(function (btn) {
    btn.onclick = function (event) {
      event.stopPropagation();
      var name = btn.dataset.order;
      var price = Number(btn.dataset.price);
      addToOrder(name, price);
      showToast("已加入点单：" + name);
    };
  });

  // ---- 收藏按钮 ----
  app.querySelectorAll("[data-fav]").forEach(function (btn) {
    btn.onclick = function (event) {
      event.stopPropagation();
      var name = btn.dataset.fav;
      if (state.favorites.has(name)) {
        state.favorites.delete(name);
        btn.textContent = "\u2661";
        btn.classList.remove("active");
        showToast("已取消收藏：" + name);
      } else {
        state.favorites.add(name);
        btn.textContent = "\u2764";
        btn.classList.add("active");
        showToast("已收藏：" + name);
      }
      localStorage.setItem("liubai-favorites", JSON.stringify(Array.from(state.favorites)));
    };
  });

  // ---- 菜单卡片弹窗 ----
  app.querySelectorAll(".menu-card").forEach(function (card) {
    card.onclick = function () {
      var name = card.dataset.item;
      var tab = state.menuTab;
      var items = menuData[tab];
      var item = items.find(function (i) { return i[0] === name; });
      if (item) { openMenuDetail(item); }
    };
  });

  // ---- 联系页：复制地址 ----
  var copyBtn = document.querySelector("[data-copy-address]");
  if (copyBtn) {
    copyBtn.onclick = function () {
      var addr = document.getElementById("storeAddress");
      var text = addr ? addr.textContent : "青禾路 88 号，留白 coffee";
      navigator.clipboard.writeText(text).then(function () {
        showToast("地址已复制");
      }).catch(function () {
        showToast("复制失败，请手动复制");
      });
    };
  }

  // ---- 联系页：一键拨号 ----
  var callBtn = document.querySelector("[data-call]");
  if (callBtn) {
    callBtn.onclick = function () {
      var phone = document.getElementById("storePhone");
      window.location.href = "tel:" + (phone ? phone.textContent : "010-5688-1024");
    };
  }

  // ---- 联系页：打开导航 ----
  var mapBtn = document.querySelector("[data-open-map]");
  if (mapBtn) {
    mapBtn.onclick = function () {
      window.open("https://uri.amap.com/marker?position=116.397428,39.90923&name=留白coffee", "_blank");
    };
  }

  // ---- 初始化收藏状态（读取 localStorage 更新 ♡/❤）----
  initFavoriteUI();
}
// ==============================
//  背景音乐 — 控制 <audio> 元素播放/暂停
// ==============================

const ambientMusic = (function () {
  var audio = document.getElementById("bgMusic");
  return {
    get playing() { return audio && !audio.paused; },
    start: function () {
      if (!audio || !audio.paused) return;
      audio.play().catch(function () { showToast("点击任意位置后再试"); });
    },
    stop: function () {
      if (audio) audio.pause();
    },
  };
})();

// ==============================
//  全局初始事件（页面无关）
// ==============================

function setInitialEvents() {
  var burgerBtn = document.getElementById("burgerBtn");
  burgerBtn.onclick = function () {
    var isOpen = nav.classList.toggle("open");
    burgerBtn.textContent = isOpen ? "✕" : "☰";
  };
  themeToggle.onclick = function () {
    state.theme = state.theme === "night" ? "day" : "night";
    document.body.dataset.theme = state.theme;
    localStorage.setItem("liubai-theme", state.theme);
    themeToggle.textContent = state.theme === "night" ? "☀" : "☾";
    showToast(state.theme === "night" ? "已切换夜间模式" : "已切换日间模式");
  };
  musicBtn.onclick = function () {
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
  modalClose.onclick = function () { modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); };
  modal.onclick = function (event) { if (event.target === modal) { modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); } };
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") { modal.classList.remove("show"); modal.setAttribute("aria-hidden", "true"); } });
}

// ==============================
//  多页面检测与初始化
// ==============================

function detectPage() {
  var path = window.location.pathname;
  if (path.indexOf("menu.html") !== -1) return "menu";
  if (path.indexOf("about.html") !== -1) return "about";
  if (path.indexOf("contact.html") !== -1) return "contact";
  if (path.indexOf("community.html") !== -1) return "community";
  return "home";
}

var currentPage = detectPage();

function initPage() {
  bindPageEvents();
  if (currentPage === "home") renderHeroDots();
  if (currentPage === "about") renderAboutDots();
  if (currentPage === "menu") initOrderUI();
  if (currentPage === "community") bindCommunityEvents();
}

// ==============================
//  应用启动
// ==============================
createSparkles();
createSakura();
setInitialEvents();
initPage();
autoHeroSlider();
autoAboutSlider();

// ==============================
//  回到顶部按钮
// ==============================

var backToTop = document.getElementById("backToTop");

function toggleBackToTop() {
  backToTop.classList.toggle("show", window.scrollY > window.innerHeight * 0.6);
}

backToTop.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.addEventListener("scroll", toggleBackToTop, { passive: true });
toggleBackToTop();
