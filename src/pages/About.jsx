import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const About = () => {
    const navigate = useNavigate();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="about-page mobile-full-width"
            style={{ background: '#000', color: '#fff', overflowX: 'hidden', width: '100%', maxWidth: '100vw', boxSizing: 'border-box' }}
        >

            {/* Close Button Container */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                >
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="white" strokeWidth="2.5" fill="none">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', padding: '40px 15px' }}
            >
                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px' }}>
                    <span style={{ color: '#fff' }}>Commit.</span> <span style={{ color: '#00aaff' }}>Together</span>
                </h1>
                <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2.22rem)', fontWeight: 600, color: '#fff' }}>
                    Building Trust at every Milestone — from <span style={{ color: '#00aaff' }}>Spec to Silicon.</span>
                </p>
            </motion.section>

            {/* Mission Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                style={{ padding: '80px 20px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}
            >
                <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    At <img src="/logo_large.png" alt="MIPL" style={{ height: '30px', width: 'auto', borderRadius: '4px' }} /> MicroCircuits Innovations, We Began with <span style={{ color: '#00aaff' }}>One Mission:</span>
                </h2>
                <h3 style={{ fontSize: 'clamp(1.8rem, 5vw, 3.8rem)', fontWeight: 800, marginBottom: '50px', lineHeight: 1.2, color: '#00aaff' }}>
                    "To Transform the Future of Custom SoC Design"
                </h3>
                <div style={{ maxWidth: '850px', margin: '0 auto 50px', textAlign: 'left' }}>
                    <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '20px', lineHeight: 1.8 }}>
                        From Day One, we've pursued Excellence — not just in execution, but in relationships. Today, we're a Trusted Partner to the world's most innovative companies.
                    </p>
                    <p style={{ fontSize: '1.1rem', color: '#ccc', marginBottom: '20px', lineHeight: 1.8 }}>
                        We offer full-spectrum VLSI design services, empowering our clients to go Further, Faster — across AI, Automotive, Connectivity, Mobility, Server, and Wearable platforms.
                    </p>
                </div>
                <h4 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#00aaff' }}>
                    "We Help Shape the Future"
                </h4>
            </motion.section>

            {/* Spec To Silicon Card */}
            <motion.section
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                style={{
                    background: '#080808',
                    border: '3px solid #333',
                    borderRadius: '35px',
                    padding: '45px 30px',
                    textAlign: 'center',
                    width: '90%',
                    maxWidth: '650px',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                    margin: '0 auto 80px auto'
                }}
            >
                <h3 style={{ fontSize: '2.2rem', marginBottom: '40px', fontWeight: 700 }}>Spec. To <span style={{ color: '#00aaff' }}>Silicon.</span></h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '30px',
                    margin: '40px 0',
                    justifyItems: 'center'
                }}>
                    <IconBox label="AI" path="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" circle={{ cx: 12, cy: 12, r: 2 }} />
                    <IconBox label="Automobiles" path="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9H5c-1.1 0-2 .9-2 2v7c0 .6.4 1 1 1h2" circle={{ cx: 7, cy: 17, r: 2 }} circle2={{ cx: 17, cy: 17, r: 2 }} />
                    <IconBox label="Wearables" path="M6 4h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                    <IconBox label="Wireless" path="M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0" circle={{ cx: 12, cy: 20, r: 2 }} />
                    <IconBox label="Servers" rect1={{ x: 2, y: 2, w: 20, h: 8, rx: 2 }} rect2={{ x: 2, y: 14, w: 20, h: 8, rx: 2 }} />
                    <IconBox label="Smart Devices" path="M5 2h14a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 16h.01" />
                </div>

                <button
                    onClick={() => navigate('/')}
                    style={{
                        background: '#0056b3',
                        color: '#fff',
                        padding: '16px 45px',
                        borderRadius: '14px',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: '0.3s'
                    }}
                    onMouseEnter={(e) => { e.target.style.background = '#007bff'; e.target.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.target.style.background = '#0056b3'; e.target.style.transform = 'translateY(0)'; }}
                >
                    View Our Expertise
                </button>
            </motion.section>

            {/* Stats Grid */}
            <section style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '35px',
                width: '100%',
                maxWidth: '1350px',
                margin: '0 auto 100px auto',
                padding: '0 20px'
            }}>
                <StatCard
                    number="20+"
                    subtitle="Years Experience"
                    desc="Decades of Experience in Analog, Mixed-Signal, and Digital Design — Scaling from 180nm to 1.8nm."
                    btnText="View CaseStudy"
                    link="/casestudy"
                    navigate={navigate}
                />
                <StatCard
                    number="100+"
                    subtitle="Customers"
                    desc="Trusted by Global OEMs and Tier-1s — Delivering Precision Silicon at Massive Scale, Year after Year."
                    btnText="Connect With Us"
                    link="/contact"
                    navigate={navigate}
                />
                <StatCard
                    number="50+"
                    subtitle="First Pass Silicon"
                    desc="Custom Silicon Solutions Deployed Across AMS, Signal Processing, and Power Management."
                    btnText="View CaseStudy"
                    link="/casestudy"
                    navigate={navigate}
                />
            </section>
        </motion.div>
    );
};

// Helper Components
const IconBox = ({ label, path, rect, rects, circle, circle2, rect1, rect2, cx, cy, r }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '48px', height: '48px', color: '#fff', opacity: 0.9 }}>
            {path && <path d={path} />}
            {circle && <circle cx={circle.cx} cy={circle.cy} r={circle.r} />}
            {circle2 && <circle cx={circle2.cx} cy={circle2.cy} r={circle2.r} />}
            {rect1 && <rect x={rect1.x} y={rect1.y} width={rect1.w} height={rect1.h} rx={rect1.rx} />}
            {rect2 && <rect x={rect2.x} y={rect2.y} width={rect2.w} height={rect2.h} rx={rect2.rx} />}
            {cx && <circle cx={cx} cy={cy} r={r} />}
            {/* Hardcoded extras for specific icons */}
            {label === 'Automotive' && <circle cx="17" cy="17" r="2" />}
            {rect && <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} rx={rect.rx} />}
            {rects && rects.map((rc, i) => <rect key={i} x={rc.x} y={rc.y} width={rc.w} height={rc.h} rx={rc.rx} />)}
        </svg>
        <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 500, textTransform: 'uppercase' }}>{label}</span>
    </div>
);

const StatCard = ({ number, subtitle, desc, btnText, link, navigate }) => (
    <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        style={{
            flex: '1 1 300px',
            maxWidth: '420px',
            background: '#080808',
            border: '1px solid #333',
            borderRadius: '35px',
            padding: '45px 30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left'
        }}
    >
        <h4 style={{ fontSize: '4.5rem', marginBottom: '10px', fontWeight: 800, color: '#00c2ff', lineHeight: 1 }}>{number}</h4>
        <h5 style={{ fontSize: '1.8rem', marginBottom: '25px', color: '#fff', fontWeight: 700 }}>{subtitle}</h5>
        <p style={{ fontSize: '1rem', color: '#ccc', lineHeight: 1.6, marginBottom: 'auto' }}>{desc}</p>
        <button
            onClick={() => navigate(link)}
            style={{
                marginTop: '40px',
                background: '#0056b3',
                color: '#fff',
                padding: '12px 30px',
                borderRadius: '25px',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: '0.3s'
            }}
            onMouseEnter={(e) => { e.target.style.background = '#007bff'; }}
            onMouseLeave={(e) => { e.target.style.background = '#0056b3'; }}
        >
            {btnText}
        </button>
    </motion.div>
);

export default About;
