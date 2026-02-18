import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LeaveBehind: React.FC = () => {
    const { t } = useLanguage();
    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState('');
    const [fileType, setFileType] = useState<'text' | 'photo' | 'video'>('text');

    const handleAddMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text && fileType === 'text') return;

        const newMessage = {
            id: Date.now(),
            type: fileType,
            content: text || (fileType === 'photo' ? 'Demo Photo Uploaded' : 'Demo Video Uploaded'),
            timestamp: new Date().toLocaleDateString()
        };

        setMessages([newMessage, ...messages]);
        setText('');
    };

    return (
        <div className="tool-panel active">
            <div className="tool-section">
                <h3>{t('p2_title') || 'Leave Behind'}</h3>
                <p className="section-desc">
                    {t('leave_behind_desc') || 'Create personal messages, videos, and photo memories to be shared with your loved ones in the future.'}
                </p>
            </div>

            <div className="step-card">
                <span className="step-tag">{t('demo_func') || 'Demo Functionality'}</span>
                <form onSubmit={handleAddMessage} className="message-form">
                    <div className="form-group">
                        <label>{t('legacy_type') || 'What would you like to leave?'}</label>
                        <select
                            value={fileType}
                            onChange={(e) => setFileType(e.target.value as any)}
                            className="demo-select"
                        >
                            <option value="text">Message / Text</option>
                            <option value="photo">Photo / Gallery</option>
                            <option value="video">Video Message</option>
                        </select>
                    </div>

                    {fileType === 'text' ? (
                        <div className="form-group">
                            <label>{t('your_message') || 'Your Message'}</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Tell your story..."
                                rows={4}
                            />
                        </div>
                    ) : (
                        <div className="upload-placeholder">
                            <div className="upload-icon">
                                {fileType === 'photo' ? '📸' : '🎥'}
                            </div>
                            <p>{fileType === 'photo' ? 'Select photos to upload' : 'Click to record or upload a video'}</p>
                            <button type="button" className="btn btn-sm">Browse Files</button>
                        </div>
                    )}

                    <button type="submit" className="btn">
                        {t('add_to_legacy') || 'Add to Legacy'}
                    </button>
                </form>
            </div>

            <div className="legacy-items">
                <h4>{t('your_legacy_vault') || 'Your Legacy Vault'}</h4>
                {messages.length === 0 ? (
                    <p className="text-muted" style={{ fontStyle: 'italic' }}>Your vault is empty. Start adding memories.</p>
                ) : (
                    <div className="legacy-grid">
                        {messages.map(m => (
                            <div key={m.id} className="legacy-item-card">
                                <div className="item-meta">
                                    <span className="item-type">{m.type}</span>
                                    <span className="item-date">{m.timestamp}</span>
                                </div>
                                <div className="item-content">
                                    {m.type === 'text' ? (
                                        <p>{m.content}</p>
                                    ) : (
                                        <div className="demo-asset">
                                            {m.type === 'photo' ? '🖼️ [Mock Photo]' : '📺 [Mock Video]'}
                                            <p className="asset-label">{m.content}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .section-desc {
                    margin-bottom: 24px;
                    color: var(--text-muted);
                }
                .message-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .upload-placeholder {
                    border: 2px dashed var(--glass-border);
                    padding: 30px;
                    text-align: center;
                    border-radius: 12px;
                    margin-bottom: 16px;
                }
                .upload-icon {
                    font-size: 2rem;
                    margin-bottom: 12px;
                }
                .demo-select {
                    width: 100%;
                    padding: 12px;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    color: var(--text-color);
                    border-radius: 4px;
                }
                .legacy-items {
                    margin-top: 40px;
                }
                .legacy-items h4 {
                    margin-bottom: 20px;
                    color: var(--accent-gold);
                }
                .legacy-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 16px;
                }
                .legacy-item-card {
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    padding: 16px;
                    border-radius: 12px;
                }
                .item-meta {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    color: var(--accent-gold);
                    margin-bottom: 12px;
                    opacity: 0.7;
                }
                .item-content {
                    font-size: 0.9rem;
                }
                .demo-asset {
                    background: rgba(0,0,0,0.2);
                    padding: 20px;
                    border-radius: 8px;
                    text-align: center;
                }
                .asset-label {
                    margin-top: 8px;
                    font-size: 0.8rem;
                    opacity: 0.8;
                }
            `}</style>
        </div>
    );
};

export default LeaveBehind;
