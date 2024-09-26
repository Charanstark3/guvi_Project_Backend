const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRATION } = require('../config/jwtConfig');

// Register a new user
exports.register = async (req, res) => {
    const { employeeName, employeeId, email, dateOfBirth, password } = req.body;

    try {
        const existingUser = await User.findOne({ employeeId });
        if (existingUser) {
            return res.status(400).json({ message: 'Employee ID already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ employeeName, employeeId, email, dateOfBirth, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login a user
exports.login = async (req, res) => {
    const { employeeId, password } = req.body;

    try {
        const user = await User.findOne({ employeeId });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        // Return user details along with the token
        res.status(200).json({ 
            token, 
            userId: user._id, 
            user: {
                employeeName: user.employeeName,
                employeeId: user.employeeId,
                email: user.email,
                dateOfBirth: user.dateOfBirth
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
