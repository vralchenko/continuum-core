let translations = {};

async function loadTranslations(lang) {
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

let currentLang = localStorage.getItem('continuum_lang') || 'en';

async function setLanguage(lang) {
    const data = await loadTranslations(lang);
    if (!data) return;

    currentLang = lang;
    document.querySelectorAll('.lang-btn').forEach(btn =>
        btn.classList.toggle('active', btn.getAttribute('onclick').includes(`'${lang}'`))
    );

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = data[key];
            } else {
                el.textContent = data[key];
            }
        }
    });
    localStorage.setItem('continuum_lang', lang);
}

// Common functions
function showSaveMsg() {
    const m = document.getElementById('save-msg');
    if (m) {
        m.textContent = translations[currentLang].save_msg || "Saved";
        m.classList.add('show');
        setTimeout(() => m.classList.remove('show'), 2000);
    }
}

function saveAll() {
    document.querySelectorAll('[data-store]').forEach(el => localStorage.setItem('continuum_' + el.getAttribute('data-store'), el.value));
    showSaveMsg();
}

function gotoStep(prefix, num) {
    const p = document.getElementById(prefix + '-overview') || document.getElementById(prefix + '-builder') || document.getElementById(prefix + '-checklist') || document.getElementById(prefix);
    if (!p) return;
    p.querySelectorAll('.wizard-content-step').forEach(s => s.classList.remove('active'));
    p.querySelectorAll('.wizard-step').forEach((s, idx) => s.classList.toggle('active', idx === num - 1));
    const target = document.getElementById(prefix + '-step-' + num);
    if (target) target.classList.add('active');
    saveAll();
}

async function includeHTML() {
    const elements = document.querySelectorAll('[data-include]');
    for (const el of elements) {
        const file = el.getAttribute('data-include');
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
    // Re-run language and storage init for new elements
    await setLanguage(currentLang);
    initStorage();
    highlightActiveNav();
}

function highlightActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;

    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const [linkPage, linkHash] = href.split('#');
        const isIndex = currentPath === 'index.html';
        const isSamePage = linkPage === currentPath || (linkPage === '' && isIndex) || (linkPage === 'index.html' && isIndex);

        let isActive = false;
        if (linkHash) {
            isActive = isSamePage && currentHash === '#' + linkHash;
        } else {
            isActive = isSamePage && !currentHash;
        }

        if (isActive) {
            link.style.color = 'var(--accent-gold)';
        } else if (!link.classList.contains('btn')) {
            link.style.color = '';
        }
    });
}

// Tool-specific UI logic
function showTool(toolId) {
    const navItems = document.querySelectorAll('.tools-nav-item');
    if (navItems.length === 0) return;

    navItems.forEach(item => item.classList.remove('active'));
    const panels = ['asset-overview', 'legal-docs', 'death-checklist', 'executor', 'will-builder', 'templates'];
    const idx = panels.indexOf(toolId);
    if (idx !== -1) navItems[idx]?.classList.add('active');

    document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(toolId);
    if (target) target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleCheck(el, key) {
    const cb = el.querySelector('input');
    if (!cb) return;
    cb.checked = !cb.checked;
    el.classList.toggle('checked', cb.checked);
    localStorage.setItem('continuum_' + key, cb.checked);
    showSaveMsg();
}

function initStorage() {
    document.querySelectorAll('[data-store]').forEach(el => {
        el.value = localStorage.getItem('continuum_' + el.getAttribute('data-store')) || '';
        el.oninput = saveAll;
    });

    document.querySelectorAll('[data-persistent]').forEach(cb => {
        const v = localStorage.getItem('continuum_' + cb.getAttribute('data-persistent'));
        if (v === 'true') {
            cb.checked = true;
            cb.closest('.checklist-item, .product-card')?.classList.add('checked');
        }
    });
}

window.addEventListener('DOMContentLoaded', async () => {
    // Start loading components
    await includeHTML();
});

window.addEventListener('hashchange', highlightActiveNav);
