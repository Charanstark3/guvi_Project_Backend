const Leave = require('../models/Leave');

// Apply for leave
exports.applyLeave = async (req, res) => {
    const { leaveType, startDate, endDate } = req.body;
    const employeeId = req.userId; // Get employee ID from the authenticated user

    try {
        const leave = new Leave({ employeeId, leaveType, startDate, endDate });
        await leave.save();
        res.status(201).json({ message: 'Leave applied successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get leave records for an employee
exports.getLeaveRecords = async (req, res) => {
    const { employeeId } = req.params;

    try {
        const records = await Leave.find({ employeeId });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
