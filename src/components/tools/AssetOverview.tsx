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

const useAssetList = (key: string) => {
    const [items, setItems] = useState<any[]>(() => {
        try {
            const stored = localStorage.getItem(`continuum_list_${key}`);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            return [];
        }
    });

    const addItem = (item: any) => {
        const newItems = [...items, { ...item, id: Date.now().toString() }];
        setItems(newItems);
        localStorage.setItem(`continuum_list_${key}`, JSON.stringify(newItems));
    };

    const removeItem = (id: string) => {
        const newItems = items.filter(i => i.id !== id);
        setItems(newItems);
        localStorage.setItem(`continuum_list_${key}`, JSON.stringify(newItems));
    };

    return { items, addItem, removeItem };
};

const DynamicAssetList = ({ title, itemKey }: { title: string, itemKey: string }) => {
    const { items, addItem, removeItem } = useAssetList(itemKey);
    const [isAdding, setIsAdding] = useState(false);
    const [name, setName] = useState('');
    const [value, setValue] = useState('');

    const handleAdd = () => {
        if (name) {
            addItem({ name, value });
            setName('');
            setValue('');
            setIsAdding(false);
        }
    };

    return (
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: items.length > 0 || isAdding ? '16px' : '0' }}>
                <h4 style={{ margin: 0, fontSize: '1.1em', fontWeight: 500 }}>{title}</h4>
                <button className="btn" style={{ padding: '6px 16px', fontSize: '0.85em', background: isAdding ? 'rgba(255,255,255,0.1)' : 'var(--accent-gold)', color: isAdding ? '#fff' : 'var(--bg-color)', border: 'none', borderRadius: '4px' }} onClick={() => setIsAdding(!isAdding)}>
                    {isAdding ? 'Cancel' : '+ Add'}
                </button>
            </div>

            {items.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: isAdding ? '16px' : '0' }}>
                    {items.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: 500 }}>{item.name}</span>
                                {item.value && <span style={{ fontSize: '0.9em', opacity: 0.7 }}>{item.value}</span>}
                            </div>
                            <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#ff4444', fontSize: '1.2em', cursor: 'pointer', padding: '0 8px' }}>×</button>
                        </div>
                    ))}
                </div>
            )}

            {isAdding && (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', marginTop: '16px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '6px' }}>
                    <div className="form-group" style={{ marginBottom: 0, flex: 2 }}>
                        <label style={{ fontSize: '0.85em', opacity: 0.8, marginBottom: '4px', display: 'block' }}>Description</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. UBS Savings" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
                        <label style={{ fontSize: '0.85em', opacity: 0.8, marginBottom: '4px', display: 'block' }}>Amount / Value</label>
                        <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="e.g. 50,000 CHF" onKeyDown={e => e.key === 'Enter' && handleAdd()} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff' }} />
                    </div>
                    <button className="btn" style={{ background: 'var(--accent-gold)', color: 'var(--bg-color)', height: '42px', padding: '0 16px', border: 'none', borderRadius: '4px', fontWeight: 'bold' }} onClick={handleAdd}>Save</button>
                </div>
            )}
        </div>
    );
};

const AssetOverview: React.FC = () => {
    const { t } = useLanguage();
    const [step, setStep] = useState(1);

    const assetBrought = useInput('asset_brought');
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <DynamicAssetList title={t('label_bank') || 'Bank & Savings'} itemKey="bank" />
                            <DynamicAssetList title={t('label_securities') || 'Securities'} itemKey="securities" />
                            <DynamicAssetList title={t('label_bvg') || 'Pension Fund'} itemKey="bvg" />
                            <DynamicAssetList title={t('label_insurance') || 'Insurance'} itemKey="insurance" />
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
