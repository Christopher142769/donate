// Backend Node.js/Express pour MongoDB
// Installation: npm install express mongoose cors dotenv

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/laura-gourmet';

console.log('🔌 Tentative de connexion à MongoDB:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@')); // Masquer le mot de passe dans les logs

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
})
.catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('💡 Assurez-vous que MongoDB est démarré: sudo systemctl start mongod');
    process.exit(1);
});

// Donor Schema
const donorSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contact: { type: String, required: true },
    type: { type: String, enum: ['cash', 'nature'], required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const Donor = mongoose.model('Donor', donorSchema);

// Routes

// Get all donors
app.get('/api/donors', async (req, res) => {
    try {
        const { type } = req.query;
        let query = {};
        if (type && type !== 'all') {
            query.type = type;
        }
        
        const donors = await Donor.find(query).sort({ date: -1 });
        res.json(donors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new donor
app.post('/api/donors', async (req, res) => {
    try {
        const { firstName, lastName, contact, type } = req.body;
        
        if (!firstName || !lastName || !contact || !type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const donor = new Donor({
            firstName,
            lastName,
            contact,
            type
        });
        
        await donor.save();
        res.status(201).json(donor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
    try {
        const total = await Donor.countDocuments();
        const cash = await Donor.countDocuments({ type: 'cash' });
        const nature = await Donor.countDocuments({ type: 'nature' });
        
        res.json({
            total,
            cash,
            nature
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

