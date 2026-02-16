import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" className="cta section-padding full-height-section">
            <div className="container">
                <h2>{t('cta_h2')}</h2>
                <p>{t('cta_p')}</p>
                <a href="mailto:contact@continuum.example" className="btn">{t('cta_btn')}</a>
            </div>
        </section>
    );
};

export default Contact;
