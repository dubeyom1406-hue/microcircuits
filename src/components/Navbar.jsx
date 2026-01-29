import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';
import Search from './Search';
import AnimatedLogo from './common/AnimatedLogo';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const { layoutSettings } = useAdmin();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Hide navbar on admin pages
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

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-[1000] pointer-events-none w-full h-[80px] md:h-[100px] flex items-center justify-between px-4 md:px-12">

                {/* --- LEFT COLUMN: Logo + Company Name --- */}
                <motion.div
                    initial={{ opacity: 0, x: -10, scale: 1 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className="flex items-center gap-2 md:gap-4 pointer-events-auto cursor-pointer"
                    onClick={() => navigate('/')}
                    style={{ zIndex: 1002 }} // Ensure logo stays above mobile menu
                >
                    <AnimatedLogo className="w-12 h-6 md:w-[80px] md:h-[40px]" />
                    <div className="text-sm md:text-[1.2rem] font-medium text-white whitespace-nowrap tracking-wide leading-tight">
                        MicroCircuits Innovations
                    </div>
                </motion.div>

                {/* --- CENTER COLUMN: Desktop Navigation --- */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex justify-center pointer-events-auto">
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
                        }}>
                        <nav className="flex gap-4 lg:gap-[1.8rem] items-center">
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
                                            fontSize: '0.9rem',
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

                {/* --- RIGHT COLUMN: Slogan (Desktop) / Hamburger (Mobile) --- */}
                <div className="pointer-events-auto flex items-center" style={{ zIndex: 1002 }}>
                    {/* Desktop Slogan */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="hidden md:block text-[1rem] font-normal text-[#b0bebe] pointer-events-none whitespace-nowrap tracking-wider"
                    >
                        Innovations. Redefined
                    </motion.div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white p-2 focus:outline-none"
                            style={{ background: 'transparent', border: 'none' }}
                        >
                            {isMobileMenuOpen ? (
                                <X size={28} color="#fff" />
                            ) : (
                                <Menu size={28} color="#fff" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Overlay */}
                <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            </div>

            {/* --- MOBILE MENU OVERLAY --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[1001] bg-black bg-opacity-95 backdrop-blur-md flex flex-col items-center justify-center md:hidden"
                        style={{ background: 'rgba(0,0,0,0.95)' }}
                    >
                        <nav className="flex flex-col gap-8 items-center">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.id;
                                return (
                                    <motion.a
                                        key={link.id}
                                        href={link.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsMobileMenuOpen(false);
                                            if (link.id === '/search') {
                                                setIsSearchOpen(true);
                                            } else {
                                                navigate(link.id);
                                            }
                                        }}
                                        style={{
                                            color: isActive ? '#00c2ff' : '#fff',
                                            textDecoration: 'none',
                                            fontSize: '1.5rem',
                                            fontWeight: isActive ? '600' : '400',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {link.label}
                                    </motion.a>
                                );
                            })}
                        </nav>

                        <div className="mt-12 text-[#b0bebe] text-sm tracking-widest uppercase opacity-60">
                            Innovations. Redefined
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;