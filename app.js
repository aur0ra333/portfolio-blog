// 博客文章数据
const posts = [
    {
        id: 0,
        title: '如何高效学习编程：我的 5 年经验分享',
        category: '技术',
        date: '2026-03-22',
        excerpt: '学习编程是一条充满挑战但也充满乐趣的道路。在这篇文章中，我将分享我 5 年编程学习生涯中总结出的宝贵经验...',
        emoji: '🚀',
        content: `
            <p>学习编程是一条充满挑战但也充满乐趣的道路。在这篇文章中，我将分享我 5 年编程学习生涯中总结出的宝贵经验。</p>
            
            <h2>1. 打好基础最重要</h2>
            <p>很多初学者急于学习框架，而忽视了基础。数据结构、算法、计算机网络这些基础知识才是程序员的内功。</p>
            
            <h2>2. 多动手实践</h2>
            <p>编程是一门实践性很强的技能。看十遍教程不如自己动手写一遍代码。建议：</p>
            <ul>
                <li>每天至少写 2 小时代码</li>
                <li>做项目驱动学习</li>
                <li>参与开源项目</li>
            </ul>
            
            <h2>3. 学会阅读文档</h2>
            <p>官方文档是最权威的学习资料。培养阅读英文文档的能力，这将让你受益终生。</p>
            
            <h2>4. 保持持续学习</h2>
            <p>技术更新很快，要保持好奇心和学习热情。建议每天抽出固定时间学习新技术。</p>
            
            <blockquote>编程不是关于你知道多少，而是关于你能学到多少。- 未知</blockquote>
        `
    },
    {
        id: 1,
        title: 'React Hooks 完全指南',
        category: '前端',
        date: '2026-03-20',
        excerpt: '深入理解 useState、useEffect 等常用 Hooks 的使用场景和最佳实践...',
        emoji: '💻',
        content: `
            <p>React Hooks 是 React 16.8 引入的新特性，让函数组件也能拥有状态和生命周期。</p>
            
            <h2>useState - 状态管理</h2>
            <pre><code>const [count, setCount] = useState(0);</code></pre>
            
            <h2>useEffect - 副作用处理</h2>
            <pre><code>useEffect(() => {
    document.title = \`Count: \${count}\`;
}, [count]);</code></pre>
            
            <h2>最佳实践</h2>
            <ul>
                <li>只在顶层调用 Hooks</li>
                <li>只在 React 函数中调用 Hooks</li>
                <li>使用 ESLint 插件检查 Hooks 规则</li>
            </ul>
        `
    },
    {
        id: 2,
        title: 'CSS Grid 布局入门教程',
        category: '设计',
        date: '2026-03-18',
        excerpt: '从零开始学习 CSS Grid，掌握现代网页布局的核心技术...',
        emoji: '🎨',
        content: `
            <p>CSS Grid 是一个强大的二维布局系统，让复杂布局变得简单。</p>
            
            <h2>基本概念</h2>
            <pre><code>.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}</code></pre>
            
            <h2>常用属性</h2>
            <ul>
                <li>grid-template-columns: 定义列</li>
                <li>grid-template-rows: 定义行</li>
                <li>gap: 设置间距</li>
            </ul>
        `
    },
    {
        id: 3,
        title: 'Web 性能优化实战技巧',
        category: '性能',
        date: '2026-03-15',
        excerpt: '提升网站加载速度的 10 个实用技巧，让你的网站飞起来...',
        emoji: '⚡',
        content: `
            <p>网站性能直接影响用户体验和 SEO。以下是我总结的优化技巧：</p>
            
            <h2>1. 图片优化</h2>
            <ul>
                <li>使用 WebP 格式</li>
                <li>实现懒加载</li>
                <li>使用 CDN</li>
            </ul>
            
            <h2>2. 代码优化</h2>
            <ul>
                <li>压缩 CSS 和 JS</li>
                <li>移除未使用的代码</li>
                <li>使用代码分割</li>
            </ul>
        `
    },
    {
        id: 4,
        title: 'Git 版本控制最佳实践',
        category: '工具',
        date: '2026-03-12',
        excerpt: '掌握 Git 的核心概念和工作流，提高团队协作效率...',
        emoji: '🔧',
        content: `
            <p>Git 是现代开发不可或缺的工具。以下是我总结的最佳实践：</p>
            
            <h2>提交规范</h2>
            <pre><code>feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 重构</code></pre>
            
            <h2>分支策略</h2>
            <ul>
                <li>main: 生产环境</li>
                <li>develop: 开发环境</li>
                <li>feature/*: 功能分支</li>
            </ul>
        `
    },
    {
        id: 5,
        title: 'JavaScript 数据处理技巧',
        category: '数据',
        date: '2026-03-10',
        excerpt: '学习如何使用数组方法高效地处理和转换数据...',
        emoji: '📊',
        content: `
            <p>JavaScript 提供了丰富的数组方法来处理数据。</p>
            
            <h2>map - 转换数组</h2>
            <pre><code>const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);</code></pre>
            
            <h2>filter - 过滤数组</h2>
            <pre><code>const evens = numbers.filter(n => n % 2 === 0);</code></pre>
            
            <h2>reduce - 汇总数据</h2>
            <pre><code>const sum = numbers.reduce((acc, n) => acc + n, 0);</code></pre>
        `
    }
];

// 分类和标签
const categories = {
    '技术': 15,
    '前端': 23,
    '后端': 12,
    '设计': 8,
    '工具': 10,
    '性能': 6,
    '数据': 9
};

const tags = ['JavaScript', 'React', 'CSS', 'Node.js', 'Python', 'Git', 'HTML5', 'TypeScript', 'Vue', 'Webpack'];

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
                <button class="btn-read-more" onclick="openArticle(${post.id})">阅读更多 →</button>
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
