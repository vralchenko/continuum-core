import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../components/tools/Sidebar';
import AssetOverview from '../components/tools/AssetOverview';
import LegalDocs from '../components/tools/LegalDocs';
import DeathChecklist from '../components/tools/DeathChecklist';
import Executor from '../components/tools/Executor';
import WillBuilder from '../components/tools/WillBuilder';
import Templates from '../components/tools/Templates';
import BereavementSupport from '../components/tools/BereavementSupport';

const Tools: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialTool = searchParams.get('tool') || 'asset-overview';
    const [activeTool, setActiveTool] = useState(initialTool);

    useEffect(() => {
        const tool = searchParams.get('tool');
        if (tool) {
            setActiveTool(tool);
        }
    }, [searchParams]);

    const handleSelectTool = (tool: string) => {
        setActiveTool(tool);
        setSearchParams({ tool });
    };

    const renderTool = () => {
        switch (activeTool) {
            case 'asset-overview': return <AssetOverview />;
            case 'legal-docs': return <LegalDocs />;
            case 'death-checklist': return <DeathChecklist />;
            case 'executor': return <Executor />;
            case 'will-builder': return <WillBuilder />;
            case 'templates': return <Templates />;
            case 'bereavement-support': return <BereavementSupport />;
            default: return <AssetOverview />;
        }
    };

    return (
        <div className="tools-layout">
            <Sidebar activeTool={activeTool} onSelectTool={handleSelectTool} />
            <div className="tools-content">
                {renderTool()}
            </div>
        </div>
    );
};

export default Tools;
