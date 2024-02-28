const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/dbconnect.js');
require('dotenv').config();

// Database connection
connectDB();

// Middleware
// 1. CORS
app.use(cors());

// 2. Body parsers for JSON and URL-encoded data
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Health API endpoint
app.get('/api/v1/health', (req, res) => {
    res.status(200).json({
        status: 'active',
        service: 'Pro Manage',
        time: new Date(),
    });
});

// Routers
const userRoutes = require('./routes/user.routes.js');
const taskRoutes = require('./routes/task.routes.js');
const analyticsRoutes = require('./routes/analytics.routes.js'); // Import analytics routes


// Mounting routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/analytics', analyticsRoutes); // Mount analytics routes


// Server listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
