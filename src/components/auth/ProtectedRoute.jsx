import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const ProtectedRoute = ({ children }) => {
    const { isAdmin: isAuthenticated, loading, dismissLoading } = useAdmin();
    const [showDebug, setShowDebug] = React.useState(false);

    // Diagnostic Log
    React.useEffect(() => {
        console.log("ProtectedRoute State:", { isAuthenticated, loading });
    }, [isAuthenticated, loading]);

    React.useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => {
                console.warn("ProtectedRoute: Loading stuck for 6s, showing debug bypass.");
                setShowDebug(true);
            }, 6000);
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
                <div className="loader-static" style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid #00c2ff',
                    borderRadius: '50%',
                    opacity: 0.5
                }}></div>
                <p style={{ letterSpacing: '2px', opacity: 0.6, fontSize: '0.8rem', fontWeight: 600 }}>ADMIN MATRIX INITIALIZING v4.5.1</p>

                {showDebug && (
                    <div
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
                            onClick={() => {
                                console.log("ProtectedRoute: User triggered manual bypass.");
                                dismissLoading();
                            }}
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
                    </div>
                )}
            </div>
        );
    }

    if (!isAuthenticated) {
        console.log("ProtectedRoute: Not authenticated, redirecting to login.");
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
