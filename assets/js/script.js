// 導航欄滾動效果
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
  } else {
    header.style.boxShadow = "none";
  }
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const sections = Array.from(document.querySelectorAll("section"));
      const targetIndex = sections.indexOf(target);
      if (targetIndex !== -1) {
        currentPage = targetIndex;
        scrollToPage(currentPage);
      }
    }
  });
});

// 添加頁面載入動畫
document.addEventListener("DOMContentLoaded", function () {
  const heroContent = document.querySelector(".hero-content");
  if (!heroContent) return;

  const heroTitle = heroContent.querySelector(".hero-title");
  const heroText = heroContent.querySelector(".hero-subtitle");

  if (heroTitle) {
    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(20px)";
    setTimeout(() => {
      heroTitle.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      heroTitle.style.opacity = "1";
      heroTitle.style.transform = "translateY(0)";
    }, 100);
  }

  if (heroText) {
    heroText.style.opacity = "0";
    heroText.style.transform = "translateY(20px)";
    setTimeout(() => {
      heroText.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      heroText.style.opacity = "1";
      heroText.style.transform = "translateY(0)";
    }, 200);
  }
});

// 專案卡片動畫
const projectCards = document.querySelectorAll(".project-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
  }
);

projectCards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  card.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(card);
});

// 技能標籤動畫
const skillTags = document.querySelectorAll(".skill-tags span");
skillTags.forEach((tag, index) => {
  tag.style.opacity = "0";
  tag.style.transform = "scale(0.95)";
  tag.style.transition = "opacity 0.4s ease, transform 0.4s ease, background 0.3s ease";
  tag.style.transitionDelay = `${index * 0.05}s`;

  setTimeout(() => {
    tag.style.opacity = "1";
    tag.style.transform = "scale(1)";
  }, 500 + index * 50);
});

// 聯絡方式項目動畫
const contactItems = document.querySelectorAll(".contact-item");
contactItems.forEach((item, index) => {
  item.style.opacity = "0";
  item.style.transform = "translateX(-20px)";
  item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  item.style.transitionDelay = `${index * 0.1}s`;

  setTimeout(() => {
    item.style.opacity = "1";
    item.style.transform = "translateX(0)";
  }, 800 + index * 100);
});

// ===== Full Page Scroll Logic =====
const pageSections = Array.from(document.querySelectorAll("section"));
let currentPage = 0;
let isScrolling = false;
let lastScrollTime = 0;
const SCROLL_COOLDOWN = 1000; // ms

// Initialize
window.addEventListener("load", () => {
  // Reset to top on load
  window.scrollTo(0, 0);
  currentPage = 0;
  // document.body.style.overflow = "hidden"; // Ensure no default scroll
});

function scrollToPage(idx) {
  if (idx < 0 || idx >= pageSections.length) return;

  isScrolling = true;
  currentPage = idx;

  // Calculate the exact top position of the section
  const targetSection = pageSections[idx];
  const targetPosition = targetSection.offsetTop;

  // Scroll to the exact position (top of viewport = top of section)
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });

  // Reset scrolling flag after animation
  setTimeout(() => {
    isScrolling = false;
  }, 1000);
}

// Wheel Event (Mouse)
window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault(); // Always prevent default scroll

    const now = Date.now();
    if (isScrolling || now - lastScrollTime < SCROLL_COOLDOWN) return;

    if (e.deltaY > 0) {
      // Scroll Down
      if (currentPage < pageSections.length - 1) {
        scrollToPage(currentPage + 1);
        lastScrollTime = now;
      }
    } else {
      // Scroll Up
      if (currentPage > 0) {
        scrollToPage(currentPage - 1);
        lastScrollTime = now;
      }
    }
  },
  { passive: false }
);

// Keyboard Navigation
window.addEventListener("keydown", (e) => {
  const now = Date.now();

  // Allow default behavior for non-navigation keys if not scrolling
  if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", " ", "Home", "End"].includes(e.key)) {
    e.preventDefault();
  } else {
    return;
  }

  if (isScrolling || now - lastScrollTime < SCROLL_COOLDOWN) return;

  if (e.key === "ArrowDown" || e.key === "PageDown") {
    if (currentPage < pageSections.length - 1) {
      scrollToPage(currentPage + 1);
      lastScrollTime = now;
    }
  } else if (e.key === "ArrowUp" || e.key === "PageUp") {
    if (currentPage > 0) {
      scrollToPage(currentPage - 1);
      lastScrollTime = now;
    }
  } else if (e.key === " ") {
    if (e.shiftKey) {
      if (currentPage > 0) {
        scrollToPage(currentPage - 1);
        lastScrollTime = now;
      }
    } else {
      if (currentPage < pageSections.length - 1) {
        scrollToPage(currentPage + 1);
        lastScrollTime = now;
      }
    }
  } else if (e.key === "Home") {
    scrollToPage(0);
    lastScrollTime = now;
  } else if (e.key === "End") {
    scrollToPage(pageSections.length - 1);
    lastScrollTime = now;
  }
});

// Touch Support (Mobile Swipe)
let touchStartY = 0;
window.addEventListener(
  "touchstart",
  (e) => {
    touchStartY = e.touches[0].clientY;
  },
  { passive: false }
);

window.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault(); // Prevent native scroll
  },
  { passive: false }
);

window.addEventListener(
  "touchend",
  (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    const now = Date.now();

    if (isScrolling || now - lastScrollTime < SCROLL_COOLDOWN) return;

    if (Math.abs(diff) > 50) {
      // Threshold
      if (diff > 0) {
        // Swipe Up -> Scroll Down
        if (currentPage < pageSections.length - 1) {
          scrollToPage(currentPage + 1);
          lastScrollTime = now;
        }
      } else {
        // Swipe Down -> Scroll Up
        if (currentPage > 0) {
          scrollToPage(currentPage - 1);
          lastScrollTime = now;
        }
      }
    }
  },
  { passive: false }
);

// Scroll Down Buttons
document.querySelectorAll(".scroll-down").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = btn.getAttribute("data-scroll");
    const targetIndex = pageSections.findIndex((sec) => sec.id === targetId);
    if (targetIndex !== -1) {
      scrollToPage(targetIndex);
    }
  });
});

// Navigation Links
document.querySelectorAll(".nav-links a, .logo").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetIndex = pageSections.findIndex((sec) => sec.id === targetId);
    if (targetIndex !== -1) {
      scrollToPage(targetIndex);
    }
  });
});

// Handle Resize
window.addEventListener("resize", () => {
  // Re-align to current page using exact position
  const targetPosition = pageSections[currentPage].offsetTop;
  window.scrollTo({ top: targetPosition });
});
