import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import usePersistedState from '../../hooks/usePersistedState';

const LegalDocs: React.FC = () => {
    const { t } = useLanguage();

    const useCheckbox = (key: string) => {
        const [checked, setChecked] = usePersistedState<boolean>(key, false);
        return {
            checked,
            toggle: () => setChecked(!checked)
        };
    };

    const livingWill = useCheckbox('legal_livingwill');
    const advanceCare = useCheckbox('legal_advance');

    return (
        <div id="legal-docs" className="tool-panel active">
            <div className="tool-header" style={{ marginBottom: '40px' }}>
                <span className="step-tag">{t('tag_legal') || 'Rechtliche Dokumente'}</span>
                <h2>{t('title_legal') || 'Legal Documents'}</h2>
            </div>
            <div className="products-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: 0 }}>
                <div className={`product-card ${livingWill.checked ? 'checked' : ''}`} onClick={livingWill.toggle} style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={livingWill.checked} readOnly style={{ display: 'none' }} />
                    <h3>{t('card_living_will') || 'Living Will'}</h3>
                    <p>{t('card_living_will_desc') || 'Regulate medical measures.'}</p>
                </div>
                <div className={`product-card ${advanceCare.checked ? 'checked' : ''}`} onClick={advanceCare.toggle} style={{ cursor: 'pointer' }}>
                    <input type="checkbox" checked={advanceCare.checked} readOnly style={{ display: 'none' }} />
                    <h3>{t('card_advance') || 'Advance Care Directive'}</h3>
                    <p>{t('card_advance_desc') || 'Matters during incapacity.'}</p>
                </div>
            </div>
        </div>
    );
};

export default LegalDocs;
