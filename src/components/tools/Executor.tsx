import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import usePersistedState from '../../hooks/usePersistedState';

const Executor: React.FC = () => {
    const { t } = useLanguage();

    const useCheckbox = (key: string) => {
        const [checked, setChecked] = usePersistedState<boolean>(key, false);
        return {
            checked,
            toggle: () => setChecked(!checked)
        };
    };

    const cert = useCheckbox('exec_cert');
    const assets = useCheckbox('exec_assets');
    const notif = useCheckbox('exec_notif');

    return (
        <div id="executor" className="tool-panel active">
            <div className="tool-header" style={{ marginBottom: '40px' }}>
                <span className="step-tag">{t('tag_executor') || 'Willensvollstrecker'}</span>
                <h2>{t('title_executor') || 'Executor Tasks'}</h2>
            </div>
            <div className="tool-section">
                <div className={`checklist-item ${cert.checked ? 'checked' : ''}`} onClick={cert.toggle}>
                    <input type="checkbox" checked={cert.checked} readOnly style={{ display: 'none' }} />
                    <span>{t('exec_cert_item') || 'Obtain Certificate'}</span>
                </div>
                <div className={`checklist-item ${assets.checked ? 'checked' : ''}`} onClick={assets.toggle}>
                    <input type="checkbox" checked={assets.checked} readOnly style={{ display: 'none' }} />
                    <span>{t('exec_assets_item') || 'Secure Assets'}</span>
                </div>
                <div className={`checklist-item ${notif.checked ? 'checked' : ''}`} onClick={notif.toggle}>
                    <input type="checkbox" checked={notif.checked} readOnly style={{ display: 'none' }} />
                    <span>{t('exec_notif_item') || 'Notify Authorities'}</span>
                </div>
            </div>
        </div>
    );
};

export default Executor;
