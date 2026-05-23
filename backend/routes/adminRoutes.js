const express = require('express');
const router = express.Router();
const { 
    getUsers, 
    deleteUser, 
    updateUserStatus, 
    getAllTasks, 
    adminDeleteTask, 
    getActivityLogs, 
    getAnalytics 
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All routes require authentication and admin role
router.use(protect, adminOnly);

router.route('/users').get(getUsers);
router.route('/users/:id').delete(deleteUser);
router.route('/users/:id/status').put(updateUserStatus);

router.route('/tasks').get(getAllTasks);
router.route('/tasks/:id').delete(adminDeleteTask);

router.route('/logs').get(getActivityLogs);

router.route('/analytics').get(getAnalytics);

module.exports = router;
