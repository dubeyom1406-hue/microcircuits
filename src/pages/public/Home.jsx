import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [phase, setPhase] = useState(0); // Fixed: Start immediately
    const [moveText, setMoveText] = useState(false); // New state for text movement
    const [subPhase, setSubPhase] = useState(0);
    const [blueFill, setBlueFill] = useState(false);
    const [yellowFill, setYellowFill] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Check immediately on mount
        window.addEventListener('resize', handleResize);

        const timers = [
            setTimeout(() => setPhase(0), 3000), // Start Logo Bloom after preloader
            setTimeout(() => setPhase(1), 5000), // Move logo to corner
            setTimeout(() => setPhase(2), 7000), // Show MIPL text (Center)
            setTimeout(() => setMoveText(true), 8500), // Move MIPL text to corner (DELAYED)
            // Navbar slides in at 10000ms (Handled in Navbar.jsx)
            setTimeout(() => setPhase(3), 11500), // Start Design. Great. Engineering. (Delayed for Header)
            setTimeout(() => setSubPhase(1), 12500), // "Great."
            setTimeout(() => setSubPhase(2), 13500), // "Engineering"
            setTimeout(() => setYellowFill(true), 14000), // Slogan fill
            setTimeout(() => setPhase(4), 17500), // Design. Develop. Deliver.
            setTimeout(() => setSubPhase(3), 19000), // Develop.
            setTimeout(() => setSubPhase(4), 20500), // Deliver.
            setTimeout(() => setSubPhase(5), 22000), // Slogan
            setTimeout(() => setBlueFill(true), 23000), // Slogan fill
            setTimeout(() => {
                setPhase(5);
                setTimeout(() => navigate('/expertise'), 800);
            }, 25500)
        ];

        return () => {
            timers.forEach(clearTimeout);
            window.removeEventListener('resize', handleResize);
        };
    }, [navigate]);

    return (
        <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center select-none overflow-hidden bg-black"
        >
            <style>
                {`
                .text-fill { background-size: 200% 100%; background-position: 100% 0; -webkit-background-clip: text; -webkit-text-fill-color: transparent; transition: background-position 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
                .text-fill.active { background-position: 0% 0; }
                .yellow-fill { background-image: linear-gradient(to right, #FFD700 50%, white 50%); }
                .blue-fill { background-image: linear-gradient(to right, #00c2ff 50%, white 50%); }
                `}
            </style>

            <AnimatePresence>
                {phase < 5 && (
                    <motion.div
                        key="master-content"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        transition={{ duration: 1 }}
                        className="relative w-full h-full flex flex-col items-center justify-center p-4"
                    >
                        {/* Logo Animation: Center to Top-Left */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: phase >= 0 ? 1 : 0,
                                scale: phase >= 1 ? 0.6 : (phase >= 0 ? 1 : 0),
                                x: phase >= 1 ? (isMobile ? '-35vw' : '-44vw') : 0,
                                y: phase >= 1 ? (isMobile ? '-44vh' : '-44vh') : 0,
                            }}
                            transition={{
                                scale: {
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                    duration: 1.5
                                },
                                x: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                                y: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 0.5 }
                            }}
                            style={{ position: 'absolute', zIndex: 100 }}
                            className="flex items-center justify-center p-4"
                        >
                            <img
                                src="/logo_large.png"
                                alt="MIPL Logo"
                                style={{
                                    width: isMobile ? '350px' : '650px',
                                    height: 'auto',
                                    filter: 'drop-shadow(0 0 60px rgba(0, 194, 255, 0.6))'
                                }}
                            />
                        </motion.div>


                        {/* Brand Text Animation: Center to Top-Right (Sequential: Show -> Then Move) */}
                        {phase >= 2 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                animate={
                                    moveText
                                        ? {
                                            opacity: 1,
                                            scale: isMobile ? 0.3 : 0.25,
                                            x: isMobile ? '35vw' : '42vw',
                                            y: isMobile ? '-44vh' : '-44vh'
                                        } // Move to Corner
                                        : {
                                            opacity: 1,
                                            scale: 1,
                                            x: 0,
                                            y: 0
                                        } // Show at Center (Inside-Out)
                                }
                                transition={{
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                style={{ position: 'absolute', zIndex: 110 }}
                                className="flex flex-col items-center justify-center pointer-events-none"
                            >
                                <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-none mb-1 md:mb-4">MicroCircuits</h1>
                                <h1 className="text-2xl md:text-5xl font-bold text-[#b0bebe] tracking-tight leading-none">Innovations</h1>
                            </motion.div>
                        )}

                        {/* Absolute Centered Text Container */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6">
                            <AnimatePresence mode="wait">
                                {/* Phase 2 removed from sequential flow to allow persistent animation */}

                                {/* Phase 3: Design. Great. Engineering. */}
                                {phase === 3 && (
                                    <motion.div
                                        key="phase3"
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.1, y: -20 }}
                                        transition={{ duration: 0.8 }}
                                        className="flex flex-col items-center text-center w-full"
                                    >
                                        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-8 h-[80px] relative">
                                            <AnimatePresence mode="popLayout">
                                                {/* Design: Appears then Disappears */}
                                                {subPhase < 2 && (
                                                    <motion.span
                                                        key="design"
                                                        layout
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}
                                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                                        className="text-3xl md:text-6xl font-medium text-white origin-center"
                                                    >
                                                        Design.
                                                    </motion.span>
                                                )}

                                                {/* Great: Appears next to Design, then slides to take its place */}
                                                {subPhase >= 1 && (
                                                    <motion.span
                                                        key="great"
                                                        layout
                                                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                                        animate={{ opacity: 1, color: "#00c2ff", scale: 1, x: 0 }}
                                                        transition={{ duration: 0.5, layout: { duration: 0.5 } }}
                                                        className="text-3xl md:text-6xl font-medium origin-center"
                                                    >
                                                        Great.
                                                    </motion.span>
                                                )}

                                                {/* Engineering: Appears in Great's old spot (implied by flow) */}
                                                {subPhase >= 2 && (
                                                    <motion.span
                                                        key="engineering"
                                                        layout
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 200,
                                                            damping: 15,
                                                            duration: 0.8
                                                        }}
                                                        className="text-3xl md:text-6xl font-medium text-white origin-center"
                                                    >
                                                        Engineering
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div className="min-h-[80px] flex items-center justify-center px-4">
                                            {subPhase >= 2 && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-base md:text-2xl font-light text-gray-300 tracking-wider leading-relaxed"
                                                >
                                                    We don't just Design Chips. We Engineer <span className={`inline-block font-medium text-fill yellow-fill ${yellowFill ? 'active' : ''}`}>Breakthroughs</span>
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Phase 4: Deliver sequence */}
                                {phase === 4 && (
                                    <motion.div
                                        key="phase4"
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.1, y: -20 }}
                                        transition={{ duration: 0.8 }}
                                        className="flex flex-col items-center text-center w-full"
                                    >
                                        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mb-12">
                                            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-7xl font-bold text-white">Design.</motion.span>
                                            {subPhase >= 3 && <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-7xl font-bold text-white">Develop.</motion.span>}
                                            {subPhase >= 4 && <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-7xl font-bold text-[#00c2ff]">Deliver.</motion.span>}
                                        </div>
                                        <div className="min-h-[80px] flex items-center justify-center px-4">
                                            {subPhase >= 5 && (
                                                <motion.p
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="text-lg md:text-3xl font-light tracking-wide text-white opacity-90 leading-snug"
                                                >
                                                    Your <span className={`inline-block font-bold text-fill blue-fill ${blueFill ? 'active' : ''}`}>Next Chip</span> Starts Here
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Background Glow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: phase > 0 ? 0.3 : 0.1 }}
                            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.15)_0%,transparent_75%)] pointer-events-none"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Home;

