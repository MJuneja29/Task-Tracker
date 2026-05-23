const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true,
        enum: ['Login', 'Task Creation', 'Task Update', 'Task Deletion']
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false
    },
    targetType: {
        type: String,
        required: false,
        enum: ['Task', 'User']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);
