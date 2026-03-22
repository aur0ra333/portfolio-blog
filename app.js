// 博客文章数据
const blogPosts = [
    {
        id: 1,
        title: '如何高效学习编程：我的 5 年经验分享',
        excerpt: '学习编程是一条充满挑战但也充满乐趣的道路。在这篇文章中，我将分享我 5 年编程学习生涯中总结出的宝贵经验...',
        category: '技术',
        date: '2026-03-22',
        author: '作者',
        featured: true
    },
    {
        id: 2,
        title: 'React Hooks 完全指南',
        excerpt: '深入理解 useState、useEffect 等常用 Hooks 的使用场景和最佳实践...',
        category: '前端',
        date: '2026-03-20',
        author: '作者'
    },
    {
        id: 3,
        title: 'CSS Grid 布局入门教程',
        excerpt: '从零开始学习 CSS Grid，掌握现代网页布局的核心技术...',
        category: '设计',
        date: '2026-03-18',
        author: '作者'
    },
    {
        id: 4,
        title: 'Web 性能优化实战技巧',
        excerpt: '提升网站加载速度的 10 个实用技巧，让你的网站飞起来...',
        category: '性能',
        date: '2026-03-15',
        author: '作者'
    },
    {
        id: 5,
        title: 'Git 版本控制最佳实践',
        excerpt: '掌握 Git 的核心概念和工作流，提高团队协作效率...',
        category: '工具',
        date: '2026-03-12',
        author: '作者'
    },
    {
        id: 6,
        title: 'JavaScript 数据处理技巧',
        excerpt: '学习如何使用数组方法高效地处理和转换数据...',
        category: '数据',
        date: '2026-03-10',
        author: '作者'
    }
];

// 动态加载文章
function loadPosts() {
    const postsGrid = document.querySelector('.posts-grid');
    const regularPosts = blogPosts.filter(post => !post.featured);
    
    postsGrid.innerHTML = regularPosts.map(post => `
        <article class="post-card">
            <div class="post-image">
                <div class="placeholder-image">${getCategoryIcon(post.category)}</div>
            </div>
            <div class="post-content">
                <div class="post-meta">
                    <span class="post-category">${post.category}</span>
                    <span class="post-date">${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <button class="btn-read-more">阅读更多 →</button>
            </div>
        </article>
    `).join('');
}

// 获取分类图标
function getCategoryIcon(category) {
    const icons = {
        '技术': '🚀',
        '前端': '💻',
        '设计': '🎨',
        '性能': '⚡',
        '工具': '🔧',
        '数据': '📊'
    };
    return icons[category] || '📝';
}

// 订阅表单处理
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    
    const subscribeForm = document.querySelector('.subscribe-form');
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        alert(`感谢订阅！我们会向 ${email} 发送最新更新。`);
        e.target.reset();
    });
    
    // 阅读更多按钮
    document.querySelectorAll('.btn-read-more').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('文章详情页功能开发中...');
        });
    });
});
