/* ============================================
   博客系统 — 状态与配置
   ============================================ */
const POSTS_PER_PAGE = 4;
let currentPage = 1;
let filteredPosts = null;     // null = 显示全部；数组 = 搜索 / 分类过滤结果
let activeCategory = null;    // null = 不限分类
let currentNavTab = 'home';

/* ============================================
   文章数据（15 篇，覆盖多主题）
   ============================================ */
const posts = [
    {
        id: 0,
        title: '从零实现一个 Markdown 编辑器',
        category: '项目记录',
        tags: ['Markdown', 'JavaScript', 'LocalStorage'],
        date: '2026-05-18',
        excerpt: '记录编辑区、实时预览、版本历史和导出功能的实现过程，以及项目中踩到的小问题。',
        emoji: 'MD',
        readTime: '4 分钟',
        content: `
            <p>这个项目的目标很简单：做一个打开就能用的 Markdown 编辑器。左侧输入内容，右侧实时预览，写完后可以导出 Markdown、HTML 或通过浏览器保存为 PDF。</p>
            <h2>编辑和预览</h2>
            <p>编辑区监听 <code>input</code> 事件，把文本交给 Marked.js 解析，再同步更新预览区和 HTML 源码区。采用防抖优化减少高频解析开销，保持 60fps 的流畅体验。</p>
            <h2>版本历史</h2>
            <p>版本历史没有接后端，而是使用 LocalStorage 保存最近 20 个版本。每次内容变更会计算 diff，只存储增量变化，避免空间浪费。这个方案适合静态页面演示，也能体现本地持久化的基本思路。</p>
            <h2>后续改进</h2>
            <ul>
                <li>支持导入本地 .md 文件</li>
                <li>增加搜索和替换</li>
                <li>给导出的 HTML 增加自定义样式</li>
            </ul>
        `
    },
    {
        id: 1,
        title: '数据看板里的图表组织方式',
        category: '前端',
        tags: ['Chart.js', '数据可视化', '看板'],
        date: '2026-05-10',
        excerpt: '用指标卡、趋势图和订单表格搭建一个后台首页，并记录 Chart.js 的基本使用方式。',
        emoji: 'DB',
        readTime: '3 分钟',
        content: `
            <p>数据看板项目主要展示后台页面的信息组织。页面包含指标卡、销售趋势、用户分布、订单状态和最近订单表格，将复杂数据分层呈现，遵循"先总览后明细"的信息架构原则。</p>
            <h2>页面结构</h2>
            <p>顶部用于放页面标题和操作按钮，中间用卡片承载核心指标，下方再放图表和表格。这样信息从总览到明细逐步展开，比较符合后台系统的阅读习惯。</p>
            <h2>图表更新</h2>
            <p>销售趋势图支持切换时间范围，切换时重新生成日期标签和数据后调用 <code>chart.update()</code>，可以模拟真实项目中的筛选刷新流程。同时使用 <code>requestAnimationFrame</code> 优化动画性能。</p>
        `
    },
    {
        id: 2,
        title: '博客系统的搜索和标签实现',
        category: 'JavaScript',
        tags: ['JavaScript', 'DOM操作', '搜索'],
        date: '2026-05-02',
        excerpt: '整理文章数组、分类目录、标签云和搜索过滤的实现方式。',
        emoji: 'JS',
        readTime: '3 分钟',
        content: `
            <p>博客系统的数据先放在前端数组中，适合展示列表渲染、弹窗详情、分类和搜索这些基础交互。这种纯前端方案无需后端服务器，适合个人技术博客的快速搭建和部署。</p>
            <h2>搜索逻辑</h2>
            <p>搜索框输入关键词后，根据文章标题和分类进行过滤，再重新渲染文章列表。为了提高搜索体验，同时引入了防抖机制，避免每次按键都触发渲染。标签点击也会复用同一个过滤函数。</p>
            <h2>弹窗详情</h2>
            <p>文章详情通过弹窗展示，打开时禁止页面滚动，关闭后恢复。这类交互在后台系统和内容类网站中都比较常见，也涉及到了事件委托和键盘事件的处理。</p>
        `
    },
    {
        id: 3,
        title: '一次响应式布局调整记录',
        category: 'CSS',
        tags: ['CSS', '响应式布局', 'Grid', 'Flexbox'],
        date: '2026-04-26',
        excerpt: '记录 Grid、Flexbox 和移动端断点在项目里的具体使用场景。',
        emoji: 'CW',
        readTime: '2 分钟',
        content: `
            <p>几个静态项目都需要同时适配桌面端和移动端，因此布局上主要使用 Grid 和 Flexbox。响应式设计不是简单的"缩小再缩小"，而是要根据不同设备的使用场景重新组织信息。</p>
            <h2>桌面端</h2>
            <p>桌面端优先保证信息密度，例如博客采用内容区和侧边栏两列布局，数据看板采用指标卡和图表网格。使用 <code>grid-template-columns: repeat(auto-fill, minmax(...))</code> 实现自适应列数。</p>
            <h2>移动端</h2>
            <p>移动端把多列布局收敛为单列，同时减少按钮和卡片之间的间距，避免内容被挤压。导航栏在 768px 断点下折叠为汉堡菜单，搜索框宽度自适应缩放到适合触屏操作的大小。</p>
        `
    },
    {
        id: 4,
        title: 'GitHub Pages 部署静态项目',
        category: '工具',
        tags: ['GitHub Pages', '部署', 'Git', 'CI/CD'],
        date: '2026-04-18',
        excerpt: '整理静态项目从仓库到在线预览的发布流程，包含 GitHub Actions 自动部署。',
        emoji: 'Git',
        readTime: '3 分钟',
        content: `
            <p>这些项目都可以通过 GitHub Pages 发布。对纯 HTML、CSS、JavaScript 项目来说，不需要额外服务器，适合作为在线作品展示。配合 GitHub Actions 可以实现推送即部署的自动化工作流。</p>
            <h2>基本流程</h2>
            <ul>
                <li>把项目推送到 GitHub 仓库</li>
                <li>在仓库 Settings 中开启 Pages，选择部署分支</li>
                <li>可选：配置 GitHub Actions 实现自动构建部署</li>
            </ul>
            <h2>注意事项</h2>
            <p>如果页面引用了相对路径资源，部署后要检查路径是否正确，尤其是图片、脚本和样式文件。对于 SPA 应用，还需要处理 404 回退到 index.html 的路由问题。</p>
        `
    },
    {
        id: 5,
        title: 'JavaScript 数组方法在页面渲染中的使用',
        category: 'JavaScript',
        tags: ['JavaScript', '数组方法', '函数式编程'],
        date: '2026-04-12',
        excerpt: '用 map、filter 和 reduce 处理列表渲染、搜索过滤和统计数据。',
        emoji: 'ARR',
        readTime: '2 分钟',
        content: `
            <p>静态项目里经常会用数组模拟接口数据。map 适合生成列表 HTML，filter 适合搜索和分类，reduce 适合统计汇总。掌握这些函数式方法可以有效减少循环嵌套，提升代码可读性。</p>
            <h2>列表渲染</h2>
            <pre><code>container.innerHTML = posts.map(post => renderPost(post)).join('');</code></pre>
            <h2>搜索过滤</h2>
            <pre><code>const result = posts.filter(post => post.title.includes(keyword));</code></pre>
            <h2>数据统计</h2>
            <p>使用 reduce 可以轻松计算文章总数、分类统计和标签频率，避免了传统 for 循环中的临时变量。链式调用 map-filter-reduce 的组合使用是处理数组数据的高效模式。</p>
        `
    },
    {
        id: 6,
        title: 'Node.js 构建 RESTful API 入门',
        category: '后端',
        tags: ['Node.js', 'RESTful', 'API', 'Express'],
        date: '2026-04-05',
        excerpt: '使用 Express 框架搭建 RESTful API，涵盖路由设计、中间件和错误处理。',
        emoji: 'API',
        readTime: '5 分钟',
        content: `
            <p>RESTful API 是现代 Web 应用中前后端分离的基石。本文使用 Express 框架从零搭建一个简单的任务管理 API，覆盖 CRUD 操作的标准实现方式。</p>
            <h2>路由设计</h2>
            <p>遵循 REST 规范设计路由：GET /tasks 获取列表、POST /tasks 创建、PUT /tasks/:id 更新、DELETE /tasks/:id 删除。路由使用 Express Router 进行模块化管理，保持代码结构清晰。</p>
            <h2>中间件</h2>
            <p>使用 <code>express.json()</code> 解析请求体，自定义日志中间件记录请求耗时和状态码。错误处理中间件统一捕获异常并返回标准 JSON 格式的错误响应。CORS 中间件处理跨域问题。</p>
        `
    },
    {
        id: 7,
        title: 'MySQL 索引优化实战',
        category: '数据库',
        tags: ['MySQL', '索引', '性能优化', 'SQL'],
        date: '2026-03-28',
        excerpt: '从慢查询定位到索引设计，记录一次数据库查询性能优化的完整过程。',
        emoji: 'SQL',
        readTime: '5 分钟',
        content: `
            <p>项目中遇到了一个订单列表查询耗时超过 5 秒的问题。通过 EXPLAIN 分析执行计划，发现全表扫描是瓶颈所在，最终通过组合索引和查询优化将耗时降到 50ms 以内。</p>
            <h2>问题定位</h2>
            <p>使用 <code>EXPLAIN SELECT ...</code> 查看执行计划，发现 <code>type</code> 字段为 ALL（全表扫描），<code>rows</code> 达到百万级别。慢查询日志进一步确认了问题 SQL 的执行频率和耗时。</p>
            <h2>优化方案</h2>
            <ul>
                <li>在 status 和 create_time 字段上创建组合索引</li>
                <li>避免在 WHERE 子句中对字段使用函数</li>
                <li>使用覆盖索引减少回表查询</li>
            </ul>
        `
    },
    {
        id: 8,
        title: 'Webpack 从零配置前端工程化',
        category: '工具',
        tags: ['Webpack', '工程化', '打包', 'Babel'],
        date: '2026-03-20',
        excerpt: '不依赖脚手架，从零搭建 Webpack 配置，理解 loader、plugin 和代码分割。',
        emoji: 'WP',
        readTime: '5 分钟',
        content: `
            <p>虽然 Vite 已经成为主流选择，但理解 Webpack 的配置原理对深入掌握前端工程化依然很重要。本文从零搭建一个支持 ES6+、CSS、图片和代码分割的 Webpack 配置。</p>
            <h2>核心配置</h2>
            <p>entry 指定入口文件，output 配置输出路径和文件名 hash。module.rules 中配置 babel-loader 转译 JS、css-loader + style-loader 处理样式、file-loader 处理静态资源。</p>
            <h2>优化策略</h2>
            <ul>
                <li>使用 <code>splitChunks</code> 分离 vendor 和业务代码</li>
                <li>配置 <code>HtmlWebpackPlugin</code> 自动注入打包后的资源</li>
                <li>开发环境使用 <code>webpack-dev-server</code> 实现 HMR 热更新</li>
            </ul>
        `
    },
    {
        id: 9,
        title: 'CSS Grid 和 Flexbox 实战对比',
        category: 'CSS',
        tags: ['CSS', 'Grid', 'Flexbox', '布局'],
        date: '2026-03-12',
        excerpt: '通过同一个页面布局用两种方案实现，对比 Grid 和 Flexbox 的适用场景。',
        emoji: 'CG',
        readTime: '4 分钟',
        content: `
            <p>Flexbox 适合一维布局（要么行要么列），Grid 适合二维布局（同时控制行和列）。但实际项目中两者经常配合使用，各取所长。本文用同一个后台页面分别用两种方式实现，直观展示差异。</p>
            <h2>Flexbox 方案</h2>
            <p>整体用 flex-direction: column，每一行用 flex 子容器。导航栏用 justify-content: space-between 实现两端对齐。卡片列表用 flex-wrap: wrap 实现自动换行。</p>
            <h2>Grid 方案</h2>
            <p>页面整体用 grid-template-areas 划分 header、sidebar、main 和 footer 区域。卡片网格用 grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) 自适应列数。Grid 的 gap 属性比 Flexbox 的 margin 间距更直观。</p>
        `
    },
    {
        id: 10,
        title: 'React Hooks 状态管理最佳实践',
        category: '前端',
        tags: ['React', 'Hooks', '状态管理', 'useEffect'],
        date: '2026-03-05',
        excerpt: '从 useState 到 useReducer，整理 Hooks 在实际项目中的使用模式和常见陷阱。',
        emoji: 'RH',
        readTime: '5 分钟',
        content: `
            <p>React Hooks 彻底改变了组件的写法，但灵活的同时也带来了更多出错的可能。本文整理了在实际项目中总结的 Hooks 使用模式和需要避免的常见问题。</p>
            <h2>useState vs useReducer</h2>
            <p>简单的开关、输入框用 useState；当状态逻辑复杂、多个子值相互依赖时，useReducer 的优势就体现出来了。Reducer 模式让状态变更更加可预测。</p>
            <h2>useEffect 清理</h2>
            <p>在 useEffect 中订阅事件或开启定时器时，必须返回清理函数，否则会导致内存泄漏。使用 <code>useRef</code> 保存最新的回调函数可以避免闭包陷阱。</p>
        `
    },
    {
        id: 11,
        title: 'Docker 容器化部署全流程',
        category: '后端',
        tags: ['Docker', '部署', '容器', 'Dockerfile'],
        date: '2026-02-26',
        excerpt: '从编写 Dockerfile 到 docker-compose 编排，记录前后端项目的容器化实践。',
        emoji: 'DK',
        readTime: '5 分钟',
        content: `
            <p>容器化可以解决"在我机器上能跑"的经典问题。本文记录将一个 Node.js 后端 + React 前端项目完整容器化的过程，包含 Dockerfile 编写和 docker-compose 多服务编排。</p>
            <h2>Dockerfile 编写</h2>
            <p>使用多阶段构建减小镜像体积：第一阶段编译代码，第二阶段只保留运行时依赖。合理配置 .dockerignore 排除 node_modules 和构建产物，加速构建过程。</p>
            <h2>docker-compose</h2>
            <p>通过 docker-compose.yml 编排 API 服务、前端 Nginx 和 MySQL 数据库三个容器。配置网络和卷挂载，实现服务间的通信和数据持久化。</p>
        `
    },
    {
        id: 12,
        title: 'TypeScript 类型体操初探',
        category: '前端',
        tags: ['TypeScript', '类型系统', '泛型'],
        date: '2026-02-18',
        excerpt: '从基础类型标注到高级泛型用法，整理 TypeScript 在实际项目中的应用经验。',
        emoji: 'TS',
        readTime: '4 分钟',
        content: `
            <p>TypeScript 的类型系统远比"给变量加个类型"丰富得多。在实际项目中，合理的类型设计可以大幅减少运行时错误，同时提升 IDE 的智能提示体验。</p>
            <h2>泛型实战</h2>
            <p>封装通用的 API 请求函数时，使用泛型让返回值自动推断类型：<code>function request&lt;T&gt;(url: string): Promise&lt;T&gt;</code>。工具类型 Partial、Pick、Omit 在处理表单和 DTO 时非常实用。</p>
            <h2>类型守卫</h2>
            <p>使用 <code>is</code> 关键字定义类型守卫函数，在处理联合类型时让 TypeScript 正确收窄类型范围。这在处理 API 返回的多种数据结构时特别有用。</p>
        `
    },
    {
        id: 13,
        title: 'MongoDB 聚合管道实战',
        category: '数据库',
        tags: ['MongoDB', '聚合', 'NoSQL', '数据分析'],
        date: '2026-02-10',
        excerpt: '使用聚合管道完成复杂的数据统计和分析，记录 $group、$lookup 和 $unwind 的使用。',
        emoji: 'MG',
        readTime: '4 分钟',
        content: `
            <p>MongoDB 的聚合管道提供了强大的数据处理能力，可以在数据库层面完成大部分数据转换工作，减少应用层的计算开销。本文记录了几个实际场景中的聚合查询案例。</p>
            <h2>常用阶段</h2>
            <p><code>$match</code> 用于过滤文档，相当于 SQL 的 WHERE；<code>$group</code> 用于分组聚合，支持 sum、avg、count 等操作；<code>$lookup</code> 实现跨集合关联查询（类似 JOIN）。</p>
            <h2>实战案例</h2>
            <p>统计每个分类下的文章数量和平均阅读量，使用 <code>$group</code> 配合 <code>$avg</code> 和 <code>$sum</code>。关联用户表获取作者信息，使用 <code>$lookup</code> 和 <code>$unwind</code> 展开数组字段。</p>
        `
    },
    {
        id: 14,
        title: 'Vite vs Webpack 构建工具对比',
        category: '工具',
        tags: ['Vite', 'Webpack', '构建工具', 'ESM'],
        date: '2026-02-02',
        excerpt: '从开发体验、构建速度和生态成熟度三个维度对比 Vite 和 Webpack。',
        emoji: 'VT',
        readTime: '4 分钟',
        content: `
            <p>Vite 凭借原生 ESM 和 esbuild 实现了极速冷启动，而 Webpack 生态更加成熟。两者各有优劣，选择取决于项目规模和团队熟悉度。</p>
            <h2>开发体验</h2>
            <p>Vite 利用浏览器原生 ESM 实现按需编译，冷启动在毫秒级别；Webpack 需要全量打包，大型项目可能需要几十秒。但 Webpack 的 HMR 配置更灵活。</p>
            <h2>生产构建</h2>
            <p>Vite 底层使用 Rollup 打包，配置更简洁；Webpack 经过多年优化，在代码分割和 Tree Shaking 方面更加精细。对于复杂的构建需求，Webpack 的 loader 生态仍然无可替代。</p>
        `
    }
];

/* ============================================
   阅读量管理（LocalStorage）
   ============================================ */
function getReadCount(id) {
    const key = `blog_read_${id}`;
    return parseInt(localStorage.getItem(key) || '0', 10);
}

function incrementReadCount(id) {
    const key = `blog_read_${id}`;
    const count = getReadCount(id) + 1;
    localStorage.setItem(key, count);
    return count;
}

/* ============================================
   分类和标签动态计算
   ============================================ */
function getCategories() {
    const map = {};
    posts.forEach(p => {
        map[p.category] = (map[p.category] || 0) + 1;
    });
    return map;
}

function getAllTags() {
    const set = new Set();
    posts.forEach(p => {
        p.tags.forEach(t => set.add(t));
    });
    return [...set].sort();
}

/* ============================================
   获取待渲染文章列表（过滤 + 分页）
   ============================================ */
function getPostsToRender() {
    let list = filteredPosts !== null ? filteredPosts : posts;

    // 分类过滤
    if (activeCategory) {
        list = list.filter(p => p.category === activeCategory);
    }

    return list;
}

function getPagedPosts() {
    const list = getPostsToRender();
    const total = list.length;
    const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
    // 确保当前页不越界
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const pagePosts = list.slice(start, start + POSTS_PER_PAGE);
    return { pagePosts, total, totalPages };
}

/* ============================================
   高亮关键词
   ============================================ */
function highlightText(text, keyword) {
    if (!keyword) return text;
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

/* ============================================
   渲染函数
   ============================================ */
function renderFeaturedPost() {
    const featured = posts[0];
    const readCount = getReadCount(featured.id);
    const container = document.getElementById('featured-post-container');
    if (!container) return;
    container.innerHTML = `
        <article class="post-card featured glass-card">
            <div class="post-image">
                <div class="placeholder-image">${featured.emoji}</div>
            </div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-category">${featured.category}</span>
                    <span class="post-date">${featured.date}</span>
                </div>
                <h2 class="post-title">${featured.title}</h2>
                <p class="post-excerpt">${featured.excerpt}</p>
                <div class="post-footer">
                    <div class="author-info">
                        <div class="author-avatar">S</div>
                        <span>申浩天</span>
                    </div>
                    <span class="read-time">约 ${featured.readTime}</span>
                    <span class="read-count">阅读 ${readCount}</span>
                    <button class="btn-read-more" onclick="openArticle(${featured.id})">阅读更多 →</button>
                </div>
            </div>
        </article>
    `;
}

function renderPosts() {
    const container = document.getElementById('posts-container');
    const { pagePosts, total, totalPages } = getPagedPosts();
    const searchKeyword = filteredPosts !== null && document.getElementById('search-input')
        ? document.getElementById('search-input').value.trim()
        : '';

    if (pagePosts.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>没有找到匹配的文章</p></div>';
        renderPagination(0, 1);
        return;
    }

    container.innerHTML = pagePosts.map(post => {
        const readCount = getReadCount(post.id);
        const title = searchKeyword ? highlightText(post.title, searchKeyword) : post.title;
        const excerpt = searchKeyword ? highlightText(post.excerpt, searchKeyword) : post.excerpt;
        return `
            <article class="post-card glass-card">
                <div class="post-image">
                    <div class="placeholder-image">${post.emoji}</div>
                </div>
                <div class="post-content">
                    <div class="post-meta">
                        <span class="post-category">${post.category}</span>
                        <span class="post-date">${post.date}</span>
                    </div>
                    <h3>${title}</h3>
                    <p>${excerpt}</p>
                    <div class="post-actions">
                        <span class="read-time">约 ${post.readTime}</span>
                        <span class="read-count">阅读 ${readCount}</span>
                        <button class="btn-read-more" onclick="openArticle(${post.id})">阅读更多 →</button>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    renderPagination(total, totalPages);
}

function renderPagination(total, totalPages) {
    const container = document.getElementById('pagination');
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let html = '';

    // 上一页
    html += `<button class="btn-page" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>上一页</button>`;

    // 页码
    const maxButtons = 7;
    let startPage, endPage;
    if (totalPages <= maxButtons) {
        startPage = 1;
        endPage = totalPages;
    } else {
        const half = Math.floor(maxButtons / 2);
        if (currentPage <= half + 1) {
            startPage = 1;
            endPage = maxButtons;
        } else if (currentPage >= totalPages - half) {
            startPage = totalPages - maxButtons + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - half;
            endPage = currentPage + half;
        }
    }

    if (startPage > 1) {
        html += `<button class="btn-page" onclick="goToPage(1)">1</button>`;
        if (startPage > 2) html += `<span class="page-ellipsis">...</span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
        html += `<button class="btn-page ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += `<span class="page-ellipsis">...</span>`;
        html += `<button class="btn-page" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }

    // 下一页
    html += `<button class="btn-page" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>下一页</button>`;

    container.innerHTML = html;
}

function goToPage(page) {
    const { totalPages } = getPagedPosts();
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderPosts();
    // 滚动到文章列表顶部
    document.getElementById('posts-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCategories() {
    const container = document.getElementById('category-list');
    const categories = getCategories();
    container.innerHTML = Object.entries(categories).map(([name, count]) => `
        <li>
            <a href="#" onclick="filterByCategory('${name.replace(/'/g, "\\'")}')" class="${activeCategory === name ? 'active' : ''}">
                ${name} <span>(${count})</span>
            </a>
        </li>
    `).join('');
}

function renderTags() {
    const container = document.getElementById('tag-cloud');
    const tags = getAllTags();
    container.innerHTML = tags.map(tag => `
        <span class="tag" onclick="searchByTag('${tag.replace(/'/g, "\\'")}')">${tag}</span>
    `).join('');
}

/* ============================================
   搜索和过滤
   ============================================ */
function searchPosts() {
    const searchText = document.getElementById('search-input').value.trim();
    if (!searchText) {
        filteredPosts = null;
    } else {
        const lower = searchText.toLowerCase();
        filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(lower) ||
            post.category.toLowerCase().includes(lower) ||
            post.excerpt.toLowerCase().includes(lower) ||
            post.content.toLowerCase().includes(lower) ||
            post.tags.some(t => t.toLowerCase().includes(lower))
        );
    }
    currentPage = 1; // 重置分页
    renderPosts();
}

function searchByTag(tag) {
    document.getElementById('search-input').value = '';
    filteredPosts = posts.filter(post => post.tags.includes(tag));
    activeCategory = null;
    currentPage = 1;
    renderPosts();
    renderCategories();
    updateNavActive('articles');
    document.getElementById('search-input').value = tag;
    document.getElementById('search-input').focus();
}

function filterByCategory(category) {
    if (activeCategory === category) {
        // 再次点击取消筛选
        activeCategory = null;
    } else {
        activeCategory = category;
    }
    filteredPosts = null;
    document.getElementById('search-input').value = '';
    currentPage = 1;
    renderPosts();
    renderCategories();
    updateNavActive('articles');
}

/* ============================================
   文章弹窗 + 阅读量
   ============================================ */
function openArticle(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    // 增加阅读量
    const newCount = incrementReadCount(id);

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h1>${post.title}</h1>
        <div class="post-meta">
            <span class="post-category">${post.category}</span>
            <span class="post-date">${post.date}</span>
            <span class="read-time">约 ${post.readTime}</span>
            <span class="read-count">已阅读 ${newCount} 次</span>
        </div>
        <div class="post-tags-inline">
            ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="post-content-full">
            ${post.content}
        </div>
    `;

    const modal = document.getElementById('article-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // 更新列表中的阅读量
    renderPosts();
    renderFeaturedPost();
}

function closeArticle() {
    const modal = document.getElementById('article-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/* ============================================
   订阅功能（LocalStorage）
   ============================================ */
function subscribe(event) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const email = input.value.trim();

    if (!email) return;

    // 保存到 LocalStorage
    const subscribers = JSON.parse(localStorage.getItem('blog_subscribers') || '[]');
    if (subscribers.includes(email)) {
        showNotification('该邮箱已经订阅过了', 'info');
    } else {
        subscribers.push(email);
        localStorage.setItem('blog_subscribers', JSON.stringify(subscribers));
        showNotification(`订阅成功！${email} 已加入订阅列表`, 'success');
    }

    input.value = '';
}

/* ============================================
   导航 Tab 切换
   ============================================ */
function switchNavTab(tab) {
    currentNavTab = tab;
    updateNavActive(tab);

    const hero = document.getElementById('blog-hero');
    const contentWrapper = document.getElementById('content-wrapper');
    const aboutSection = document.getElementById('about-section');
    const contactSection = document.getElementById('contact-section');

    // 隐藏所有内容区
    [hero, contentWrapper, aboutSection, contactSection].forEach(el => {
        if (el) el.style.display = 'none';
    });

    switch (tab) {
        case 'home':
            if (hero) hero.style.display = '';
            if (contentWrapper) contentWrapper.style.display = '';
            break;
        case 'articles':
            if (contentWrapper) contentWrapper.style.display = '';
            break;
        case 'about':
            if (aboutSection) aboutSection.style.display = '';
            break;
        case 'contact':
            if (contactSection) contactSection.style.display = '';
            break;
    }
}

function updateNavActive(tab) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === tab) {
            link.classList.add('active');
        }
    });
}

/* ============================================
   通知提示
   ============================================ */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 28px;
        border-radius: 12px;
        color: #fff;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease-out;
        font-family: "Source Sans 3", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    `;

    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #0f9f6e, #0ea371)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #e53e3e, #c53030)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

/* ============================================
   事件监听绑定
   ============================================ */
function setupEventListeners() {
    // 搜索输入
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => {
        // 防抖搜索
        clearTimeout(searchInput._debounce);
        searchInput._debounce = setTimeout(() => {
            searchPosts();
        }, 300);
    });
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            clearTimeout(searchInput._debounce);
            searchPosts();
        }
    });

    // 导航链接
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = link.dataset.page;
            switchNavTab(tab);
        });
    });

    // 搜索按钮
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => searchPosts());
    }

    // 点击弹窗外部关闭
    document.getElementById('article-modal').addEventListener('click', (e) => {
        if (e.target.id === 'article-modal') {
            closeArticle();
        }
    });

    // ESC 键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('article-modal');
            if (modal && modal.style.display !== 'none') {
                closeArticle();
            }
        }
    });

    // 订阅表单
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', subscribe);
    }
}

/* ============================================
   动画样式注入
   ============================================ */
function injectAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
        .search-highlight {
            background: #fef08a;
            color: #17202a;
            padding: 2px 4px;
            border-radius: 3px;
            font-weight: 600;
        }
        .read-count {
            color: var(--muted);
            font-size: 0.86rem;
        }
        .read-count::before {
            content: '👁 ';
            font-size: 0.8rem;
        }
        .category-list a.active {
            color: var(--blue) !important;
            font-weight: 700;
        }
        .empty-state {
            grid-column: 1 / -1;
            text-align: center;
            padding: 60px 20px;
            color: var(--muted);
            font-size: 1.1rem;
        }
        .page-ellipsis {
            padding: 10px 6px;
            color: var(--muted);
            font-weight: 600;
        }
        .btn-page[disabled] {
            opacity: 0.4;
            cursor: not-allowed;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

/* ============================================
   初始化
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedPost();
    renderPosts();
    renderCategories();
    renderTags();
    setupEventListeners();
    injectAnimations();
    switchNavTab('home');
});