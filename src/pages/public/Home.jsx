import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IntroLoader from '../../components/common/IntroLoader';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('skip') === 'true') {
            setShowLoader(false);
            navigate('/expertise');
        }
    }, [location]);

    const handleLoaderComplete = () => {
        setShowLoader(false);
        navigate('/expertise');
    };

    return (
        <>
            {showLoader && <IntroLoader onComplete={handleLoaderComplete} />}
            {!showLoader && (
                <div className="min-h-screen bg-black text-white flex items-center justify-center">
                    {/* Fallback content in case navigation lags */}
                    <p>Redirecting to Expertise...</p>
                </div>
            )}
        </>
    );
};

export default Home;
