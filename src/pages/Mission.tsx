import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Mission: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="mission" className="intro section-padding full-height-section">
            <div className="container">
                <h2>{t('why_title')}</h2>
                <p>{t('why_p')}</p>
            </div>
        </section>
    );
};

export default Mission;
