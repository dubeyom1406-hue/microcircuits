import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AddCaseStudy = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        pdfUrl: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const { addCaseStudy } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            await addCaseStudy(formData);
            setMessage({ type: 'success', text: 'Case study published successfully!' });
            setFormData({ title: '', category: '', description: '', pdfUrl: '' });
            setTimeout(() => navigate('/admin/dashboard'), 2000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add case study' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '900px' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
                    Publish <span style={{ color: '#a855f7' }}>Case Study</span>
                </h1>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Enter the technical details to showcase a new breakthrough.</p>
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
                    <label style={labelStyle}>Case Study Title</label>
                    <input
                        type="text"
                        placeholder="e.g. Next-Gen 5G Baseband Processor Design"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Vertical Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                            style={inputStyle}
                        >
                            <option value="" disabled>Select Category</option>
                            <option value="Design For Testability">Design For Testability</option>
                            <option value="Physical Design">Physical Design</option>
                            <option value="Design & Verification">Design & Verification</option>
                            <option value="Semiconductor News">Semiconductor News</option>
                        </select>
                    </div>

                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Documentation URL (PDF)</label>
                        <input
                            type="text"
                            placeholder="https://drive.google.com/..."
                            value={formData.pdfUrl}
                            onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div style={inputGroupStyle}>
                    <label style={labelStyle}>Detailed Summary</label>
                    <textarea
                        placeholder="Provide a high-level overview of the technical achievements..."
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
                        Discard
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            flex: 1,
                            padding: '1.2rem',
                            background: isSubmitting ? '#222' : 'linear-gradient(90deg, #a855f7 0%, #7c3aed 100%)',
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
                            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.2)'
                        }}
                    >
                        <Save size={20} />
                        {isSubmitting ? 'Processing...' : 'Publish Breakdown'}
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


export default AddCaseStudy;
