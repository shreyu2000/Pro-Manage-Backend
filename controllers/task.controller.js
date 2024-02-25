const Task = require('../models/tasks.model.js');
const ApiResponse = require('../utils/ApiResponse');

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, priority, dueDate, checklist } = req.body;
        const userId = req.user._id;

        // Create task with default column state 'To Do'
        const newTask = new Task({ title, priority, dueDate, checklist, column: 'To Do', user: userId });
        await newTask.save();
        
        ApiResponse(res, 201, 'Task created successfully', newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

// Get all tasks for a user
const getAllTasks = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({ user: userId });
        ApiResponse(res, 200, 'Tasks fetched successfully', tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, priority, dueDate, checklist } = req.body;
        
        // Find the task by ID and update its properties
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, priority, dueDate, checklist }, // Exclude 'column' from the update object
            { new: true }
        );

        if (!updatedTask) {
            return ApiResponse(res, 404, 'Task not found');
        }

        ApiResponse(res, 200, 'Task updated successfully', updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // Find the task by ID and delete it
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return ApiResponse(res, 404, 'Task not found');
        }

        ApiResponse(res, 200, 'Task deleted successfully', deletedTask);
    } catch (error) {
        console.error('Error deleting task:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

// Update column state of a task
const updateTaskColumn = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { column } = req.body;
        const userId = req.user._id;

        // Validate user ownership of the task before updating
        const task = await Task.findOne({ _id: taskId, user: userId });
        if (!task) {
            return ApiResponse(res, 404, 'Task not found');
        }

        // Update the column state of the task
        task.column = column;
        await task.save();

        ApiResponse(res, 200, 'Task column state updated successfully', task);
    } catch (error) {
        console.error('Error updating task column state:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};


module.exports = {
    updateTaskColumn,
    createTask,
    getAllTasks,
    updateTask,
    deleteTask
};
