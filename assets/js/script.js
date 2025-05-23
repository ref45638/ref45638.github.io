// 導航欄滾動效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 添加頁面載入動畫
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = heroContent.querySelector('h1');
    const heroText = heroContent.querySelector('p');
    const heroButton = heroContent.querySelector('.cta-button');

    // 設置初始狀態
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(20px)';
    heroButton.style.opacity = '0';
    heroButton.style.transform = 'translateY(20px)';

    // 添加動畫
    setTimeout(() => {
        heroTitle.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
        heroText.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
    }, 200);

    setTimeout(() => {
        heroButton.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        heroButton.style.opacity = '1';
        heroButton.style.transform = 'translateY(0)';
    }, 300);
});

// 專案卡片動畫
const projectCards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// 技能標籤動畫
const skillTags = document.querySelectorAll('.skill-tags span');
skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.95)';
    tag.style.transition = 'opacity 0.4s ease, transform 0.4s ease, background 0.3s ease';
    tag.style.transitionDelay = `${index * 0.05}s`;

    setTimeout(() => {
        tag.style.opacity = '1';
        tag.style.transform = 'scale(1)';
    }, 500 + (index * 50));
});

// 聯絡方式項目動畫
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    item.style.transitionDelay = `${index * 0.1}s`;

    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, 800 + (index * 100));
});

// 滾動到 About Me
const scrollDownBtn = document.getElementById('scrollDownBtn');
if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', function () {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// 首頁滾輪往下自動滾到 About Me（只觸發一次）
let scrolledToAbout = false;
window.addEventListener('wheel', function (e) {
    if (!scrolledToAbout && window.scrollY < window.innerHeight * 0.5 && e.deltaY > 0) {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
            scrolledToAbout = true;
            setTimeout(() => { scrolledToAbout = false; }, 1200);
        }
    }
}, { passive: true });

// 全頁滾動效果（每個 section 都獨立）
const pageSections = Array.from(document.querySelectorAll('section')).filter(Boolean);

let currentPage = 0;
let isScrolling = false;

function scrollToPage(idx) {
    if (idx < 0 || idx >= pageSections.length) return;
    isScrolling = true;
    pageSections[idx].scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => { isScrolling = false; }, 900);
}

window.addEventListener('wheel', function(e) {
    if (isScrolling) return;
    if (e.deltaY > 0 && currentPage < pageSections.length - 1) {
        currentPage++;
        scrollToPage(currentPage);
    } else if (e.deltaY < 0 && currentPage > 0) {
        currentPage--;
        scrollToPage(currentPage);
    }
}, { passive: false });

window.addEventListener('keydown', function(e) {
    if (isScrolling) return;
    if (e.key === 'ArrowDown' && currentPage < pageSections.length - 1) {
        currentPage++;
        scrollToPage(currentPage);
    } else if (e.key === 'ArrowUp' && currentPage > 0) {
        currentPage--;
        scrollToPage(currentPage);
    }
});

// 每頁 scroll-down 箭頭點擊自動滑到下一頁
Array.from(document.querySelectorAll('.scroll-down')).forEach(btn => {
    btn.addEventListener('click', function () {
        const targetId = btn.getAttribute('data-scroll');
        const target = document.getElementById(targetId);
        if (target) {
            const idx = pageSections.findIndex(sec => sec.id === targetId);
            if (idx !== -1) {
                currentPage = idx;
                scrollToPage(currentPage);
            } else {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// 初始化時自動定位到第一頁
window.addEventListener('load', function() {
    currentPage = 0;
    scrollToPage(currentPage);
}); 