// 博客文章数据
const posts = [
    {
        id: 0,
        title: '从零实现一个 Markdown 编辑器',
        category: '项目记录',
        date: '2026-05-18',
        excerpt: '记录编辑区、实时预览、版本历史和导出功能的实现过程，以及项目中踩到的小问题。',
        emoji: 'MD',
        readTime: '4 分钟',
        content: `
            <p>这个项目的目标很简单：做一个打开就能用的 Markdown 编辑器。左侧输入内容，右侧实时预览，写完后可以导出 Markdown、HTML 或通过浏览器保存为 PDF。</p>

            <h2>编辑和预览</h2>
            <p>编辑区监听 input 事件，把文本交给 Marked.js 解析，再同步更新预览区和 HTML 源码区。这样可以保持实现轻量，也方便后续替换解析器。</p>

            <h2>版本历史</h2>
            <p>版本历史没有接后端，而是使用 LocalStorage 保存最近 20 个版本。这个方案适合静态页面演示，也能体现本地持久化的基本思路。</p>

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
        date: '2026-05-10',
        excerpt: '用指标卡、趋势图和订单表格搭建一个后台首页，并记录 Chart.js 的基本使用方式。',
        emoji: 'DB',
        readTime: '3 分钟',
        content: `
            <p>数据看板项目主要练习后台页面的信息组织。页面包含指标卡、销售趋势、用户分布、订单状态和最近订单表格。</p>

            <h2>页面结构</h2>
            <p>顶部用于放页面标题和操作按钮，中间用卡片承载核心指标，下方再放图表和表格。这样信息从总览到明细逐步展开，比较符合后台系统的阅读习惯。</p>

            <h2>图表更新</h2>
            <p>销售趋势图支持切换时间范围，切换时重新生成日期标签和数据后调用 chart.update()，可以模拟真实项目中的筛选刷新流程。</p>
        `
    },
    {
        id: 2,
        title: '博客系统的搜索和标签实现',
        category: 'JavaScript',
        date: '2026-05-02',
        excerpt: '整理文章数组、分类目录、标签云和搜索过滤的实现方式。',
        emoji: 'JS',
        readTime: '3 分钟',
        content: `
            <p>博客系统的数据先放在前端数组中，适合展示列表渲染、弹窗详情、分类和搜索这些基础交互。</p>

            <h2>搜索逻辑</h2>
            <p>搜索框输入关键词后，根据文章标题和分类进行过滤，再重新渲染文章列表。标签点击也会复用同一个过滤函数。</p>

            <h2>弹窗详情</h2>
            <p>文章详情通过弹窗展示，打开时禁止页面滚动，关闭后恢复。这类交互在后台系统和内容类网站中都比较常见。</p>
        `
    },
    {
        id: 3,
        title: '一次响应式布局调整记录',
        category: 'CSS',
        date: '2026-04-26',
        excerpt: '记录 Grid、Flexbox 和移动端断点在项目里的具体使用场景。',
        emoji: 'CSS',
        readTime: '2 分钟',
        content: `
            <p>几个静态项目都需要同时适配桌面端和移动端，因此布局上主要使用 Grid 和 Flexbox。</p>

            <h2>桌面端</h2>
            <p>桌面端优先保证信息密度，例如博客采用内容区和侧边栏两列布局，数据看板采用指标卡和图表网格。</p>

            <h2>移动端</h2>
            <p>移动端把多列布局收敛为单列，同时减少按钮和卡片之间的间距，避免内容被挤压。</p>
        `
    },
    {
        id: 4,
        title: 'GitHub Pages 部署静态项目',
        category: '工具',
        date: '2026-04-18',
        excerpt: '整理静态项目从仓库到在线预览的发布流程。',
        emoji: 'Git',
        readTime: '3 分钟',
        content: `
            <p>这些项目都可以通过 GitHub Pages 发布。对纯 HTML、CSS、JavaScript 项目来说，不需要额外服务器，适合作为在线作品展示。</p>

            <h2>基本流程</h2>
            <ul>
                <li>把项目推送到 GitHub 仓库</li>
                <li>在仓库 Settings 中开启 Pages</li>
                <li>选择 main 分支作为发布来源</li>
            </ul>

            <h2>注意事项</h2>
            <p>如果页面引用了相对路径资源，部署后要检查路径是否正确，尤其是图片、脚本和样式文件。</p>
        `
    },
    {
        id: 5,
        title: 'JavaScript 数组方法在页面渲染中的使用',
        category: 'JavaScript',
        date: '2026-04-12',
        excerpt: '用 map、filter 和 reduce 处理列表渲染、搜索过滤和统计数据。',
        emoji: 'ARR',
        readTime: '2 分钟',
        content: `
            <p>静态项目里经常会用数组模拟接口数据。map 适合生成列表 HTML，filter 适合搜索和分类，reduce 适合统计汇总。</p>

            <h2>列表渲染</h2>
            <pre><code>container.innerHTML = posts.map(post => renderPost(post)).join('');</code></pre>

            <h2>搜索过滤</h2>
            <pre><code>const result = posts.filter(post => post.title.includes(keyword));</code></pre>
        `
    }
];

// 分类和标签
const categories = {
    '项目记录': 3,
    '前端': 4,
    'JavaScript': 3,
    'CSS': 2,
    '工具': 2
};

const tags = ['JavaScript', 'CSS', 'Marked.js', 'Chart.js', 'LocalStorage', 'GitHub Pages', '响应式布局', '项目复盘'];

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    renderCategories();
    renderTags();
    loadTheme();
    setupEventListeners();
});

// 渲染文章列表
function renderPosts(filterText = '') {
    const container = document.getElementById('posts-container');
    const filteredPosts = filterText 
        ? posts.filter(post => 
            post.title.toLowerCase().includes(filterText.toLowerCase()) ||
            post.category.toLowerCase().includes(filterText.toLowerCase())
          )
        : posts;
    
    container.innerHTML = filteredPosts.map(post => `
        <article class="post-card glass-card">
            <div class="post-image">
                <div class="placeholder-image">${post.emoji}</div>
            </div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-category">${post.category}</span>
                    <span class="post-date">${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="post-actions">
                    <span class="read-time">约 ${post.readTime}</span>
                    <button class="btn-read-more" onclick="openArticle(${post.id})">阅读更多 →</button>
                </div>
            </div>
        </article>
    `).join('');
}

// 渲染分类
function renderCategories() {
    const container = document.getElementById('category-list');
    container.innerHTML = Object.entries(categories).map(([name, count]) => `
        <li><a href="#">${name} (${count})</a></li>
    `).join('');
}

// 渲染标签
function renderTags() {
    const container = document.getElementById('tag-cloud');
    container.innerHTML = tags.map(tag => `
        <span class="tag" onclick="searchByTag('${tag}')">${tag}</span>
    `).join('');
}

// 搜索功能
function searchPosts() {
    const searchText = document.getElementById('search-input').value.trim();
    renderPosts(searchText);
}

// 按标签搜索
function searchByTag(tag) {
    document.getElementById('search-input').value = tag;
    renderPosts(tag);
}

// 打开文章详情
function openArticle(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h1>${post.title}</h1>
        <div class="post-meta">
            <span class="post-category">${post.category}</span>
            <span class="post-date">${post.date}</span>
            <span class="read-time">约 ${post.readTime}</span>
        </div>
        <div class="post-content-full">
            ${post.content}
        </div>
    `;
    
    const modal = document.getElementById('article-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// 关闭文章详情
function closeArticle() {
    const modal = document.getElementById('article-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 订阅功能
function subscribe(event) {
    event.preventDefault();
    const email = event.target.querySelector('input').value;
    showNotification(`感谢订阅！${email}`, 'success');
    event.target.reset();
}

// 主题切换
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    const icon = document.getElementById('theme-toggle').querySelector('.icon');
    icon.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('blogTheme', isLight ? 'light' : 'dark');
}

// 加载保存的主题
function loadTheme() {
    const savedTheme = localStorage.getItem('blogTheme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        document.getElementById('theme-toggle').querySelector('.icon').textContent = '☀️';
    }
}

// 设置事件监听
function setupEventListeners() {
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    document.getElementById('search-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchPosts();
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    // 点击弹窗外部关闭
    document.getElementById('article-modal').addEventListener('click', (e) => {
        if (e.target.id === 'article-modal') {
            closeArticle();
        }
    });
    
    // ESC 键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeArticle();
        }
    });
}

// 通知提示
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#f5576c'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
