import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';

const ProtectedRoute = ({ children }) => {
    const { isAdmin: isAuthenticated, loading } = useAdmin();

    if (loading) {
        return (
            <div style={{
                height: '100vh',
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                gap: '1.5rem',
                fontFamily: 'sans-serif',
                textAlign: 'center',
                padding: '2rem'
            }}>
                <div className="loader" style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(255,255,255,0.1)',
                    borderTopColor: '#00c2ff',
                    borderRadius: '50%',
                    animation: 'spin 1.2s linear infinite'
                }}></div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <p style={{ letterSpacing: '2px', opacity: 0.6, fontSize: '0.8rem', fontWeight: 600 }}>ADMIN MATRIX INITIALIZING v4.5.1</p>
                <p style={{ fontSize: '0.75rem', color: '#444', marginTop: '1rem' }}>Strict Security Mode: ON</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
