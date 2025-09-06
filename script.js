// Language switching functionality
class LanguageSwitcher {
    constructor() {
        this.currentLang = 'en';
        this.init();
    }

    init() {
        // Get language buttons
        this.enBtn = document.getElementById('lang-en');
        this.zhBtn = document.getElementById('lang-zh');
        
        // Add event listeners
        this.enBtn.addEventListener('click', () => this.switchLanguage('en'));
        this.zhBtn.addEventListener('click', () => this.switchLanguage('zh'));
        
        // Initialize with saved language or default to English
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
            this.switchLanguage(savedLang);
        } else {
            this.switchLanguage('en');
        }
        
        // Ensure language elements are properly initialized
        this.updateLanguageElements();
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        
        // Update button states
        this.enBtn.classList.toggle('active', lang === 'en');
        this.zhBtn.classList.toggle('active', lang === 'zh');
        
        // Update all elements with data attributes
        this.updateElements();
        
        // Update elements with lang-en/lang-zh classes
        this.updateLanguageElements();
        
        // Update document title
        this.updateDocumentTitle();
        
        // Store language preference
        localStorage.setItem('preferredLanguage', lang);
    }

    updateElements() {
        // Find all elements with data-en and data-zh attributes
        const elements = document.querySelectorAll('[data-en][data-zh]');
        
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLang}`);
            if (text) {
                // Use innerHTML for elements that may contain HTML tags (like links)
                if (element.classList.contains('advisor') || text.includes('<a')) {
                    element.innerHTML = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }
    
    updateLanguageElements() {
        // Handle elements with lang-en/lang-zh classes
        document.querySelectorAll('.lang-en, .lang-zh').forEach(element => {
            // Show elements matching current language, hide others
            if (element.classList.contains(`lang-${this.currentLang}`)) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });
    }

    updateDocumentTitle() {
        const titles = {
            en: 'Tinghai Zhang - Personal Homepage',
            zh: '张听海 - 个人主页'
        };
        document.title = titles[this.currentLang];
    }

    // Method removed as functionality is now in constructor
}

// Smooth scrolling for better UX
class SmoothScroller {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all internal links
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
}

// Animation on scroll
class ScrollAnimator {
    constructor() {
        this.init();
    }

    init() {
        // 所有模块预先显示，不再使用滑动显示效果
        // 设置所有section和hero的样式为可见
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            section.style.transition = 'none';
        });

        // 设置hero section为可见
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
            hero.style.transition = 'none';
        }
    }
}

// Theme and accessibility enhancements
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            // Alt + L to switch language
            if (e.altKey && e.key === 'l') {
                e.preventDefault();
                const currentLang = document.querySelector('.lang-btn.active').id;
                const newLang = currentLang === 'lang-en' ? 'zh' : 'en';
                window.languageSwitcher.switchLanguage(newLang);
            }
        });

        // Add focus indicators for better accessibility
        this.addFocusStyles();
        
        // Add skip to content link
        this.addSkipLink();
    }

    addFocusStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .lang-btn:focus,
            .publication-item:focus,
            .skill-category:focus {
                outline: 2px solid #3b82f6;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #3b82f6;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Performance optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images if any are added in the future
        this.setupLazyLoading();
        
        // Preload critical resources
        this.preloadResources();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    preloadResources() {
        // Preload Google Fonts
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap';
        link.as = 'style';
        document.head.appendChild(link);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    window.languageSwitcher = new LanguageSwitcher();
    new SmoothScroller();
    new ScrollAnimator();
    new AccessibilityEnhancer();
    new PerformanceOptimizer();
    
    // Language preference already loaded in constructor
    
    // Add loading complete class for any final animations
    document.body.classList.add('loaded');
});

// Handle page visibility changes for better performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause any animations or timers when page is hidden
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LanguageSwitcher,
        SmoothScroller,
        ScrollAnimator,
        AccessibilityEnhancer,
        PerformanceOptimizer
    };
}
