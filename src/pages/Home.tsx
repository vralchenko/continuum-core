import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import heroBg from '../assets/images/hero-bg.png';

const Home: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="hero">
            <img src={heroBg} alt="Abstract Lines" className="hero-bg" />
            <div className="container">
                <div className="hero-content">
                    <h1>{t('hero_h1')}</h1>
                    <p>{t('hero_p')}</p>
                    <Link to="/products" className="btn">{t('hero_btn')}</Link>
                </div>
            </div>
        </section>
    );
};

export default Home;
