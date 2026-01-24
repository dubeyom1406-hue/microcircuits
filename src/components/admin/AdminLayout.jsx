import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    FileText,
    LogOut,
    Menu,
    X,
    Bell,
    User,
    ChevronRight,
    Settings
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const AdminLayout = ({ children }) => {
    const { logoutAdmin: logout, user } = useAdmin();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const [isMobile, setIsMobile] = React.useState(false); // Start false to be safe

    React.useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Manage Vacancies', path: '/admin/vacancies', icon: <Briefcase size={20} /> },
        { name: 'Manage Case Studies', path: '/admin/case-studies', icon: <FileText size={20} /> },
        { name: 'Layout Manager', path: '/admin/layout', icon: <Settings size={20} /> },
        { name: 'Applications', path: '/admin/applications', icon: <User size={20} /> },
        { name: 'Inquiries', path: '/admin/inquiries', icon: <Bell size={20} /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#050505',
            color: '#fff',
            fontFamily: '"Outfit", sans-serif',
            overflow: 'hidden'
        }}>
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: isSidebarOpen ? '280px' : (isMobile ? '0px' : '80px'),
                    x: isMobile && !isSidebarOpen ? -100 : 0,
                    opacity: isMobile && !isSidebarOpen ? 0 : 1
                }}
                style={{
                    background: 'rgba(10, 10, 10, 0.95)',
                    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: isMobile && !isSidebarOpen ? 0 : '1.5rem 1rem',
                    position: isMobile ? 'fixed' : 'relative',
                    height: '100vh',
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    overflow: 'hidden',
                    boxShadow: isMobile && isSidebarOpen ? '0 0 50px rgba(0,0,0,0.5)' : 'none'
                }}
            >
                {/* Logo Section */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '3rem',
                    padding: '0 0.5rem'
                }}>
                    <img
                        src="/logo_large.png"
                        alt="MIPL Logo"
                        style={{
                            width: '40px',
                            height: 'auto',
                            objectFit: 'contain',
                            borderRadius: '4px'
                        }}
                    />
                    {isSidebarOpen && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.5px' }}
                        >
                            MIPL <span style={{ color: '#00c2ff' }}>MATRIX</span>
                        </motion.span>
                    )}
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '0.8rem 1rem',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                color: isActive(item.path) ? '#fff' : '#666',
                                background: isActive(item.path) ? 'rgba(0, 194, 255, 0.1)' : 'transparent',
                                border: isActive(item.path) ? '1px solid rgba(0, 194, 255, 0.2)' : '1px solid transparent',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden'
                            }}
                        >
                            <span style={{ color: isActive(item.path) ? '#00c2ff' : 'inherit' }}>{item.icon}</span>
                            {isSidebarOpen && <span>{item.name}</span>}
                            {isSidebarOpen && isActive(item.path) && (
                                <ChevronRight size={14} style={{ marginLeft: 'auto', color: '#00c2ff' }} />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div style={{
                    padding: '1rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '16px',
                    marginTop: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: '#1a1a1a',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <User size={18} color="#00c2ff" />
                        </div>
                        {isSidebarOpen && (
                            <div style={{ overflow: 'hidden' }}>
                                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{user?.username || 'Admin'}</p>
                                <p style={{ margin: 0, fontSize: '0.7rem', color: '#666' }}>System Administrator</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                            gap: '10px',
                            padding: '0.6rem',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <LogOut size={16} />
                        {isSidebarOpen && <span>Logout</span>}
                    </button>
                </div>

                {/* Toggle Button */}
            </motion.aside>

            {/* Mobile Toggle Button - Moved Outside Sidebar */}
            {isMobile && (
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    style={{
                        position: 'fixed',
                        right: '20px',
                        top: '20px',
                        width: '40px',
                        height: '40px',
                        background: '#00c2ff',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000',
                        boxShadow: '0 0 15px rgba(0, 194, 255, 0.4)',
                        zIndex: 1100,
                    }}
                >
                    {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            )}

            {/* Main Content Area */}
            <main style={{
                flex: 1,
                height: '100vh',
                overflowY: 'auto',
                padding: isMobile ? '1rem' : '2rem 3rem',
                position: 'relative',
                width: '100%'
            }}>
                {/* Header Backdrop Blur */}
                <div style={{
                    position: 'sticky',
                    top: isMobile ? '-1rem' : '-2rem',
                    margin: isMobile ? '-1rem -1rem 1rem -1rem' : '-2rem -3rem 2rem -3rem',
                    padding: isMobile ? '1rem' : '1.5rem 3rem',
                    background: 'rgba(5, 5, 5, 0.7)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 50,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1.5rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <button style={headerIconStyle}><Bell size={18} /></button>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '0.4rem 1rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '100px',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#aaa' }}>SYSTEM ONLINE</span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};

const headerIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
};

export default AdminLayout;
