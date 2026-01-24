import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

import LoadingOverlay from './LoadingOverlay';
import SuccessModal from './SuccessModal';

const ApplyModal = ({ isOpen, onClose, jobTitle }) => {
    // const { addApplication } = useAdmin(); // Removed Admin Context

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: 'I am really interested to apply at MicroCircuits Innovations Pvt. Ltd.\nThank you'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) newErrors.email = true;

        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(formData.phone)) newErrors.phone = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setIsLoading(true);

            try {
                const formDataToSend = new FormData();
                formDataToSend.append('name', formData.name);
                formDataToSend.append('email', formData.email);
                formDataToSend.append('phone', formData.phone);
                formDataToSend.append('message', formData.message);
                formDataToSend.append('jobTitle', jobTitle);
                if (selectedFile) {
                    formDataToSend.append('resume', selectedFile);
                }

                const response = await fetch('/api/applications', {
                    method: 'POST',
                    body: formDataToSend
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to submit application');
                }

                setIsSubmitted(true);
            } catch (error) {
                console.error('Submission error:', error);
                alert(error.message || 'Failed to submit application. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                alert('Please upload a PDF file.');
                return;
            }
            setSelectedFile(file);
            setFileName(file.name);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <LoadingOverlay isVisible={isLoading} message="Submitting Application..." />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 2000,
                    background: 'rgba(0, 0, 0, 0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    backdropFilter: 'blur(8px)'
                }}
            >
                {!isSubmitted ? (
                    <motion.div
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        style={{
                            background: 'rgba(30, 30, 30, 0.9)',
                            borderRadius: '28px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            width: '100%',
                            maxWidth: '650px',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <div style={{ padding: '2.5rem' }}>
                            {/* Row 1 */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ ...inputContainerStyle, background: errors.name ? '#b91c1c' : '#333' }}>
                                    <input
                                        placeholder="Name"
                                        style={{ ...inputStyle, color: errors.name ? '#fff' : '#aaa' }}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div style={{ ...inputContainerStyle, background: '#333' }}>
                                    <input value={jobTitle} readOnly style={{ ...inputStyle, color: '#fff' }} />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ ...inputContainerStyle, background: errors.email ? '#b91c1c' : '#333' }}>
                                    <input
                                        placeholder="Email Address"
                                        style={{ ...inputStyle, color: errors.email ? '#fff' : '#aaa' }}
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div style={{ ...inputContainerStyle, background: errors.phone ? '#b91c1c' : '#333' }}>
                                    <input
                                        placeholder="Phone Number"
                                        style={{ ...inputStyle, color: errors.phone ? '#fff' : '#aaa' }}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Row 3 - Message */}
                            <div style={{ ...inputContainerStyle, background: '#333', marginBottom: '2rem' }}>
                                <textarea
                                    placeholder="Message"
                                    rows={6}
                                    style={{ ...inputStyle, resize: 'none', color: '#fff' }}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            {/* Upload Resume Button */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                            />
                            <button
                                onClick={() => fileInputRef.current.click()}
                                style={{
                                    width: '100%',
                                    padding: '1.2rem',
                                    background: 'linear-gradient(90deg, #9333ea, #2563eb)',
                                    border: 'none',
                                    borderRadius: '16px',
                                    color: '#fff',
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    marginBottom: '1.5rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                <span>Upload Resume</span>
                                {fileName && <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>{fileName}</span>}
                            </button>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <button
                                    onClick={onClose}
                                    style={{
                                        padding: '1rem',
                                        background: '#fff',
                                        border: 'none',
                                        borderRadius: '50px',
                                        color: '#000',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    style={{
                                        padding: '1rem',
                                        background: 'linear-gradient(90deg, #00c2ff 0%, #007bff 100%)',
                                        border: 'none',
                                        borderRadius: '50px',
                                        color: '#fff',
                                        fontWeight: 600,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <SuccessModal
                        isOpen={isSubmitted}
                        onClose={() => {
                            setIsSubmitted(false);
                            onClose();
                        }}
                        title={"Your profile\nhas been\nsent!"}
                        message="We'll review your application soon."
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
};

const inputContainerStyle = {
    borderRadius: '12px',
    padding: '0.8rem 1.2rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.3s ease'
};

const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    color: '#aaa',
    fontSize: '1.1rem',
    outline: 'none',
    fontFamily: 'inherit'
};

export default ApplyModal;
