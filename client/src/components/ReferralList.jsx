
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

    const deleteReferral = async (id) => {
        if (window.confirm('Are you sure you want to delete this referral?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.delete(`/api/referrals/${id}`, config);
                fetchReferrals();
            } catch (error) {
                console.error('Error deleting referral:', error);
                alert('Failed to delete referral');
            }
        }
    };

    return (
        <div className="referral-list-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>My Referrals</h2>
                <button onClick={logout} className="btn btn-danger">Logout</button>
            </div>

            <AddReferral token={token} onReferralAdded={fetchReferrals} />

            <h3>Existing Referrals</h3>
            {error && <div className="error-message">{error}</div>}

            {referrals.length === 0 ? (
                <p>No referrals yet.</p>
            ) : (
                <div className="referral-grid">
                    {referrals.map((referral) => (
                        <div key={referral._id} className="referral-card">
                            <div className="card-header">
                                <h4>{referral.candidateName}</h4>
                                <span className={`status-badge status-${referral.status.toLowerCase()}`}>{referral.status}</span>
                            </div>
                            <p><strong>Role:</strong> {referral.role}</p>
                            <p><strong>Email:</strong> {referral.email}</p>

                            <div className="card-actions">
                                <a
                                    href={`/${referral.resumePath}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                >
                                    View Resume
                                </a>
                                <button
                                    onClick={() => deleteReferral(referral._id)}
                                    className="btn btn-delete"
                                    style={{ marginLeft: '10px', backgroundColor: '#dc3545', color: 'white' }}
                                >
                                    Delete
                                </button>
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <UpdateStatus
                                    token={token}
                                    referral={referral}
                                    onUpdate={fetchReferrals}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReferralList;
