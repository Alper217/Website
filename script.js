document.addEventListener('DOMContentLoaded', () => {
    // Access global data
    const { translations, skills, projects, experience, documents } = window.PORTFOLIO_DATA;

    // Selectors
    const themeToggle = document.getElementById('theme-toggle');
    const langBtns = document.querySelectorAll('.flag-btn');
    const nav = document.getElementById('main-nav');
    const heroContent = document.getElementById('hero-content');
    const profileGrid = document.getElementById('profile-grid');
    const experienceTimeline = document.getElementById('experience-timeline');
    const projectsGrid = document.getElementById('projects-grid');
    const documentsGrid = document.getElementById('documents-grid');
    const footer = document.getElementById('main-footer');

    let currentLang = localStorage.getItem('preferred-lang') || 'tr';

    // --- RENDERING ENGINE ---

    function renderAll() {
        translateStaticElements();
        renderNav();
        renderHero();
        renderProfile();
        renderExperience();
        renderProjects();
        renderDocuments();
        renderFooter();

        // Finalize
        lucide.createIcons();
        initScrollAnimations();
        updateActiveNavLink();
    }

    function translateStaticElements() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            // Avoid overwriting dynamically rendered content if necessary
            // In this specific app, section titles are static in HTML, 
            // but badges/cards are dynamic in JS. 
            // Only translate if the element doesn't have child elements or specifically for section titles.
            if (el.children.length === 0 || el.tagName === 'H2') {
                el.textContent = t(key);
            }
        });
    }

    function t(key) {
        return translations[currentLang][key] || key;
    }

    function renderNav() {
        const items = [
            { id: 'home', key: 'nav-home' },
            { id: 'profile', key: 'nav-profile' },
            { id: 'experience', key: 'nav-experience' },
            { id: 'projects', key: 'nav-projects' },
            { id: 'documents', key: 'nav-documents' }
        ];
        nav.innerHTML = items.map(item => `
            <a href="#${item.id}" data-i18n="${item.key}">${t(item.key)}</a>
        `).join('');

        // Re-attach listeners to new links
        document.querySelectorAll('nav a').forEach(link => {
            link.onclick = (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                history.pushState(null, null, `#${target}`);
                switchSection(target);
            };
        });
    }

    function renderHero() {
        heroContent.innerHTML = `
            <h1 class="fade-in">${t('hero-title')}</h1>
            <p class="fade-in" style="animation-delay: 0.1s">${t('hero-subtitle')}</p>
            <div class="badge-group fade-in" style="justify-content: center; margin-bottom: 2rem; animation-delay: 0.2s">
                <span class="badge" style="background: var(--primary); color: white; padding: 6px 16px;">${t('hero-status')}</span>
            </div>
            <p class="fade-in" style="font-size: 1.1rem; max-width: 700px; margin: 0 auto 3rem; animation-delay: 0.3s">
                ${t('hero-desc')}
            </p>
            <div class="social-links fade-in" style="animation-delay: 0.4s">
                <a href="https://github.com/Alper217" target="_blank" class="social-btn github">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                    <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/alper-kocasalih/" target="_blank" class="social-btn linkedin">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    <span>LinkedIn</span>
                </a>
                <a href="mailto:alperkocasalih@gmail.com" class="social-btn">
                    <i data-lucide="mail"></i>
                    <span>Email</span>
                </a>
            </div>
        `;
    }

    function renderProfile() {
        profileGrid.innerHTML = `
            <div class="card" data-animate>
                <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px;">
                    <i data-lucide="graduation-cap" style="color:var(--primary)"></i>
                    <h3 style="margin:0">${t('profile-edu')}</h3>
                </div>
                <p><strong>${t('profile-uni')}</strong></p>
                <p>${t('profile-dept')}</p>
                <p style="font-size: 0.85rem; margin-top:5px; color: var(--text-muted)">${t('profile-date')}</p>
            </div>
            <div class="card" data-animate>
                <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px;">
                    <i data-lucide="code-2" style="color:var(--secondary)"></i>
                    <h3 style="margin:0">${t('profile-skills')}</h3>
                </div>
                <div class="badge-group">
                    ${skills.map(s => `<span class="badge">${s}</span>`).join('')}
                </div>
            </div>
            <div class="card" data-animate>
                <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px;">
                    <i data-lucide="settings" style="color:var(--accent)"></i>
                    <h3 style="margin:0">${t('profile-tech')}</h3>
                </div>
                <p>${t('profile-tech-desc')}</p>
            </div>
        `;
    }

    function renderExperience() {
        experienceTimeline.innerHTML = experience.map((exp, idx) => `
            <div class="exp-item" data-animate style="transition-delay: ${idx * 0.1}s">
                <div class="exp-header">
                    <div class="exp-row">
                        <span class="exp-company">${t(exp.companyKey)}</span>
                        <span class="exp-meta">${t(exp.locationKey)}</span>
                    </div>
                    <div class="exp-row">
                        <span class="exp-title-text">${t(exp.titleKey)}</span>
                        <span class="exp-meta">${t(exp.dateKey)}</span>
                    </div>
                </div>
                <ul class="exp-bullets">
                    ${exp.bullets.map(b => `
                        <li>
                            <strong>${t(b.titleKey)}:</strong> ${t(b.descKey)}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
    }

    function renderProjects() {
        projectsGrid.innerHTML = projects.map((p, idx) => `
            <div class="card" data-animate style="transition-delay: ${idx * 0.1}s">
                <h3>${t(p.titleKey)}</h3>
                <p>${t(p.descKey)}</p>
                <div class="badge-group">
                    ${p.tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    function renderDocuments() {
        const descEl = document.querySelector('[data-i18n="docs-desc"]');
        if (descEl) descEl.textContent = t('docs-desc');

        documentsGrid.innerHTML = documents.map((doc, idx) => `
            <a href="${doc.link}" class="file-card" data-animate style="transition-delay: ${idx * 0.05}s">
                <div class="file-icon"><i data-lucide="${doc.icon}"></i></div>
                <div>
                    <h4 style="margin:0">${t(doc.titleKey)}</h4>
                    <p style="font-size:0.8rem; margin:0; opacity: 0.7">${t(doc.subKey)}</p>
                </div>
            </a>
        `).join('');
    }

    function renderFooter() {
        footer.innerHTML = `<p>${t('footer')}</p>`;
    }

    // --- CORE LOGIC ---

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferred-lang', lang);
        document.documentElement.lang = lang;

        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        renderAll();
        updateThemeIcon(document.documentElement.getAttribute('data-theme'));
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        updateThemeIcon(newTheme);
    }

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeToggle.innerHTML = '<i data-lucide="sun"></i>';
            themeToggle.title = t('theme-dark');
        } else {
            themeToggle.innerHTML = '<i data-lucide="moon"></i>';
            themeToggle.title = t('theme-light');
        }
        lucide.createIcons();
    }

    function switchSection(targetId) {
        document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
        const activeSection = document.getElementById(targetId);
        if (activeSection) activeSection.classList.add('active');

        updateActiveNavLink();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function updateActiveNavLink() {
        const hash = window.location.hash.substring(1) || 'home';
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${hash}`);
        });
    }

    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    }

    // --- EVENT LISTENERS ---

    themeToggle.addEventListener('click', toggleTheme);

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1) || 'home';
        switchSection(hash);
    });

    // --- STARTUP ---
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    setLanguage(currentLang);
    switchSection(window.location.hash.substring(1) || 'home');
});
