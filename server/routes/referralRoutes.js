const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Referral = require('../models/Referral');
const { protect } = require('../middleware/authMiddleware');

// Multer configing
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/resumes/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function checkFileType(file, cb) {
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('PDF only!'));
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 2000000 }, // 2MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

// Create referral with resume upload
router.post('/', protect, upload.single('resume'), async (req, res) => {
    try {
        const { candidateName, email, role } = req.body;

        if (!req.file) {
            res.status(400);
            throw new Error('Please upload a resume (PDF only)');
        }

        const referral = await Referral.create({
            employeeName: req.user.name, // From auth token
            candidateName,
            email,
            role,
            status: 'Referred',
            resumePath: req.file.path
        });

        res.status(201).json(referral);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Get all referrals
router.get('/', protect, async (req, res) => {
    try {
        const referrals = await Referral.find({}).sort({ createdAt: -1 });
        res.json(referrals);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
});

// Update referral status
router.put('/:id', protect, async (req, res) => {
    try {
        const { status } = req.body;
        const referral = await Referral.findById(req.params.id);

        if (referral) {
            referral.status = status || referral.status;
            const updatedReferral = await referral.save();
            res.json(updatedReferral);
        } else {
            res.status(404);
            throw new Error('Referral not found');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});


// Delete a referral
router.delete('/:id', protect, async (req, res) => {
    try {
        const referral = await Referral.findById(req.params.id);

        if (referral) {
            await referral.deleteOne();
            res.json({ message: 'Referral removed' });
        } else {
            res.status(404);
            throw new Error('Referral not found');
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

module.exports = router;
