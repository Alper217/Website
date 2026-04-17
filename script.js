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
                <a href="https://github.com/Alper217" target="_blank" class="social-btn">
                    <i data-lucide="github"></i>
                    <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/alper-kocasalih/" target="_blank" class="social-btn">
                    <i data-lucide="linkedin"></i>
                    <span>LinkedIn</span>
                </a>
                <a href="mailto:palikarya23@gmail.com" class="social-btn">
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
            <div class="timeline-item" data-animate style="transition-delay: ${idx * 0.1}s">
                <div class="timeline-date">${exp.date} | ${t(exp.titleKey)}</div>
                <h3>${t(exp.companyKey)}</h3>
                <p>${t(exp.descKey)}</p>
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
