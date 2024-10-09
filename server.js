const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const attendanceRoutes = require('./routes/attendance');
const leaveRoutes = require('./routes/leave');

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
connectDB();

// CORS configuration to allow requests from your Netlify frontend
const corsOptions = {
  origin: 'https://employee-dashboard-management-zen.netlify.app',  // Replace with your frontend URL
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS configuration
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leave', leaveRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
