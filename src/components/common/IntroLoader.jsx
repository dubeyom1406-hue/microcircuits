import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const IntroLoader = ({ onComplete }) => {
    const [phase, setPhase] = useState(-1); // -1: Wait, 0: Logo Bloom, 1: Logo Move, 2: MIPL Text, 3: Design, 4: Deliver, 5: End
    const [subPhase, setSubPhase] = useState(0);
    const [blueFill, setBlueFill] = useState(false);
    const [yellowFill, setYellowFill] = useState(false);
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(0), 500),  // Start Logo Bloom almost immediately
            setTimeout(() => setPhase(1), 2500), // Move logo to corner
            setTimeout(() => setPhase(2), 4500), // Show MIPL text
            setTimeout(() => setPhase(3), 8500), // Start Design. Great. Engineering.
            setTimeout(() => setSubPhase(1), 9500),
            setTimeout(() => setSubPhase(2), 10500),
            setTimeout(() => setYellowFill(true), 11000),
            setTimeout(() => setPhase(4), 14500),
            setTimeout(() => setSubPhase(3), 16000),
            setTimeout(() => setSubPhase(4), 17500),
            setTimeout(() => setSubPhase(5), 19000),
            setTimeout(() => setBlueFill(true), 20000),
            setTimeout(() => {
                setPhase(5);
                if (onComplete) onComplete();
            }, 23500),
            // Safety Failsafe: Force complete if something gets stuck
            setTimeout(() => {
                if (phase < 5) {
                    console.warn("IntroLoader safety timer triggered. Forcing navigation.");
                    if (onComplete) onComplete();
                }
            }, 25000)
        ];

        return () => timers.forEach(clearTimeout);
    }, [onComplete, phase]);

    return (
        <motion.div
            className="fixed inset-0 z-[2000] flex flex-col items-center justify-center select-none overflow-hidden bg-black"
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
                        key="master-loader-content"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        transition={{ duration: 1 }}
                        className="relative w-full h-full flex flex-col items-center justify-center"
                    >
                        {/* Logo Animation: Center to Top-Left */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: phase >= 0 ? 1 : 0,
                                scale: phase >= 1 ? 0.6 : (phase >= 0 ? 1 : 0),
                                x: phase >= 1 ? '-44vw' : 0,
                                y: phase >= 1 ? '-44vh' : 0,
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
                            style={{ position: 'absolute', zIndex: 50 }}
                            className="flex items-center justify-center"
                        >
                            {!imgError ? (
                                <img
                                    src="/logo_large.png"
                                    alt="MIPL Logo"
                                    onError={() => setImgError(true)}
                                    style={{
                                        width: '650px',
                                        height: 'auto',
                                        filter: 'drop-shadow(0 0 60px rgba(0, 194, 255, 0.6))'
                                    }}
                                />
                            ) : (
                                // Fallback if image fails to load
                                <h1 className="text-4xl font-bold text-white tracking-wider">MIPL</h1>
                            )}
                        </motion.div>

                        {/* Absolute Centered Text Container */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]">
                            <AnimatePresence mode="wait">
                                {/* Phase 2: MIPL Text */}
                                {phase === 2 && (
                                    <motion.div
                                        key="loader-phase2"
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.1, y: -20 }}
                                        transition={{ duration: 0.8 }}
                                        className="flex flex-col items-center text-center py-10"
                                    >
                                        <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-none mb-4">MicroCircuits</h1>
                                        <h1 className="text-2xl md:text-5xl font-bold text-[#b0bebe] tracking-tight leading-none">Innovations</h1>
                                    </motion.div>
                                )}

                                {/* Phase 3: Design. Great. Engineering. */}
                                {phase === 3 && (
                                    <motion.div
                                        key="loader-phase3"
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.1, y: -20 }}
                                        transition={{ duration: 0.8 }}
                                        className="flex flex-col items-center text-center w-full"
                                    >
                                        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
                                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl md:text-6xl font-medium text-white">Design.</motion.span>
                                            {subPhase >= 1 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1, color: "#00c2ff" }} className="text-4xl md:text-6xl font-medium">Great.</motion.span>}
                                            {subPhase >= 2 && <motion.span initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} className="text-4xl md:text-6xl font-medium text-white">Engineering</motion.span>}
                                        </div>
                                        <div className="h-20 flex items-center justify-center">
                                            {subPhase >= 2 && (
                                                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-lg md:text-2xl font-light text-gray-300 tracking-wider">
                                                    We don't just Design Chips. We Engineer <span className={`inline-block font-medium text-fill yellow-fill ${yellowFill ? 'active' : ''}`}>Breakthroughs</span>
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Phase 4: Deliver sequence */}
                                {phase === 4 && (
                                    <motion.div
                                        key="loader-phase4"
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 1.1, y: -20 }}
                                        transition={{ duration: 0.8 }}
                                        className="flex flex-col items-center text-center w-full"
                                    >
                                        <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
                                            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-7xl font-bold text-white">Design.</motion.span>
                                            {subPhase >= 3 && <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-7xl font-bold text-white">Develop.</motion.span>}
                                            {subPhase >= 4 && <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-7xl font-bold text-[#00c2ff]">Deliver.</motion.span>}
                                        </div>
                                        <div className="h-24 flex items-center justify-center">
                                            {subPhase >= 5 && (
                                                <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-xl md:text-3xl font-light tracking-wide text-white opacity-90">
                                                    Your <span className={`inline-block font-bold text-fill blue-fill ${blueFill ? 'active' : ''}`}>Next Chip</span> Starts Here
                                                </motion.p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: phase > 0 ? 0.3 : 0.1 }} className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.15)_0%,transparent_75%)] pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default IntroLoader;
