const Task = require('../models/tasks.model.js');
const ApiResponse = require('../utils/ApiResponse');

//CRUD 

// Controller function to create a new task
const createTask = async (req, res) => {
    try {
        const { title, priority, dueDate, checklist } = req.body;

        // Create a new task with default column status as 'To Do'
        const newTask = new Task({ title, priority, dueDate, checklist ,column: 'To Do' });
        await newTask.save();

        ApiResponse(res, 201, 'Task created successfully', newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

// Controller function to update the column status of a task
const updateTaskColumn = async (req, res) => {
    try {
        const taskId = req.params.id;
        const newColumn = req.body.column; // Assuming the column name is provided in the request body

        // Find the task by ID and update its column status
        const updatedTask = await Task.findByIdAndUpdate(taskId, { column: newColumn }, { new: true });

        if (!updatedTask) {
            return ApiResponse(res, 404, 'Task not found');
        }

        ApiResponse(res, 200, 'Task column updated successfully', updatedTask);
    } catch (error) {
        console.error('Error updating task column:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};


// Controller function to edit a task
const editTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, priority, dueDate, checklist } = req.body;

        // Find the task by ID and update its properties
        const updatedTask = await Task.findByIdAndUpdate(taskId, { title, priority, dueDate, checklist}, { new: true });

        if (!updatedTask) {
            return ApiResponse(res, 404, 'Task not found');
        }

        ApiResponse(res, 200, 'Task updated successfully', updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

// Controller function to delete a task
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





// Controller function to filter tasks created today
const filterTasksCreatedToday = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to beginning of the day
        const tasks = await Task.find({ createdAt: { $gte: today } });
        ApiResponse(res, 200, 'Tasks filtered successfully', tasks);
    } catch (error) {
        console.error('Error filtering tasks created today:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

// Controller function to filter tasks created this week
const filterTasksCreatedThisWeek = async (req, res) => {
    try {
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Set to Sunday of the current week
        startOfWeek.setHours(0, 0, 0, 0); // Set time to beginning of the day
        const tasks = await Task.find({ createdAt: { $gte: startOfWeek } });
        ApiResponse(res, 200, 'Tasks filtered successfully', tasks);
    } catch (error) {
        console.error('Error filtering tasks created this week:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

// Controller function to filter tasks created this month
const filterTasksCreatedThisMonth = async (req, res) => {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1); // Set to the first day of the current month
        startOfMonth.setHours(0, 0, 0, 0); // Set time to beginning of the day
        const tasks = await Task.find({ createdAt: { $gte: startOfMonth } });
        ApiResponse(res, 200, 'Tasks filtered successfully', tasks);
    } catch (error) {
        console.error('Error filtering tasks created this month:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

module.exports = {
    createTask,
    editTask,
    deleteTask,
    updateTaskColumn,
    filterTasksCreatedToday,
    filterTasksCreatedThisWeek,
    filterTasksCreatedThisMonth
};
