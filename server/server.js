const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');



const config = require('./config');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});


app.use(errorHandler);

const PORT = config.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
