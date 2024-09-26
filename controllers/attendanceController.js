const Attendance = require('../models/Attendance');

// Mark attendance
exports.markAttendance = async (req, res) => {
    const { employeeId } = req.body;

    if (!employeeId) {
        return res.status(400).json({ message: 'Employee ID is required' });
    }

    try {
        const attendance = new Attendance({ employeeId, status: 'Present' }); // Always marking as 'Present'
        await attendance.save();
        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get attendance records
exports.getAttendanceRecords = async (req, res) => {
    try {
        const records = await Attendance.find({ employeeId: req.params.employeeId });
        res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
