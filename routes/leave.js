const express = require('express');
const { applyLeave, getLeaveRecords } = require('../controllers/leaveController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply for leave
router.post('/apply', authenticateToken, applyLeave);

// Get leave records for a specific employee
router.get('/:employeeId', authenticateToken, getLeaveRecords);

module.exports = router;
