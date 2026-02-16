import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import usePersistedState from '../../hooks/usePersistedState';

const BereavementSupport: React.FC = () => {
    const { t } = useLanguage();

    const useCheckbox = (key: string) => {
        const [checked, setChecked] = usePersistedState<boolean>(key, false);
        return {
            checked,
            toggle: () => setChecked(!checked)
        };
    };

    const berMeaningful = useCheckbox('ber_meaningful');
    const berComm = useCheckbox('ber_comm');
    const berPrep = useCheckbox('ber_prep');
    const berSpace = useCheckbox('ber_space');
    const berSupport = useCheckbox('ber_support');
    const berSelfcare = useCheckbox('ber_selfcare');

    return (
        <div id="bereavement-support" className="tool-panel active">
            <div className="tool-header" style={{ marginBottom: '40px' }}>
                <span className="step-tag">{t('tag_bereavement') || 'Healing & Support'}</span>
                <h2>{t('title_bereavement') || 'Bereavement Path'}</h2>
                <p style={{ opacity: 0.7, marginTop: '16px' }}>{t('desc_bereavement') || 'A supportive guide for those left behind, focusing on emotional well-being and practical steps for healing.'}</p>
            </div>

            <div className="step-container">
                {/* Anticipatory Grief Section */}
                <div className="step-card" style={{ borderLeft: '4px solid var(--accent-gold)', background: 'rgba(255, 215, 0, 0.05)' }}>
                    <h3 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>{t('ber_anticipatory_title') || 'Anticipatory Grief'}</h3>
                    <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>{t('ber_anticipatory_desc') || 'Support and preparation when a loss is expected.'}</p>
                    <div className={`checklist-item ${berMeaningful.checked ? 'checked' : ''}`} onClick={berMeaningful.toggle}>
                        <input type="checkbox" checked={berMeaningful.checked} readOnly style={{ display: 'none' }} />
                        <span>{t('check_meaningful') || 'Create meaningful moments together'}</span>
                    </div>
                    <div className={`checklist-item ${berComm.checked ? 'checked' : ''}`} onClick={berComm.toggle}>
                        <input type="checkbox" checked={berComm.checked} readOnly style={{ display: 'none' }} />
                        <span>{t('check_open_comm') || 'Open heart communication'}</span>
                    </div>
                    <div className={`checklist-item ${berPrep.checked ? 'checked' : ''}`} onClick={berPrep.toggle}>
                        <input type="checkbox" checked={berPrep.checked} readOnly style={{ display: 'none' }} />
                        <span>{t('check_emotional_prep') || 'Emotional and spiritual preparation'}</span>
                    </div>
                </div>

                <div className="step-card">
                    <h3 style={{ color: 'var(--accent-gold)', marginBottom: '20px' }}>Emotional First Aid (After Loss)</h3>
                    <div className={`checklist-item ${berSpace.checked ? 'checked' : ''}`} onClick={berSpace.toggle}>
                        <input type="checkbox" checked={berSpace.checked} readOnly style={{ display: 'none' }} />
                        <span>Create a dedicated space for grief and reflection</span>
                    </div>
                    <div className={`checklist-item ${berSupport.checked ? 'checked' : ''}`} onClick={berSupport.toggle}>
                        <input type="checkbox" checked={berSupport.checked} readOnly style={{ display: 'none' }} />
                        <span>Reach out to a grief counselor or support group</span>
                    </div>
                    <div className={`checklist-item ${berSelfcare.checked ? 'checked' : ''}`} onClick={berSelfcare.toggle}>
                        <input type="checkbox" checked={berSelfcare.checked} readOnly style={{ display: 'none' }} />
                        <span>Prioritize self-care and basic physical needs</span>
                    </div>
                </div>

                <div className="step-card">
                    <h3 style={{ color: 'var(--accent-gold)', marginBottom: '20px' }}>Shared Legacy</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '20px' }}>Access the messages and values left behind to find strength and guidance.</p>
                    <div className="product-card" style={{ padding: '20px', border: '1px dashed rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                        <h4 style={{ marginBottom: '10px' }}>Listen to Voice Messages</h4>
                        <p style={{ fontSize: '0.8rem' }}>Access the private archive of audio guidance.</p>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '40px', padding: '30px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', textAlign: 'center' }}>
                <h3 style={{ marginBottom: '16px' }}>Need Professional Help?</h3>
                <p style={{ marginBottom: '24px', opacity: 0.7 }}>We have partnered with leading grief counselors to provide 24/7 support.</p>
                <a href="#" className="btn" style={{ background: 'white', color: 'black' }}>Connect with a Specialist</a>
            </div>
        </div>
    );
};

export default BereavementSupport;
