const User = require('../models/User');
const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.deleteOne();
        // Also delete their tasks and activity logs if desired, or keep them.
        await Task.deleteMany({ createdBy: req.params.id });
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user status
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
const updateUserStatus = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            status: updatedUser.status
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all tasks
// @route   GET /api/admin/tasks
// @access  Private/Admin
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({}).populate('createdBy', 'name email').sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete any task
// @route   DELETE /api/admin/tasks/:id
// @access  Private/Admin
const adminDeleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        await task.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get activity logs
// @route   GET /api/admin/logs
// @access  Private/Admin
const getActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find({})
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(100); // limit to latest 100 for performance
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({ status: 'Completed' });
        const pendingTasks = await Task.countDocuments({ status: 'Pending' });

        res.status(200).json({
            totalUsers,
            totalTasks,
            completedTasks,
            pendingTasks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    deleteUser,
    updateUserStatus,
    getAllTasks,
    adminDeleteTask,
    getActivityLogs,
    getAnalytics
};
