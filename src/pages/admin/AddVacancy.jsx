import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Send } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AddVacancy = () => {
    const [formData, setFormData] = useState({
        title: '',
        exp: '',
        location: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const { addVacancy } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            await addVacancy(formData);
            setMessage({ type: 'success', text: 'Job opportunity posted successfully!' });
            setFormData({ title: '', exp: '', location: '', description: '' });
            setTimeout(() => navigate('/admin/dashboard'), 2000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to post vacancy' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '900px' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
                    Post <span style={{ color: '#00c2ff' }}>New Vacancy</span>
                </h1>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Recruit technical excellence for the future of semiconductor design.</p>
            </div>

            <form onSubmit={handleSubmit} style={{
                background: 'rgba(15, 15, 15, 0.4)',
                padding: '3rem',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}>
                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Opportunity Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Senior Analog Design Lead"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Experience Commitment</label>
                        <input
                            type="text"
                            placeholder="e.g. 8-12 Years"
                            value={formData.exp}
                            onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
                            required
                            style={inputStyle}
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Primary Location</label>
                        <input
                            type="text"
                            placeholder="e.g. Bangalore | Remote"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Role Scope & Requirements</label>
                    <textarea
                        placeholder="Detail the technical responsibilities and candidate profile expectations..."
                        rows={6}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        style={{ ...inputStyle, resize: 'vertical' }}
                    />
                </div>

                {message.text && (
                    <div
                        style={{
                            padding: '1rem',
                            borderRadius: '12px',
                            background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                            border: `1px solid ${message.type === 'success' ? '#22c55e' : '#ef4444'}`,
                            color: message.type === 'success' ? '#22c55e' : '#ef4444',
                            textAlign: 'center',
                            fontWeight: 600
                        }}
                    >
                        {message.text}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/dashboard')}
                        style={{
                            padding: '1.2rem 2rem',
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            color: '#aaa',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            flex: 1,
                            padding: '1.2rem',
                            background: isSubmitting ? '#222' : 'linear-gradient(90deg, #00c2ff 0%, #007bff 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 30px rgba(0, 194, 255, 0.2)'
                        }}
                    >
                        <Send size={20} />
                        {isSubmitting ? 'Posting...' : 'Open Vacancy'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.6rem' };
const labelStyle = { color: '#aaa', fontSize: '0.9rem', fontWeight: 500, marginLeft: '4px' };
const inputStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '1rem 1.2rem',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit'
};


export default AddVacancy;
