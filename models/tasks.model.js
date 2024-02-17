const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
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
        enum: ['Backlog', 'To Do', 'In Progress', 'Done'],
        default: 'To Do'
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
