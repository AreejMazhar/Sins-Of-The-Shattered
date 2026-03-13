// app.js — async startup wired to PHP/MySQL via dataBridge.js

class App {
    constructor() {
        this.currentView = 'dashboard';
        this.navButtons  = document.querySelectorAll('.nav-btn');
        this.mainContent = document.getElementById('main-content');
        this.modal = {
            overlay: document.getElementById('modal-container'),
            body:    document.getElementById('modal-body'),
            close:   document.getElementById('modal-close')
        };
        this.tooltipEl      = document.getElementById('tooltip');
        this.themeToggleBtn = document.getElementById('theme-toggle');

        this.init();
    }

    async init() {
        // ── Event listeners ──────────────────────────────────
        this.navButtons.forEach(btn =>
            btn.addEventListener('click', e => this.handleNavClick(e))
        );
        this.modal.close.addEventListener('click', () => this.closeModal());
        this.modal.overlay.addEventListener('click', e => {
            if (e.target === this.modal.overlay) this.closeModal();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') this.closeModal();
        });

        // ── Theme ────────────────────────────────────────────
        this.isDarkMode = true;
        this.themeToggleBtn.addEventListener('click', () => {
            this.isDarkMode = !this.isDarkMode;
            if (this.isDarkMode) {
                document.documentElement.setAttribute('data-theme', 'dark');
                this.themeToggleBtn.innerHTML = '☀️ Light Mode';
            }
        });
        // Set initial state correctly if it's dark
        if (this.isDarkMode) {
            this.themeToggleBtn.innerHTML = '☀️ Light Mode';
        }

        // ── Show loading state ───────────────────────────────
        this.mainContent.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:60vh; gap:1rem;">
                <div style="font-size:2rem;">⚔️</div>
                <p style="color:var(--text-muted);">Loading campaign data…</p>
            </div>`;

        // ── Load all data from DB (parallel) ─────────────────
        const [quests, characters, items, npcs, sessions, discoveries] = await Promise.all([
            DB.load('quests'),
            DB.load('characters'),
            DB.load('items'),
            DB.load('npcs'),
            DB.load('sessions'),
            DB.load('discoveries')
        ]);

        // ── Fallback to mock data if API unavailable ─────────
        const mock = window.campaignData || {};
        window.campaignData = {
            quests:      quests      || mock.quests      || [],
            characters:  characters  || mock.characters  || [],
            items:       items       || mock.items       || [],
            npcs:        npcs        || mock.npcs        || [],
            history:     sessions    || mock.history     || [],
            discoveries: discoveries || mock.discoveries || []
        };

        // ── Render initial view ──────────────────────────────
        this.renderView(this.currentView);
    }

    handleNavClick(e) {
        const target = e.currentTarget.dataset.target;
        if (target === this.currentView) return;
        this.navButtons.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentView = target;
        this.renderView(target);
    }

    renderView(view) {
        this.mainContent.style.opacity = '0.5';

        setTimeout(() => {
            this.mainContent.innerHTML = '';
            const data = window.campaignData;

            switch (view) {
                case 'dashboard':  this.mainContent.appendChild(renderDashboard(data, this));  break;
                case 'characters': this.mainContent.appendChild(renderCharacters(data, this)); break;
                case 'quests':     this.mainContent.appendChild(renderQuests(data, this));     break;
                case 'items':      this.mainContent.appendChild(renderItems(data, this));      break;
                case 'npcs':       this.mainContent.appendChild(renderNPCs(data, this));       break;
                case 'maps':       this.mainContent.appendChild(renderMaps(data, this));       break;
                case 'journal':    this.mainContent.appendChild(renderJournal(data, this));    break;
                default:
                    this.mainContent.innerHTML = `<h2>404 — Scroll Not Found</h2>`;
            }

            requestAnimationFrame(() => {
                this.mainContent.style.transition = 'opacity 0.3s ease';
                this.mainContent.style.opacity = '1';
            });
        }, 150);
    }

    openModal(contentHtml, afterRenderCallback = null) {
        this.modal.body.innerHTML = contentHtml;
        this.modal.overlay.classList.remove('hidden');
        if (afterRenderCallback) afterRenderCallback(this.modal.body);
    }

    closeModal() {
        this.modal.overlay.classList.add('hidden');
        setTimeout(() => { this.modal.body.innerHTML = ''; }, 300);
    }

    showTooltip(e, html) {
        this.tooltipEl.innerHTML = html;
        this.tooltipEl.classList.remove('hidden');
        let x = e.pageX + 15, y = e.pageY + 15;
        const b = this.tooltipEl.getBoundingClientRect();
        if (x + b.width  > window.innerWidth)  x = window.innerWidth  - b.width  - 10;
        if (y + b.height > window.innerHeight) y = window.innerHeight - b.height - 10;
        this.tooltipEl.style.left = `${x}px`;
        this.tooltipEl.style.top  = `${y}px`;
    }

    moveTooltip(e) {
        let x = e.pageX + 15, y = e.pageY + 15;
        const b = this.tooltipEl.getBoundingClientRect();
        if (x + b.width  > window.innerWidth)  x = window.innerWidth  - b.width  - 10;
        if (y + b.height > window.innerHeight) y = window.innerHeight - b.height - 10;
        this.tooltipEl.style.left = `${x}px`;
        this.tooltipEl.style.top  = `${y}px`;
    }

    hideTooltip() {
        this.tooltipEl.classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
