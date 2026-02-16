import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface SidebarProps {
    activeTool: string;
    onSelectTool: (tool: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, onSelectTool }) => {
    const { t } = useLanguage();

    return (
        <aside className="tools-sidebar">
            <div className="tools-nav">
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
                <div className={`tools-nav-item bereavement-nav ${activeTool === 'bereavement-support' ? 'active' : ''}`} onClick={() => onSelectTool('bereavement-support')}>
                    {t('nav_bereavement') || 'Bereavement Support'}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
