const ActivityLog = require('../models/ActivityLog');

const logActivity = async (userId, action, targetId = null, targetType = null) => {
    try {
        await ActivityLog.create({
            user: userId,
            action,
            targetId,
            targetType
        });
    } catch (error) {
        console.error('Activity Logging Error:', error.message);
    }
};

module.exports = logActivity;
