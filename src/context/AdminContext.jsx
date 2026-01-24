import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useLoading } from './LoadingContext';

const API_BASE_URL = '/api';

const AdminContext = createContext();

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('adminToken');
};

// Helper function to make authenticated API requests
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const token = getAuthToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    } else {
        // Return empty structure or throw specific error if it's not JSON (e.g. Vercel 404 HTML)
        console.warn("Received non-JSON response from API:", url);
        return [];
    }
};

export const AdminProvider = ({ children }) => {
    const { isAuthenticated, token, logout: authLogout } = useAuth();
    const { startLoading, stopLoading } = useLoading();
    const [isAdmin, setIsAdmin] = useState(isAuthenticated);

    useEffect(() => {
        setIsAdmin(isAuthenticated);
    }, [isAuthenticated]);
    const [vacancies, setVacancies] = useState([
        {
            id: 1,
            title: "Physical Design Engineer",
            exp: "3-5 Years",
            location: "Ahmedabad, Gujarat",
            description: "We are looking for a Physical Design Engineer to join our team. You will be responsible for the physical implementation of high-performance integrated circuits.",
            date: "12 January 2026",
            pdfUrl: "#"
        },
        {
            id: 2,
            title: "DFT Engineer",
            exp: "2-4 Years",
            location: "Bangalore (Remote Available)",
            description: "Joining our DFT team, you will work on cutting-edge design for testability solutions for complex SOCs.",
            date: "15 January 2026",
            pdfUrl: "#"
        },
        {
            id: 3,
            title: "RTL Design Lead",
            exp: "8-12 Years",
            location: "Ahmedabad, Gujarat",
            description: "Lead the design architecture and RTL development for our next-generation semiconductor products.",
            date: "18 January 2026",
            pdfUrl: "#"
        }
    ]);
    const [caseStudies, setCaseStudies] = useState([
        {
            id: 1,
            category: "Design For Testability",
            title: "Optimizing Fault Coverage for 7nm Automotive SOC",
            description: "How we achieved 99.5% stuck-at coverage while reducing test time by 30%.",
            date: "10th Jan 2026",
            pdfUrl: "#"
        },
        {
            id: 2,
            category: "Physical Design",
            title: "Tape-Out Success: High-Speed AI Accelerator",
            description: "Meeting aggressive timing targets for a 2GHz AI processing unit in 5nm node.",
            date: "15th Jan 2026",
            pdfUrl: "#"
        },
        {
            id: 3,
            category: "Design & Verification",
            title: "Formal Verification of Multi-Core Cache Controller",
            description: "Reducing verification cycle by 40% using advanced formal property checking.",
            date: "20th Jan 2026",
            pdfUrl: "#"
        }
    ]);
    const [applications, setApplications] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);
    const [layoutSettings, setLayoutSettings] = useState({
        navbar: {
            top: '2rem',
            width: 'auto',
            padding: '0.6rem 2rem',
            background: 'rgba(60, 60, 60, 0.4)',
            blur: '15px'
        },
        branding: {
            top: '2rem',
            left: '2rem',
            scale: 0.7
        },
        hero: {
            textAlign: 'center',
            titleSize: '4rem'
        }
    });
    const [loading, setLoading] = useState(true);

    // Initial load for layout settings
    useEffect(() => {
        const savedLayout = localStorage.getItem('miplLayoutSettings');
        if (savedLayout) {
            try {
                setLayoutSettings(JSON.parse(savedLayout));
            } catch (e) {
                console.error("Failed to parse layout settings", e);
            }
        }
    }, []);

    const updateLayoutSettings = async (newSettings) => {
        // Optimistic update
        const updated = { ...layoutSettings, ...newSettings };
        setLayoutSettings(updated);
        localStorage.setItem('miplLayoutSettings', JSON.stringify(updated));

        if (isAdmin) {
            try {
                // Future: await apiRequest('/layout', { method: 'POST', body: JSON.stringify(newSettings) });
            } catch (error) {
                console.error('Error saving layout to API:', error);
            }
        }
    };

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            // Only show loader if we are actually refreshing data, possibly check cache or just subtle loader?
            // For now, let's use global loader for "slow data" as requested.
            startLoading();
            try {
                // Public data (always fetch)
                const [vacanciesData, caseStudiesData] = await Promise.all([
                    apiRequest('/vacancies'),
                    apiRequest('/case-studies')
                ]);
                setVacancies(vacanciesData);
                setCaseStudies(caseStudiesData);

                // Admin only data
                if (isAdmin) {
                    const [applicationsData, contactData] = await Promise.all([
                        apiRequest('/applications'),
                        apiRequest('/contacts')
                    ]);
                    setApplications(applicationsData);
                    setContactMessages(contactData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // Min delay to prevent flickering
                setTimeout(() => stopLoading(), 500);
            }
            setLoading(false);
        };

        fetchData();
    }, [isAdmin]);

    const loginAdmin = async (username, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                setIsAdmin(true);
                // Reload data after login
                const [vacanciesData, caseStudiesData, applicationsData, contactData] = await Promise.all([
                    apiRequest('/vacancies'),
                    apiRequest('/case-studies'),
                    apiRequest('/applications'),
                    apiRequest('/contacts')
                ]);

                setVacancies(vacanciesData);
                setCaseStudies(caseStudiesData);
                setApplications(applicationsData);
                setContactMessages(contactData);

                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logoutAdmin = () => {
        authLogout();
        setIsAdmin(false);
        setVacancies([]);
        setCaseStudies([]);
        setApplications([]);
        setContactMessages([]);
    };

    const addVacancy = async (vacancyData) => {
        try {
            const newVacancy = await apiRequest('/vacancies', {
                method: 'POST',
                body: JSON.stringify(vacancyData),
            });
            setVacancies(prev => [...prev, newVacancy]);
        } catch (error) {
            console.error('Error adding vacancy:', error);
        }
    };

    const updateVacancy = async (id, updatedData) => {
        try {
            const updatedVacancy = await apiRequest(`/vacancies/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedData),
            });
            setVacancies(prev => prev.map(v => v.id === id ? updatedVacancy : v));
        } catch (error) {
            console.error('Error updating vacancy:', error);
        }
    };

    const deleteVacancy = async (id) => {
        try {
            await apiRequest(`/vacancies/${id}`, {
                method: 'DELETE',
            });
            setVacancies(prev => prev.filter(v => v.id !== id));
        } catch (error) {
            console.error('Error deleting vacancy:', error);
        }
    };

    const addCaseStudy = async (studyData) => {
        try {
            const newStudy = await apiRequest('/case-studies', {
                method: 'POST',
                body: JSON.stringify(studyData),
            });
            setCaseStudies(prev => [...prev, newStudy]);
        } catch (error) {
            console.error('Error adding case study:', error);
        }
    };

    const updateCaseStudy = async (id, updatedData) => {
        try {
            const updatedStudy = await apiRequest(`/case-studies/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedData),
            });
            setCaseStudies(prev => prev.map(s => s.id === id ? updatedStudy : s));
        } catch (error) {
            console.error('Error updating case study:', error);
        }
    };

    const deleteCaseStudy = async (id) => {
        try {
            await apiRequest(`/case-studies/${id}`, {
                method: 'DELETE',
            });
            setCaseStudies(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error('Error deleting case study:', error);
        }
    };

    const addApplication = async (appData) => {
        try {
            const newApplication = await apiRequest('/applications', {
                method: 'POST',
                body: JSON.stringify(appData),
            });
            setApplications(prev => [...prev, newApplication]);
        } catch (error) {
            console.error('Error adding application:', error);
        }
    };

    const deleteApplication = async (id) => {
        try {
            await apiRequest(`/applications/${id}`, {
                method: 'DELETE',
            });
            setApplications(prev => prev.filter(a => a.id !== id));
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const addContactMessage = async (messageData) => {
        try {
            const newMessage = await apiRequest('/contacts', {
                method: 'POST',
                body: JSON.stringify(messageData),
            });
            setContactMessages(prev => [...prev, newMessage]);
        } catch (error) {
            console.error('Error adding contact message:', error);
        }
    };

    const deleteContactMessage = async (id) => {
        try {
            await apiRequest(`/contacts/${id}`, {
                method: 'DELETE',
            });
            setContactMessages(prev => prev.filter(m => m.id !== id));
        } catch (error) {
            console.error('Error deleting contact message:', error);
        }
    };

    return (
        <AdminContext.Provider value={{
            isAdmin, loginAdmin, logoutAdmin,
            vacancies, addVacancy, updateVacancy, deleteVacancy,
            caseStudies, addCaseStudy, updateCaseStudy, deleteCaseStudy,
            applications, addApplication, deleteApplication,
            contactMessages, addContactMessage, deleteContactMessage,
            layoutSettings, updateLayoutSettings,
            loading
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);
