import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Templates: React.FC = () => {
    const { t } = useLanguage();

    const templates = [
        { title: 'card_template_poa', desc: 'Standard legal framework.' },
        { title: 'card_template_funeral', desc: 'Wishes and arrangements.' },
        { title: 'card_template_waiver', desc: 'Official waiver document.' },
        { title: 'card_template_gift', desc: 'Framework for donations.' },
        { title: 'card_template_advance', desc: 'Framework for Vorsorgeauftrag.' },
    ];

    return (
        <div id="templates" className="tool-panel active">
            <div className="tool-header" style={{ marginBottom: '40px' }}>
                <span className="step-tag">{t('tag_templates') || 'Request Templates'}</span>
                <h2>{t('title_templates') || 'Document Library'}</h2>
            </div>
            <div className="products-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: 0 }}>
                {templates.map((tmpl, idx) => (
                    <div key={idx} className="product-card">
                        <h3>{t(tmpl.title)}</h3>
                        <p>{tmpl.desc}</p>
                        <a href="#" className="btn" style={{ fontSize: '0.7rem', padding: '10px 16px' }}>{t('btn_request') || 'Request Template'}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Templates;
