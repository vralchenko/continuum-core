
interface Translations {
    [key: string]: {
        [key: string]: string;
    };
}

let translations: { [lang: string]: any } = {};
let currentLang: string = localStorage.getItem('continuum_lang') || 'en';
let currentTheme: string = localStorage.getItem('continuum_theme') || 'dark';

async function loadTranslations(lang: string): Promise<any> {
    if (translations[lang]) return translations[lang];
    try {
        const response = await fetch(`assets/locales/${lang}.json`);
        translations[lang] = await response.json();
        return translations[lang];
    } catch (e) {
        console.error(`Failed to load translations for ${lang}`, e);
        return null;
    }
}

async function setLanguage(lang: string): Promise<void> {
    const data = await loadTranslations(lang);
    if (!data) return;

    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const onclick = btn.getAttribute('onclick');
        if (onclick && onclick.includes(`'${lang}'`)) {
            btn.classList.add('active');
        } else if (!btn.id.includes('theme')) {
            btn.classList.remove('active');
        }
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key && data[key]) {
            if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
                el.placeholder = data[key];
            } else {
                el.textContent = data[key];
            }
        }
    });
    localStorage.setItem('continuum_lang', lang);
}

function showSaveMsg(): void {
    const m = document.getElementById('save-msg');
    if (m) {
        m.textContent = (translations[currentLang] && translations[currentLang].save_msg) || "Saved";
        m.classList.add('show');
        setTimeout(() => m.classList.remove('show'), 2000);
    }
}

function saveAll(): void {
    document.querySelectorAll('[data-store]').forEach(el => {
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
            const storeKey = el.getAttribute('data-store');
            if (storeKey) localStorage.setItem('continuum_' + storeKey, el.value);
        }
    });
    showSaveMsg();
}

function gotoStep(prefix: string, num: number): void {
    const p = document.getElementById(prefix + '-overview') ||
        document.getElementById(prefix + '-builder') ||
        document.getElementById(prefix + '-checklist') ||
        document.getElementById(prefix);
    if (!p) return;

    p.querySelectorAll('.wizard-content-step').forEach(s => s.classList.remove('active'));
    p.querySelectorAll('.wizard-step').forEach((s, idx) => s.classList.toggle('active', idx === num - 1));

    const target = document.getElementById(prefix + '-step-' + num);
    if (target) target.classList.add('active');
    saveAll();
}

async function includeHTML(): Promise<void> {
    const elements = document.querySelectorAll('[data-include]');
    for (const el of Array.from(elements)) {
        const file = el.getAttribute('data-include');
        if (!file) continue;
        try {
            const response = await fetch(file);
            if (response.ok) {
                el.insertAdjacentHTML('afterbegin', await response.text());
                el.removeAttribute('data-include');
            }
        } catch (e) {
            console.error(`Error loading component ${file}`, e);
        }
    }
    await setLanguage(currentLang);
    initStorage();
    highlightActiveNav();
    applyTheme(currentTheme);
}

function highlightActiveNav(): void {
    const normalize = (p: string) => {
        const part = p.split('/').pop() || '';
        return part.replace('.html', '') || 'index';
    };

    const currentPath = normalize(window.location.pathname);
    const currentHash = window.location.hash;

    document.querySelectorAll('.nav-links a').forEach(el => {
        const link = el as HTMLAnchorElement;
        const href = link.getAttribute('href');
        if (!href) return;

        const [rawLinkPage, linkHash] = href.split('#');
        // Handle explicit empty link page (href="#section") which implies current page
        // But here we normalize empty to 'index'.
        // If rawLinkPage is empty string, it means the href started with #.
        let linkPage = normalize(rawLinkPage);

        // If href was exactly "#...", normalize("") -> "index".
        // But if we are on "products", matching "index" is wrong.
        // It implies "current page".
        if (rawLinkPage === '' && href.startsWith('#')) {
            linkPage = currentPath;
        }

        let isActive = false;
        if (linkHash) {
            isActive = (linkPage === currentPath) && (currentHash === '#' + linkHash);
        } else {
            isActive = linkPage === currentPath;
        }

        if (isActive) {
            link.classList.add('active');
            link.style.color = '';
        } else if (!link.classList.contains('btn')) {
            link.classList.remove('active');
            link.style.color = '';
        }
    });
}

function showTool(toolId: string): void {
    const navItems = document.querySelectorAll('.tools-nav-item');
    if (navItems.length === 0) return;

    navItems.forEach(item => item.classList.remove('active'));
    const panels = ['asset-overview', 'legal-docs', 'death-checklist', 'executor', 'will-builder', 'templates', 'bereavement-support'];
    const idx = panels.indexOf(toolId);
    if (idx !== -1) navItems[idx]?.classList.add('active');

    document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(toolId);
    if (target) target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleCheck(el: HTMLElement, key: string): void {
    const cb = el.querySelector('input');
    if (!cb) return;
    cb.checked = !cb.checked;
    el.classList.toggle('checked', cb.checked);
    localStorage.setItem('continuum_' + key, String(cb.checked));
    showSaveMsg();
}

function initStorage(): void {
    document.querySelectorAll('[data-store]').forEach(el => {
        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
            const storeKey = el.getAttribute('data-store');
            if (storeKey) {
                el.value = localStorage.getItem('continuum_' + storeKey) || '';
                el.oninput = () => saveAll();
            }
        }
    });

    document.querySelectorAll('[data-persistent]').forEach(el => {
        const cb = el as HTMLInputElement;
        const persistentKey = cb.getAttribute('data-persistent');
        if (persistentKey) {
            const v = localStorage.getItem('continuum_' + persistentKey);
            if (v === 'true') {
                cb.checked = true;
                cb.closest('.checklist-item, .product-card')?.classList.add('checked');
            }
        }
    });
}

function toggleTheme(): void {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('continuum_theme', currentTheme);
}

function applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        // Show the theme we will switch TO, not the current theme
        themeBtn.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }
}

// Exposure to window for HTML onclicks
(window as any).setLanguage = setLanguage;
(window as any).showTool = showTool;
(window as any).toggleCheck = toggleCheck;
(window as any).gotoStep = gotoStep;
(window as any).toggleTheme = toggleTheme;

window.addEventListener('DOMContentLoaded', async () => {
    await includeHTML();
    const urlParams = new URLSearchParams(window.location.search);
    const tool = urlParams.get('tool');
    if (tool) {
        setTimeout(() => showTool(tool), 100);
    }
});

window.addEventListener('hashchange', highlightActiveNav);
