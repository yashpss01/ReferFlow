const mongoose = require('mongoose');

const referralSchema = mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    candidateName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Referred',
        enum: ['Referred', 'Interviewing', 'Hired', 'Rejected']
    },
    resumePath: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Referral = mongoose.model('Referral', referralSchema);
module.exports = Referral;
