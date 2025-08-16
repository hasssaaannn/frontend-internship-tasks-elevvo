// Sidebar Component JavaScript
class SidebarComponent {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.toggleBtn = document.getElementById('toggleBtn');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.isCollapsed = true;
        this.isMobile = window.innerWidth <= 768;
        
        this.init();
    }

    init() {
        this.toggleBtn.addEventListener('click', () => this.toggleSidebar());
        
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleSidebar());
        }
        
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        if (this.isMobile) {
            this.sidebar.classList.add('closed');
        }
        
        this.addLoadingAnimation();
    }

    toggleSidebar() {
        if (this.isMobile) {
            this.toggleMobileSidebar();
        } else {
            this.toggleDesktopSidebar();
        }
        
        this.updateToggleButton();
    }

    toggleDesktopSidebar() {
        this.isCollapsed = !this.isCollapsed;
        
        if (this.isCollapsed) {
            this.sidebar.classList.remove('expanded');
            this.animateCollapse();
        } else {
            this.sidebar.classList.add('expanded');
            this.animateExpand();
        }
    }

    toggleMobileSidebar() {
        const isOpen = this.sidebar.classList.contains('open');
        
        if (isOpen) {
            this.sidebar.classList.remove('open');
            this.sidebar.classList.add('closed');
            this.animateMobileClose();
        } else {
            this.sidebar.classList.remove('closed');
            this.sidebar.classList.add('open');
            this.animateMobileOpen();
        }
    }

    animateCollapse() {
        this.sidebar.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        const navItems = this.sidebar.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0.7';
                item.style.transform = 'scale(0.95)';
            }, index * 50);
        });
    }

    animateExpand() {
        const navItems = this.sidebar.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 30);
        });
    }

    animateMobileOpen() {
        this.createOverlay();
        this.sidebar.style.transform = 'translateX(0)';
        this.sidebar.style.boxShadow = '2px 0 20px rgba(0, 0, 0, 0.3)';
    }

    animateMobileClose() {
        this.removeOverlay();
        this.sidebar.style.transform = 'translateX(-100%)';
        this.sidebar.style.boxShadow = 'none';
    }

    createOverlay() {
        if (!document.querySelector('.sidebar-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            overlay.addEventListener('click', () => this.toggleSidebar());
            document.body.appendChild(overlay);
            
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
        }
    }

    removeOverlay() {
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    }

    updateToggleButton() {
        const icon = this.toggleBtn.querySelector('i');
        const mobileIcon = this.mobileToggle ? this.mobileToggle.querySelector('i') : null;
        
        if (this.isMobile) {
            const isOpen = this.sidebar.classList.contains('open');
            if (isOpen) {
                if (mobileIcon) {
                    mobileIcon.className = 'fas fa-times';
                    this.mobileToggle.setAttribute('aria-label', 'Close sidebar');
                }
            } else {
                if (mobileIcon) {
                    mobileIcon.className = 'fas fa-bars';
                    this.mobileToggle.setAttribute('aria-label', 'Open sidebar');
                }
            }
        } else {
            if (this.isCollapsed) {
                icon.className = 'fas fa-bars';
                this.toggleBtn.setAttribute('aria-label', 'Open sidebar');
            } else {
                icon.className = 'fas fa-times';
                this.toggleBtn.setAttribute('aria-label', 'Close sidebar');
            }
        }
    }

    addLoadingAnimation() {
        const navItems = this.sidebar.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100 + 500);
        });
    }

    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        if (wasMobile !== this.isMobile) {
            this.sidebar.classList.remove('expanded', 'open', 'closed');
            this.isCollapsed = true;
            this.removeOverlay();
            this.updateToggleButton();
        }
    }

    handleKeyboard(e) {
        if (e.key === 'Escape') {
            if (this.isMobile && this.sidebar.classList.contains('open')) {
                this.toggleSidebar();
            }
        }
        
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            this.toggleSidebar();
        }
    }
}

// Navigation functionality
class NavigationHandler {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.currentPage = 'Home';
        this.init();
    }

    init() {
        this.navLinks.forEach(link => {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
        });
        
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavClick(e, index);
            });
            
            link.addEventListener('mouseenter', () => {
                this.addHoverEffect(link);
            });
            
            link.addEventListener('mouseleave', () => {
                this.removeHoverEffect(link);
            });
        });
        
        this.navLinks[0].classList.add('active');
    }

    handleNavClick(e, index) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        this.updateCurrentPage(e.currentTarget, index);
    }

    addHoverEffect(link) {
        link.style.transform = 'translateX(8px) scale(1.02)';
    }

    removeHoverEffect(link) {
        link.style.transform = 'translateX(0) scale(1)';
    }

    updateCurrentPage(link, index) {
        const linkText = link.querySelector('.link-text').textContent;
        const header = document.querySelector('.header h1');
        
        this.currentPage = linkText;
        
        header.textContent = `Current Page: ${linkText}`;
        header.style.color = '#667eea';
        
        setTimeout(() => {
            header.style.color = 'white';
        }, 2000);
    }
}

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background: #d0d0d0 !important;
        color: #333 !important;
        border-color: #999 !important;
    }
    
    .nav-link.active i {
        color: #333 !important;
    }
`;
document.head.appendChild(style);

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = new SidebarComponent();
    const navigation = new NavigationHandler();
}); 