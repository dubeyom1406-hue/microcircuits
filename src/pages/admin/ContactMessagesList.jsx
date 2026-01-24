import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Calendar, Trash2, Search, User, UserCheck } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const ContactMessagesList = () => {
    const { contactMessages, deleteContactMessage } = useAdmin();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = contactMessages.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            await deleteContactMessage(id);
        }
    };

    return (
        <div style={{ color: '#fff' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                    System <span style={{ color: '#FFD700' }}>Inquiries</span>
                </h1>
                <p style={{ color: '#666' }}>Manage communications and client requests.</p>
            </div>

            <div style={{ position: 'relative', marginBottom: '2.2rem' }}>
                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#444' }} size={20} />
                <input
                    type="text"
                    placeholder="Search messages..."
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {filteredMessages.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: '#444' }}>
                        No inquiries found.
                    </div>
                ) : (
                    filteredMessages.map((msg) => (
                        <motion.div
                            key={msg.id || msg._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '20px',
                                padding: '1.8rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.2rem',
                                position: 'relative'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        background: 'rgba(255, 215, 0, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FFD700',
                                        border: '1px solid rgba(255, 215, 0, 0.2)'
                                    }}>
                                        <UserCheck size={20} />
                                    </div>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{msg.name}</h4>
                                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>{msg.email}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <button
                                        onClick={() => {
                                            const msgId = msg.id || msg._id;
                                            handleDelete(msgId);
                                        }}
                                        style={{
                                            padding: '0.5rem',
                                            background: 'rgba(239, 68, 68, 0.05)',
                                            border: '1px solid rgba(239, 68, 68, 0.1)',
                                            borderRadius: '8px',
                                            color: '#ef4444',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div style={{
                                padding: '1.2rem',
                                background: 'rgba(255,255,255,0.02)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.03)',
                                fontSize: '0.95rem',
                                color: '#eee',
                                lineHeight: 1.6
                            }}>
                                <div style={{
                                    fontWeight: 700,
                                    color: '#FFD700',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.8rem',
                                    textTransform: 'uppercase'
                                }}>
                                    Message Scope:
                                </div>
                                {msg.message}
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                color: '#444',
                                fontSize: '0.8rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Calendar size={12} />
                                    {msg.date || 'Jan 22, 2026'}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Mail size={12} />
                                    Reply via Email
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContactMessagesList;
