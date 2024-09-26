const express = require('express');
const { markAttendance, getAttendanceRecords } = require('../controllers/attendanceController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/mark', authenticateToken, markAttendance);
router.get('/:employeeId', authenticateToken, getAttendanceRecords);

module.exports = router;
