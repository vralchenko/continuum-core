import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={isMenuOpen ? 'menu-open' : ''}>
            <div className="container">
                <nav>
                    <div className="logo"><Link to="/" onClick={closeMenu}>{t('logo') || 'Continuum'}</Link></div>

                    <div className="mobile-toggle" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>

                    <div className={`nav-container ${isMenuOpen ? 'active' : ''}`}>
                        <div className="lang-switcher">
                            <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => { setLanguage('en'); closeMenu(); }}>EN</button>
                            <button className={`lang-btn ${language === 'de' ? 'active' : ''}`} onClick={() => { setLanguage('de'); closeMenu(); }}>DE</button>
                            <button className={`lang-btn ${language === 'ru' ? 'active' : ''}`} onClick={() => { setLanguage('ru'); closeMenu(); }}>RU</button>
                            <button className={`lang-btn ${language === 'ua' ? 'active' : ''}`} onClick={() => { setLanguage('ua'); closeMenu(); }}>UA</button>
                        </div>

                        <div className="nav-links">
                            <NavLink to="/mission" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>{t('nav_mission') || 'Mission'}</NavLink>
                            <NavLink to="/tools" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>{t('nav_tools') || 'Tools'}</NavLink>
                            <NavLink to="/team" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>{t('nav_team') || 'Team'}</NavLink>
                        </div>

                        <div className="header-right">
                            <Link to="/contact" onClick={closeMenu} className="btn header-btn">{t('nav_contact') || 'Get in Touch'}</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
