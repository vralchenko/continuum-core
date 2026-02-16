import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import usePersistedState from '../../hooks/usePersistedState';

const DeathChecklist: React.FC = () => {
    const { t } = useLanguage();

    const useCheckbox = (key: string) => {
        const [checked, setChecked] = usePersistedState<boolean>(key, false);
        return {
            checked,
            toggle: () => setChecked(!checked) // usePersistedState hook saves automatically
        };
    };

    const doc = useCheckbox('check_doc');
    const family = useCheckbox('check_family');
    const registry = useCheckbox('check_registry');

    return (
        <div id="death-checklist" className="tool-panel active">
            <div className="tool-header" style={{ marginBottom: '40px' }}>
                <span className="step-tag">{t('tag_checklist') || 'Checkliste Todesfall'}</span>
                <h2>{t('title_checklist') || 'Step-by-Step Guide'}</h2>
            </div>
            <div className="step-container">
                <div className="step-card">
                    <h3>{t('phase_1') || 'Phase 1: Immediate'}</h3>
                    <div className={`checklist-item ${doc.checked ? 'checked' : ''}`} onClick={doc.toggle}>
                        <input type="checkbox" checked={doc.checked} readOnly style={{ display: 'none' }} />
                        <span>{t('check_doc_item') || 'Call Doctor'}</span>
                    </div>
                    <div className={`checklist-item ${family.checked ? 'checked' : ''}`} onClick={family.toggle}>
                        <input type="checkbox" checked={family.checked} readOnly style={{ display: 'none' }} />
                        <span>{t('check_family_item') || 'Inform Family'}</span>
                    </div>
                </div>
                <div className="step-card">
                    <h3>{t('phase_2') || 'Phase 2: Formalities'}</h3>
                    <div className={`checklist-item ${registry.checked ? 'checked' : ''}`} onClick={registry.toggle}>
                        <input type="checkbox" checked={registry.checked} readOnly style={{ display: 'none' }} />
                        <span>{t('check_registry_item') || 'Registry Office'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeathChecklist;
