// Imports removed for global script compatibility

class App {
    constructor() {
        this.currentView = 'dashboard';
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.mainContent = document.getElementById('main-content');
        this.modal = {
            overlay: document.getElementById('modal-container'),
            body: document.getElementById('modal-body'),
            close: document.getElementById('modal-close')
        };
        this.tooltipEl = document.getElementById('tooltip');
        this.tooltipEl = document.getElementById('tooltip');
        this.themeToggleBtn = document.getElementById('theme-toggle');
        
        this.init();
    }

    init() {
        // Setup Event Listeners
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNavClick(e));
        });

        this.modal.close.addEventListener('click', () => this.closeModal());
        this.modal.overlay.addEventListener('click', (e) => {
            if (e.target === this.modal.overlay) this.closeModal();
        });

        // Global keydown for Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });

        // Theme Toggle Logic
        this.isDarkMode = false;
        this.themeToggleBtn.addEventListener('click', () => {
            this.isDarkMode = !this.isDarkMode;
            if (this.isDarkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
                this.themeToggleBtn.innerHTML = '☀️ Light Mode';
            } else {
                document.documentElement.removeAttribute('data-theme');
                this.themeToggleBtn.innerHTML = '🌙 Dark Mode';
            }
        });

        // Render initial view
        this.renderView(this.currentView);
    }

    handleNavClick(e) {
        const target = e.currentTarget.dataset.target;
        if (target === this.currentView) return;

        // Update active class
        this.navButtons.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');

        this.currentView = target;
        this.renderView(target);
    }

    renderView(view) {
        // Fade out slightly
        this.mainContent.style.opacity = '0.5';
        
        setTimeout(() => {
            // Clear current content
            this.mainContent.innerHTML = '';
            
            // Render new content
            switch(view) {
                case 'dashboard':
                    this.mainContent.appendChild(renderDashboard(campaignData, this));
                    break;
                case 'characters':
                    this.mainContent.appendChild(renderCharacters(campaignData, this));
                    break;
                case 'quests':
                    this.mainContent.appendChild(renderQuests(campaignData, this));
                    break;
                case 'items':
                    this.mainContent.appendChild(renderItems(campaignData, this));
                    break;
                case 'npcs':
                    this.mainContent.appendChild(renderNPCs(campaignData, this));
                    break;
                case 'maps':
                    this.mainContent.appendChild(renderMaps(campaignData, this));
                    break;
                case 'journal':
                    this.mainContent.appendChild(renderJournal(campaignData, this));
                    break;
                default:
                    this.mainContent.innerHTML = `<h2>404 - Scroll Not Found</h2>`;
            }
            
            // Fade in
            requestAnimationFrame(() => {
                this.mainContent.style.transition = 'opacity 0.3s ease';
                this.mainContent.style.opacity = '1';
            });
        }, 150);
    }

    openModal(contentHtml, afterRenderCallback = null) {
        this.modal.body.innerHTML = contentHtml;
        this.modal.overlay.classList.remove('hidden');
        if(afterRenderCallback) afterRenderCallback(this.modal.body);
    }

    closeModal() {
        this.modal.overlay.classList.add('hidden');
        setTimeout(() => {
            this.modal.body.innerHTML = '';
        }, 300); // Wait for transition
    }

    showTooltip(e, html) {
        this.tooltipEl.innerHTML = html;
        this.tooltipEl.classList.remove('hidden');
        
        // Position tooltip
        let x = e.pageX + 15;
        let y = e.pageY + 15;
        
        // Keep within bounds
        const bounds = this.tooltipEl.getBoundingClientRect();
        if (x + bounds.width > window.innerWidth) x = window.innerWidth - bounds.width - 10;
        if (y + bounds.height > window.innerHeight) y = window.innerHeight - bounds.height - 10;
        
        this.tooltipEl.style.left = `${x}px`;
        this.tooltipEl.style.top = `${y}px`;
    }

    moveTooltip(e) {
        let x = e.pageX + 15;
        let y = e.pageY + 15;
        
        const bounds = this.tooltipEl.getBoundingClientRect();
        if (x + bounds.width > window.innerWidth) x = window.innerWidth - bounds.width - 10;
        if (y + bounds.height > window.innerHeight) y = window.innerHeight - bounds.height - 10;
        
        this.tooltipEl.style.left = `${x}px`;
        this.tooltipEl.style.top = `${y}px`;
    }

    hideTooltip() {
        this.tooltipEl.classList.add('hidden');
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
