import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Header: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <header>
            <div className="container">
                <nav>
                    <div className="logo"><Link to="/">{t('logo') || 'Continuum'}</Link></div>

                    <div className="lang-switcher">
                        <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
                        <button className={`lang-btn ${language === 'de' ? 'active' : ''}`} onClick={() => setLanguage('de')}>DE</button>
                        <button className={`lang-btn ${language === 'ru' ? 'active' : ''}`} onClick={() => setLanguage('ru')}>RU</button>
                        <button className={`lang-btn ${language === 'ua' ? 'active' : ''}`} onClick={() => setLanguage('ua')}>UA</button>
                    </div>

                    <div className="nav-links">
                        <NavLink to="/mission" className={({ isActive }) => isActive ? 'active' : ''}>{t('nav_mission') || 'Mission'}</NavLink>
                        <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>{t('nav_products') || 'Products'}</NavLink>
                        <NavLink to="/tools" className={({ isActive }) => isActive ? 'active' : ''}>{t('nav_tools') || 'Tools'}</NavLink>
                        <NavLink to="/team" className={({ isActive }) => isActive ? 'active' : ''}>{t('nav_team') || 'Team'}</NavLink>
                    </div>

                    <div className="header-right">
                        <Link to="/contact" className="btn header-btn">{t('nav_contact') || 'Get in Touch'}</Link>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
