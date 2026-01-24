import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLoading } from './LoadingContext';
import { auth, db } from '../lib/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from 'firebase/firestore';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    // We are now managing auth state directly here via Firebase, 
    // but preserving the variable names for compatibility.
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null); // Add user state
    const { startLoading, stopLoading } = useLoading();

    // Auth Listener
    useEffect(() => {
        if (!auth) {
            console.error("Firebase auth not initialized in AdminContext. Check Vercel Env Vars.");
            setLoading(false); // Don't block the UI if Firebase fails
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Auth state changed:", currentUser ? "Logged In" : "Not Logged In");
            setUser(currentUser);
            setIsAdmin(!!currentUser);
            setLoading(false);
        }, (error) => {
            console.error("Auth state error:", error);
            setLoading(false);
        });

        // Failsafe: if nothing happens in 5 seconds, stop loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000);

        return () => {
            unsubscribe();
            clearTimeout(timer);
        };
    }, []);

    const [vacancies, setVacancies] = useState([]);
    const [caseStudies, setCaseStudies] = useState([]);
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
        const updated = { ...layoutSettings, ...newSettings };
        setLayoutSettings(updated);
        localStorage.setItem('miplLayoutSettings', JSON.stringify(updated));
    };

    // Helper to map Firestore docs
    const mapDocs = (snapshot) => {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    // Usage: Fetch all data on mount (no need to wait for login for public data)
    useEffect(() => {
        const fetchPublicData = async () => {
            if (!db) {
                console.warn("Firebase DB not initialized, skipping public data fetch");
                return;
            }
            // startLoading(); // Optional: trigger global loader
            try {
                const vacanciesSnap = await getDocs(collection(db, 'vacancies'));
                setVacancies(mapDocs(vacanciesSnap));

                const caseStudiesSnap = await getDocs(collection(db, 'caseStudies'));
                setCaseStudies(mapDocs(caseStudiesSnap));

            } catch (error) {
                console.error("Error fetching public data:", error);
            }
        };

        fetchPublicData();
    }, []);

    // Fetch Admin Data when logged in
    useEffect(() => {
        if (!isAdmin) {
            setApplications([]);
            setContactMessages([]);
            return;
        }

        const fetchAdminData = async () => {
            startLoading();
            try {
                const appsSnap = await getDocs(collection(db, 'applications'));
                setApplications(mapDocs(appsSnap));

                const contactsSnap = await getDocs(collection(db, 'contacts'));
                setContactMessages(mapDocs(contactsSnap));
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                stopLoading();
            }
        };

        fetchAdminData();
    }, [isAdmin]);


    const loginAdmin = async (username, password) => {
        const email = username.includes('@') ? username : 'admin@microcircuits.com';
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.code };
        }
    };

    const registerAdmin = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    };

    const logoutAdmin = async () => {
        try {
            await signOut(auth);
            setIsAdmin(false);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // --- CRUD Operations ---

    const addVacancy = async (vacancyData) => {
        try {
            const docRef = await addDoc(collection(db, 'vacancies'), vacancyData);
            setVacancies(prev => [...prev, { id: docRef.id, ...vacancyData }]);
        } catch (error) {
            console.error('Error adding vacancy:', error);
        }
    };

    const updateVacancy = async (id, updatedData) => {
        try {
            const vacancyRef = doc(db, 'vacancies', id);
            await updateDoc(vacancyRef, updatedData);
            setVacancies(prev => prev.map(v => v.id === id ? { ...v, ...updatedData } : v));
        } catch (error) {
            console.error('Error updating vacancy:', error);
        }
    };

    const deleteVacancy = async (id) => {
        try {
            await deleteDoc(doc(db, 'vacancies', id));
            setVacancies(prev => prev.filter(v => v.id !== id));
        } catch (error) {
            console.error('Error deleting vacancy:', error);
        }
    };

    const addCaseStudy = async (studyData) => {
        try {
            const docRef = await addDoc(collection(db, 'caseStudies'), studyData);
            setCaseStudies(prev => [...prev, { id: docRef.id, ...studyData }]);
        } catch (error) {
            console.error('Error adding case study:', error);
        }
    };

    const updateCaseStudy = async (id, updatedData) => {
        try {
            const studyRef = doc(db, 'caseStudies', id);
            await updateDoc(studyRef, updatedData);
            setCaseStudies(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
        } catch (error) {
            console.error('Error updating case study:', error);
        }
    };

    const deleteCaseStudy = async (id) => {
        try {
            await deleteDoc(doc(db, 'caseStudies', id));
            setCaseStudies(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error('Error deleting case study:', error);
        }
    };

    const addApplication = async (appData) => {
        try {
            const docRef = await addDoc(collection(db, 'applications'), appData);
            setApplications(prev => [...prev, { id: docRef.id, ...appData }]);
        } catch (error) {
            console.error('Error adding application:', error);
        }
    };

    const deleteApplication = async (id) => {
        try {
            await deleteDoc(doc(db, 'applications', id));
            setApplications(prev => prev.filter(a => a.id !== id));
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const addContactMessage = async (messageData) => {
        try {
            const docRef = await addDoc(collection(db, 'contacts'), messageData);
            setContactMessages(prev => [...prev, { id: docRef.id, ...messageData }]);
        } catch (error) {
            console.error('Error adding contact message:', error);
        }
    };

    const deleteContactMessage = async (id) => {
        try {
            await deleteDoc(doc(db, 'contacts', id));
            setContactMessages(prev => prev.filter(m => m.id !== id));
        } catch (error) {
            console.error('Error deleting contact message:', error);
        }
    };

    return (
        <AdminContext.Provider value={{
            user, isAdmin, loginAdmin, logoutAdmin, registerAdmin,
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
