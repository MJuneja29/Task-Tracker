const Task = require('../models/Task');
const logActivity = require('../utils/activityLogger');

// @desc    Get logged in user's tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    const { title, description, status } = req.body;

    try {
        if (!title || !description) {
            return res.status(400).json({ message: 'Please provide title and description' });
        }

        const task = await Task.create({
            title,
            description,
            status: status || 'Pending',
            createdBy: req.user._id
        });

        // Log activity
        await logActivity(req.user._id, 'Task Creation', task._id, 'Task');

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Make sure the logged in user matches the task creator
        if (task.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to update this task' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        // Log activity
        await logActivity(req.user._id, 'Task Update', task._id, 'Task');

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Make sure the logged in user matches the task creator
        if (task.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized to delete this task' });
        }

        await task.deleteOne();

        // Log activity
        await logActivity(req.user._id, 'Task Deletion', task._id, 'Task');

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
