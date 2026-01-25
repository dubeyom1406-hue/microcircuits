import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';

const ProtectedRoute = ({ children }) => {
    const { isAdmin: isAuthenticated, loading, dismissLoading } = useAdmin();
    const [showDebug, setShowDebug] = React.useState(false);

    React.useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => setShowDebug(true), 4000);
        }
        return () => clearTimeout(timer);
    }, [loading]);

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

                {showDebug && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: '2rem',
                            borderRadius: '24px',
                            maxWidth: '450px',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <p style={{ color: '#ff4b4b', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Delayed Initialization</p>
                        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '2rem', lineHeight: 1.5 }}>
                            Firebase connection is taking longer than expected. You can manually bypass this check.
                        </p>

                        <button
                            onClick={dismissLoading}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#00c2ff',
                                color: '#000',
                                border: 'none',
                                borderRadius: '12px',
                                fontWeight: 800,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 10px 20px rgba(0, 194, 255, 0.2)'
                            }}
                        >
                            BYPASS & ENTER DASHBOARD
                        </button>
                    </motion.div>
                )}
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
