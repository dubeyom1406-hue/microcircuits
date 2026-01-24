import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Briefcase, Calendar, Trash2, Search, Download } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const ApplicationsList = () => {
    const { applications, deleteApplication } = useAdmin();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredApps = applications.filter(app =>
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            await deleteApplication(id);
        }
    };

    return (
        <div style={{ color: '#fff' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    Job <span style={{ color: '#00c2ff' }}>Applications</span>
                </h1>
                <p style={{ color: '#666' }}>Review candidate profiles and technical backgrounds.</p>
            </div>

            <div style={{ position: 'relative', marginBottom: '2rem' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#444' }} size={20} />
                <input
                    type="text"
                    placeholder="Search by name, email or job title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem 1rem 1rem 3rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        color: '#fff',
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredApps.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '5rem', color: '#444' }}>
                        No applications found.
                    </div>
                ) : (
                    filteredApps.map((app) => (
                        <motion.div
                            key={app.id || app._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                display: 'grid',
                                gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr auto',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            <div style={{ fontWeight: 600 }}>{app.name}</div>
                            <div style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                                <Mail size={14} /> {app.email}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#00c2ff' }}>
                                <Briefcase size={14} /> {app.jobTitle}
                            </div>
                            <div style={{ color: '#555', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                                <Calendar size={14} /> {app.date || 'Today'}
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {app.resumeUrl && (
                                    <a
                                        href={`http://localhost:5000${app.resumeUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={smallIconButtonStyle('#22c55e')}
                                        title="View/Download Resume"
                                    >
                                        <Download size={16} />
                                    </a>
                                )}
                                <button
                                    onClick={() => handleDelete(app.id || app._id)}
                                    style={smallIconButtonStyle('#ef4444')}
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

const smallIconButtonStyle = (color) => ({
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: `${color}10`,
    border: `1px solid ${color}20`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
});

export default ApplicationsList;
