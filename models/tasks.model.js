const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['LOW', 'MODERATE', 'HIGH'],
        required: true
    },
    dueDate: {
        type: Date
    },
    checklist: [{
        title: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            default: false
        }
    }],
    column: {
        type: String,
        enum: ['BACKLOG', 'TO-DO', 'PROGRESS', 'DONE'],
        default: 'To Do'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
