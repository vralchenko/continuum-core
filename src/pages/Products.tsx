import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import productsBg from '../assets/images/products-bg.png';

const Products: React.FC = () => {
    const { t } = useLanguage();

    return (
        <main>
            <section className="tech-stack section-padding">
                <div className="container">
                    <div className="tech-grid">
                        <div className="tech-item">
                            <h4>{t('tech_1') || 'Secure Cloud Storage'}</h4>
                            <p>{t('tech_1_sub') || 'Privacy & Data Protection'}</p>
                        </div>
                        <div className="tech-item">
                            <h4>{t('tech_2') || 'AI-Powered Content'}</h4>
                            <p>{t('tech_2_sub') || 'Voice, Text & Personalization'}</p>
                        </div>
                        <div className="tech-item">
                            <h4>{t('tech_3') || 'Immersive Web'}</h4>
                            <p>{t('tech_3_sub') || '3D Environments & Experience'}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="products" className="products section-padding">
                <img src={productsBg} alt="Abstract Geometry" className="products-bg" />
                <div className="container">
                    <div className="heading-block" style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <h2>{t('eco_title') || 'Our Ecosystem'}</h2>
                        <p>{t('eco_subtitle') || 'A complete digital platform for every stage.'}</p>
                    </div>

                    <div className="products-grid">
                        <div className="product-card">
                            <div className="product-card-header">
                                <span className="card-number">01</span>
                                <h3>{t('p1_title') || 'Be Ready'}</h3>
                                <div className="product-tag">{t('p1_tag') || 'Preparation & Structure'}</div>
                            </div>
                            <p>{t('p1_desc')}</p>
                            <Link to="/tools" className="btn" style={{ fontSize: '0.7rem', padding: '10px 20px' }}>
                                {t('p1_btn') || 'Launch Tools'}
                            </Link>
                        </div>

                        <div className="product-card">
                            <div className="product-card-header">
                                <span className="card-number">02</span>
                                <h3>{t('p2_title') || 'Leave Behind'}</h3>
                                <div className="product-tag">{t('p2_tag') || 'Conscious Legacy'}</div>
                            </div>
                            <p>{t('p2_desc')}</p>
                        </div>

                        <div className="product-card">
                            <div className="product-card-header">
                                <span className="card-number">03</span>
                                <h3>{t('p3_title') || 'Be Honored'}</h3>
                                <div className="product-tag">{t('p3_tag') || 'Dignified Remembrance'}</div>
                            </div>
                            <p>{t('p3_desc')}</p>
                            <Link to="/tools?tool=bereavement-support" className="btn" style={{ fontSize: '0.7rem', padding: '10px 20px' }}>
                                {t('nav_bereavement') || 'Bereavement Support'}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Products;
