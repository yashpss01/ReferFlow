
import React, { useState } from 'react';
import axios from 'axios';

const UpdateStatus = ({ token, referral, onUpdate }) => {
    const [status, setStatus] = useState(referral.status);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setLoading(true);

        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios.put(`/api/referrals/${referral._id}`, { status: newStatus }, config);
            onUpdate();
        } catch (error) {
            alert('Failed to update status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: '10px' }}>
            <label>Update Status: </label>
            <select value={status} onChange={handleUpdate} disabled={loading}>
                <option value="Referred">Referred</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
            </select>
            {loading && <span> Updating...</span>}
        </div>
    );
};

export default UpdateStatus;
