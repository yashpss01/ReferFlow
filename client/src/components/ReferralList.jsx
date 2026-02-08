
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddReferral from './AddReferral';
import UpdateStatus from './UpdateStatus';

const ReferralList = ({ token, logout }) => {
    const [referrals, setReferrals] = useState([]);
    const [error, setError] = useState('');

    const fetchReferrals = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const { data } = await axios.get('/api/referrals', config);
            setReferrals(data);
        } catch (err) {
            setError('Failed to fetch referrals');
        }
    };

    useEffect(() => {
        fetchReferrals();
    }, [token]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>My Referrals</h2>
                <button onClick={logout} style={{ background: '#d9534f' }}>Logout</button>
            </div>

            <AddReferral token={token} onReferralAdded={fetchReferrals} />

            <h3>Existing Referrals</h3>
            {error && <div className="error-message">{error}</div>}

            {referrals.length === 0 ? (
                <p>No referrals yet.</p>
            ) : (
                referrals.map((referral) => (
                    <div key={referral._id} className="referral-card">
                        <h4>{referral.candidateName} ({referral.role})</h4>
                        <p><strong>Email:</strong> {referral.email}</p>
                        <p><strong>Status:</strong> <span className="status-badge">{referral.status}</span></p>
                        <p>
                            <strong>Resume:</strong>
                            <a
                                href={`/${referral.resumePath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ marginLeft: '10px' }}
                            >
                                Download Resume
                            </a>
                        </p>
                        <UpdateStatus
                            token={token}
                            referral={referral}
                            onUpdate={fetchReferrals}
                        />
                    </div>
                ))
            )}
        </div>
    );
};

export default ReferralList;
