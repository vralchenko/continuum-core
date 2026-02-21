import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import usePersistedState from '../hooks/usePersistedState';

interface Document {
    id: string;
    title: string;
    type: string;
    icon: string;
    createdAt: string;
    status: 'draft' | 'ready' | 'filed';
    data: Record<string, string>;
}

const STATUS_STYLES = {
    draft: { label: 'Draft', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    ready: { label: 'Ready', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    filed: { label: 'Filed', color: '#6fcf97', bg: 'rgba(111,207,151,0.12)' },
};

// Built-in demo documents
const DEMO_DOCS: Document[] = [
    {
        id: 'demo1',
        title: 'Living Will Template',
        type: 'Living Will',
        icon: '🏥',
        createdAt: '21.02.2026',
        status: 'ready',
        data: { note: 'Sample document — fill in the Legal Framework section to personalize.' }
    },
    {
        id: 'demo2',
        title: 'Power of Attorney — Draft',
        type: 'Power of Attorney',
        icon: '⚖️',
        createdAt: '21.02.2026',
        status: 'draft',
        data: { note: 'Use the Request Templates wizard (section 06) to fill this in step-by-step.' }
    },
];

const Documents: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [docs] = usePersistedState<Document[]>('saved_documents', DEMO_DOCS);
    const [filter, setFilter] = useState<'all' | Document['status']>('all');
    const [viewing, setViewing] = useState<Document | null>(null);

    const filtered = filter === 'all' ? docs : docs.filter(d => d.status === filter);

    const counts = {
        all: docs.length,
        draft: docs.filter(d => d.status === 'draft').length,
        ready: docs.filter(d => d.status === 'ready').length,
        filed: docs.filter(d => d.status === 'filed').length,
    };

    return (
        <div style={{ minHeight: '100vh', padding: '100px 0 60px' }}>
            <div className="container">
                {/* Header */}
                <div style={{ marginBottom: '48px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.8 }}>Document Archive</span>
                    <h1 style={{ fontSize: '2.8rem', marginTop: '8px', marginBottom: '12px', background: 'linear-gradient(to right, #fff, var(--accent-gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        Your Documents
                    </h1>
                    <p style={{ opacity: 0.6, maxWidth: '560px' }}>
                        All your completed templates, legal documents, and saved forms in one place. Download, print, or update them at any time.
                    </p>
                </div>

                {/* Stats + filters */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
                    {(['all', 'draft', 'ready', 'filed'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '8px 18px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.12)',
                                background: filter === f ? 'rgba(255,215,0,0.1)' : 'transparent',
                                color: filter === f ? 'var(--accent-gold)' : 'var(--text-muted)',
                                fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s', fontWeight: filter === f ? 700 : 400
                            }}
                        >
                            {f === 'all' ? 'All' : STATUS_STYLES[f]?.label} ({counts[f]})
                        </button>
                    ))}
                    <button
                        onClick={() => navigate('/tools?tool=templates')}
                        style={{
                            marginLeft: 'auto', padding: '8px 20px', borderRadius: '20px',
                            border: '1px solid var(--accent-gold)', background: 'rgba(255,215,0,0.08)',
                            color: 'var(--accent-gold)', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700
                        }}
                    >
                        + Create New Document
                    </button>
                </div>

                {/* Documents grid */}
                {filtered.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 20px', opacity: 0.4 }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📄</div>
                        <p style={{ fontStyle: 'italic' }}>No documents yet. Use the Templates wizard to create your first document.</p>
                        <button
                            onClick={() => navigate('/tools?tool=templates')}
                            className="btn"
                            style={{ marginTop: '20px' }}
                        >
                            Open Templates →
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                        {filtered.map(doc => {
                            const statusStyle = STATUS_STYLES[doc.status];
                            return (
                                <div
                                    key={doc.id}
                                    onClick={() => setViewing(doc)}
                                    style={{
                                        padding: '24px', borderRadius: '16px', cursor: 'pointer',
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        transition: 'all 0.25s', display: 'flex', flexDirection: 'column'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.borderColor = 'rgba(255,215,0,0.2)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <span style={{ fontSize: '2rem' }}>{doc.icon}</span>
                                        <span style={{
                                            fontSize: '0.72rem', padding: '3px 10px', borderRadius: '12px',
                                            background: statusStyle.bg, color: statusStyle.color,
                                            border: `1px solid ${statusStyle.color}30`
                                        }}>
                                            {statusStyle.label}
                                        </span>
                                    </div>
                                    <h3 style={{ fontSize: '1.05rem', marginBottom: '6px', color: '#fff' }}>{doc.title}</h3>
                                    <p style={{ fontSize: '0.8rem', opacity: 0.45, marginBottom: '16px', flex: 1 }}>{doc.type}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.72rem', opacity: 0.3 }}>{doc.createdAt}</span>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={e => { e.stopPropagation(); window.print(); }}
                                                style={{ padding: '5px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', cursor: 'pointer' }}
                                            >
                                                🖨 Print
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Quick links */}
                <div style={{ marginTop: '60px', padding: '32px', borderRadius: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ marginBottom: '6px', fontSize: '1.1rem' }}>Need to create a document?</h3>
                        <p style={{ opacity: 0.5, fontSize: '0.85rem' }}>Use our step-by-step wizards to generate legal document drafts.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button onClick={() => navigate('/tools?tool=templates')} className="btn" style={{ fontSize: '0.8rem' }}>Open Templates</button>
                        <button onClick={() => navigate('/tools?tool=legal-docs')} className="btn" style={{ fontSize: '0.8rem' }}>Legal Framework</button>
                        <button onClick={() => navigate('/tools?tool=will-builder')} className="btn" style={{ fontSize: '0.8rem' }}>Will Builder</button>
                    </div>
                </div>
            </div>

            {/* View modal */}
            {viewing && (
                <div
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(8px)' }}
                    onClick={() => setViewing(null)}
                >
                    <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '520px', background: '#0d1117', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span style={{ fontSize: '1.8rem' }}>{viewing.icon}</span>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{viewing.title}</h3>
                                <div style={{ fontSize: '0.78rem', opacity: 0.45 }}>{viewing.type} · {viewing.createdAt}</div>
                            </div>
                            <button onClick={() => setViewing(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        </div>
                        <div style={{ padding: '24px' }}>
                            <div style={{ opacity: 0.65, fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                                {viewing.data.note || 'This document has been saved to your archive.'}
                            </div>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <button onClick={() => window.print()} style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>🖨 Print</button>
                                <button onClick={() => { navigate('/tools?tool=templates'); setViewing(null); }} style={{ padding: '10px 20px', borderRadius: '10px', border: 'none', background: 'var(--accent-gold)', color: '#000', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 }}>Edit in Wizard</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Documents;
