import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import innaImg from '../assets/images/inna.png';
import olgaImg from '../assets/images/olga.png';
import viktorImg from '../assets/images/viktor.png';

const Team: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="team" className="founders section-padding full-height-section">
            <div className="container">
                <h2>{t('team_title') || 'Visionaries'}</h2>
                <div className="founder-names">
                    <div className="founder">
                        <img src={innaImg} alt="Dr. Inna Praxmarer" className="founder-img" />
                        <h3>Dr. Inna Praxmarer</h3>
                        <span>Co-Founder</span>
                    </div>
                    <div className="founder">
                        <img src={olgaImg} alt="Olga Sushchinskaya" className="founder-img" />
                        <h3>Olga Sushchinskaya</h3>
                        <span>Co-Founder</span>
                    </div>
                    <div className="founder">
                        <img src={viktorImg} alt="Viktor Ralchenko" className="founder-img" />
                        <h3>Viktor Ralchenko</h3>
                        <span>Co-Founder</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
