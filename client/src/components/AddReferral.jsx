
import React, { useState } from 'react';
import axios from 'axios';

const AddReferral = ({ token, onReferralAdded }) => {
    const [candidateName, setCandidateName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [resume, setResume] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!resume) {
            setError('Please upload a resume');
            return;
        }

        const formData = new FormData();
        formData.append('candidateName', candidateName);
        formData.append('email', email);
        formData.append('role', role);
        formData.append('resume', resume);

        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            await axios.post('/api/referrals', formData, config);
            setSuccess('Referral added successfully!');
            setCandidateName('');
            setEmail('');
            setRole('');
            setResume(null);
            // Reset file input
            document.getElementById('resumeInput').value = '';

            if (onReferralAdded) onReferralAdded();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add referral');
        }
    };

    return (
        <div>
            <h3>Add New Referral</h3>
            {error && <div className="error-message">{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '15px' }}>{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Candidate Name:</label>
                    <input
                        type="text"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Resume (PDF only):</label>
                    <input
                        id="resumeInput"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setResume(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Submit Referral</button>
            </form>
        </div>
    );
};

export default AddReferral;
