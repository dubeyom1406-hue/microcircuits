import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import Search from './Search';

const Navbar = () => {
    const { layoutSettings } = useAdmin();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    if (location.pathname.startsWith('/admin')) {
        return null;
    }

    const navLinks = [
        { id: '/expertise', label: 'Expertise' },
        { id: '/casestudy', label: 'CaseStudy' },
        { id: '/careers', label: 'Careers' },
        { id: '/about', label: 'About' },
        { id: '/contact', label: 'Contact' },
        { id: '/search', label: 'Search' },
    ];

    const { navbar } = layoutSettings;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            pointerEvents: 'none',
            width: '100%',
            height: '100px', // Header container height
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            padding: '0 3rem'
        }}>

            {/* Left Column: Branding */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    justifySelf: 'start'
                }}
                onClick={() => navigate('/')}
            >
                <img
                    src="/logo_large.png"
                    alt="Logo"
                    style={{ height: '70px', filter: 'drop-shadow(0 0 10px #00c2ff)' }}
                />
            </motion.div>

            {/* Center Column: Navigation Capsule */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.header
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        padding: navbar.padding || '0.6rem 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        background: navbar.background || 'rgba(60, 60, 60, 0.4)',
                        backdropFilter: `blur(${navbar.blur || '15px'})`,
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                        pointerEvents: 'auto'
                    }}>
                    <nav style={{
                        display: 'flex',
                        gap: '1.8rem',
                        alignItems: 'center'
                    }}>
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.id;
                            return (
                                <a
                                    key={link.id}
                                    href={link.id}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.id === '/search') {
                                            setIsSearchOpen(true);
                                        } else {
                                            navigate(link.id);
                                        }
                                    }}
                                    style={{
                                        color: isActive ? '#00c2ff' : '#ccc',
                                        textDecoration: 'none',
                                        fontSize: '0.85rem',
                                        fontWeight: isActive ? '500' : '400',
                                        transition: 'all 0.3s ease',
                                        whiteSpace: 'nowrap',
                                        textShadow: isActive ? '0 0 10px rgba(0, 194, 255, 0.4)' : 'none'
                                    }}
                                    onMouseEnter={(e) => e.target.style.color = '#00c2ff'}
                                    onMouseLeave={(e) => {
                                        if (!isActive) e.target.style.color = '#ccc';
                                    }}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </nav>
                </motion.header>
            </div>

            {/* Right Column: Branding Text */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                    fontSize: '1.1rem', // Increased from 0.85rem
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    pointerEvents: 'none',
                    justifySelf: 'end',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    gap: '0.4rem',
                    alignItems: 'center'
                }}
            >
                <span style={{ color: '#fff' }}>MicroCircuits</span>
                <span style={{ color: '#b0bebe' }}>Innovations</span>
            </motion.div>

            {/* Search Overlay */}
            <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
};

export default Navbar;
