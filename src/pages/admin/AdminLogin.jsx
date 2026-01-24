import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { loginAdmin } = useAdmin();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const success = await loginAdmin(username, password);
        if (success) {
            navigate('/admin/dashboard');
        } else {
            setError('Invalid credentials');
        }
        setIsSubmitting(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            padding: '1rem',
            fontFamily: '"Outfit", sans-serif'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    background: 'rgba(15, 15, 15, 0.8)',
                    backdropFilter: 'blur(20px)',
                    padding: '3rem 2rem',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{
                        color: '#fff',
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem'
                    }}>
                        Admin <span style={{ color: '#00c2ff' }}>Portal</span>
                    </h2>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Enter credentials to manage content</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#aaa', fontSize: '0.85rem', marginLeft: '10px' }}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={inputStyle}
                            placeholder="e.g. admin"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#aaa', fontSize: '0.85rem', marginLeft: '10px' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ color: '#ff4b4b', fontSize: '0.85rem', textAlign: 'center', margin: '0' }}
                        >
                            {error}
                        </motion.p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: isSubmitting ? '#333' : 'linear-gradient(90deg, #00c2ff 0%, #007bff 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#fff',
                            fontWeight: 600,
                            fontSize: '1rem',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 10px 20px rgba(0, 194, 255, 0.2)'
                        }}
                    >
                        {isSubmitting ? 'Verifying...' : 'Login'}
                    </button>
                </form>

                <p style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                    color: '#444',
                    fontSize: '0.75rem',
                    letterSpacing: '0.5px'
                }}>
                    MIPL MATRIX SECURE ACCESS
                </p>
            </motion.div>
        </div>
    );
};

const inputStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '1rem 1.2rem',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease'
};

export default AdminLogin;
