import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const useInput = (key: string) => {
    const [value, setValue] = useState(() => localStorage.getItem(`continuum_${key}`) || '');
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        localStorage.setItem(`continuum_${key}`, newValue);
    };
    return { value, onChange };
};

const AssetOverview: React.FC = () => {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);

    const assetBrought = useInput('asset_brought');
    const assetBank = useInput('asset_bank');
    const assetSecurities = useInput('asset_securities');
    const assetBvg = useInput('asset_bvg');
    const assetInsurance = useInput('asset_insurance');
    const assetMortgages = useInput('asset_mortgages');
    const assetDebts = useInput('asset_debts');

    // Checkbox persisting needs slightly different logic
    const useCheckbox = (key: string) => {
        const [checked, setChecked] = useState(() => localStorage.getItem(`continuum_${key}`) === 'true');
        const toggle = () => {
            const newChecked = !checked;
            setChecked(newChecked);
            localStorage.setItem(`continuum_${key}`, String(newChecked));
        };
        return { checked, toggle };
    };

    const digitalLegacy = useCheckbox('asset_digital');
    const funeralWishes = useCheckbox('asset_funeral');

    return (
        <div id="asset-overview" className="tool-panel active">
            <div className="tool-header" style={{ marginBottom: '40px' }}>
                <span className="step-tag">{t('tag_assets') || 'Vermögensübersicht'}</span>
                <h2>{t('title_assets') || 'Asset Overview Wizard'}</h2>
                <p style={{ opacity: 0.7, marginTop: '16px' }}>{t('desc_assets')}</p>
            </div>

            <div className="wizard-steps">
                <div className={`wizard-step ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}>{t('step_asset_1') || '01. Personal'}</div>
                <div className={`wizard-step ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}>{t('step_asset_2') || '02. Assets'}</div>
                <div className={`wizard-step ${step === 3 ? 'active' : ''}`} onClick={() => setStep(3)}>{t('step_asset_3') || '03. Liabilities'}</div>
                <div className={`wizard-step ${step === 4 ? 'active' : ''}`} onClick={() => setStep(4)}>{t('step_asset_4') || '04. Notes'}</div>
            </div>

            {step === 1 && (
                <div className="wizard-content-step active">
                    <div className="tool-section">
                        <h3>{t('subtitle_personal') || '1.1 Personal Property'}</h3>
                        <div className="form-group">
                            <label>{t('label_brought') || 'Assets brought into the marriage'}</label>
                            <input type="text" placeholder="..." {...assetBrought} />
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <button className="btn" onClick={() => setStep(2)}>Next Step</button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="wizard-content-step active">
                    <div className="tool-section">
                        <h3>{t('subtitle_assets') || '1.3 Assets'}</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group"><label>{t('label_bank') || 'Bank & Savings'}</label><input type="text" {...assetBank} /></div>
                            <div className="form-group"><label>{t('label_securities') || 'Securities'}</label><input type="text" {...assetSecurities} /></div>
                            <div className="form-group"><label>{t('label_bvg') || 'Pension Fund'}</label><input type="text" {...assetBvg} /></div>
                            <div className="form-group"><label>{t('label_insurance') || 'Insurance'}</label><input type="text" {...assetInsurance} /></div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button className="btn" onClick={() => setStep(1)}>Back</button>
                        <button className="btn" onClick={() => setStep(3)}>Next</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="wizard-content-step active">
                    <div className="tool-section">
                        <h3>{t('subtitle_liabilities') || '1.4 Liabilities'}</h3>
                        <div className="form-group"><label>{t('label_mortgages') || 'Mortgages'}</label><input type="text" {...assetMortgages} /></div>
                        <div className="form-group"><label>{t('label_debts') || 'Other Debts'}</label><input type="text" {...assetDebts} /></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button className="btn" onClick={() => setStep(2)}>Back</button>
                        <button className="btn" onClick={() => setStep(4)}>Next</button>
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="wizard-content-step active">
                    <div className="tool-section">
                        <h3>{t('subtitle_notes') || '1.5 Notes'}</h3>
                        <div className={`checklist-item ${digitalLegacy.checked ? 'checked' : ''}`} onClick={digitalLegacy.toggle}>
                            <input type="checkbox" checked={digitalLegacy.checked} readOnly style={{ display: 'none' }} />
                            <span>{t('check_digital') || 'Digital legacy'}</span>
                        </div>
                        <div className={`checklist-item ${funeralWishes.checked ? 'checked' : ''}`} onClick={funeralWishes.toggle}>
                            <input type="checkbox" checked={funeralWishes.checked} readOnly style={{ display: 'none' }} />
                            <span>{t('check_funeral') || 'Funeral wishes'}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button className="btn" onClick={() => setStep(3)}>Back</button>
                        <button className="btn" style={{ background: 'var(--accent-gold)', color: 'var(--bg-color)' }} onClick={() => alert('Saved!')}>Complete & Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssetOverview;
