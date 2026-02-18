import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

interface SidebarProps {
    activeTool: string;
    onSelectTool: (tool: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, onSelectTool }) => {
    const { t } = useLanguage();

    return (
        <aside className="tools-sidebar">
            <div className="sidebar-header">
                <Link to="/" className="back-home-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    {t('back_home') || 'Back Home'}
                </Link>
            </div>

            <div className="tools-nav">
                <div className="nav-group">
                    <div className="group-title">{t('p1_title') || 'Be Ready'}</div>
                    <div className={`tools-nav-item ${activeTool === 'asset-overview' ? 'active' : ''}`} onClick={() => onSelectTool('asset-overview')}>
                        01. {t('tag_assets') || 'Asset Overview'}
                    </div>
                    <div className={`tools-nav-item ${activeTool === 'legal-docs' ? 'active' : ''}`} onClick={() => onSelectTool('legal-docs')}>
                        02. {t('tag_legal') || 'Legal Framework'}
                    </div>
                    <div className={`tools-nav-item ${activeTool === 'death-checklist' ? 'active' : ''}`} onClick={() => onSelectTool('death-checklist')}>
                        03. {t('tag_checklist') || 'Step-by-Step Guide'}
                    </div>
                    <div className={`tools-nav-item ${activeTool === 'executor' ? 'active' : ''}`} onClick={() => onSelectTool('executor')}>
                        04. {t('tag_executor') || 'Executor Tasks'}
                    </div>
                    <div className={`tools-nav-item ${activeTool === 'will-builder' ? 'active' : ''}`} onClick={() => onSelectTool('will-builder')}>
                        05. {t('tag_will') || 'Will Structure'}
                    </div>
                    <div className={`tools-nav-item ${activeTool === 'templates' ? 'active' : ''}`} onClick={() => onSelectTool('templates')}>
                        06. {t('tag_templates') || 'Request Templates'}
                    </div>
                </div>

                <div className="nav-group">
                    <div className="group-title">{t('p2_title') || 'Leave Behind'}</div>
                    <div className={`tools-nav-item ${activeTool === 'leave-behind' ? 'active' : ''}`} onClick={() => onSelectTool('leave-behind')}>
                        {t('tag_legacy') || 'Digital Legacy'}
                    </div>
                </div>

                <div className="nav-group">
                    <div className="group-title">{t('p3_title') || 'Be Honored'}</div>
                    <div className={`tools-nav-item bereavement-nav ${activeTool === 'bereavement-support' ? 'active' : ''}`} onClick={() => onSelectTool('bereavement-support')}>
                        {t('nav_bereavement') || 'Bereavement Support'}
                    </div>
                </div>
            </div>

            <style>{`
                .sidebar-header {
                    margin-bottom: 24px;
                    padding-bottom: 16px;
                    border-bottom: 1px solid var(--glass-border);
                }
                .back-home-link {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.8rem;
                    color: var(--accent-gold);
                    opacity: 0.8;
                    transition: opacity 0.3s;
                }
                .back-home-link:hover {
                    opacity: 1;
                }
                .nav-group {
                    margin-bottom: 24px;
                }
                .group-title {
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--text-muted);
                    margin-bottom: 12px;
                    padding-left: 16px;
                }
                .bereavement-nav {
                    margin-top: 0 !important;
                    border-top: none !important;
                    padding-top: 12px !important;
                }
                .tools-nav-item {
                    display: block;
                    width: 100%;
                }
            `}</style>
        </aside>
    );
};

export default Sidebar;
