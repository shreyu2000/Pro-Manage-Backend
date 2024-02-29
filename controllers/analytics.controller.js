const Task = require('../models/tasks.model.js');
const ApiResponse = require('../utils/ApiResponse');

const getAllCounts = async (req, res) => {
    try {
        const userId = req.user._id;
        const counts = {
            backlog: await Task.countDocuments({ column: 'BACKLOG', user: userId }),
            todo: await Task.countDocuments({ column: 'TO-DO', user: userId }),
            inProgress: await Task.countDocuments({ column: 'PROGRESS', user: userId }),
            completed: await Task.countDocuments({ column: 'DONE', user: userId }),
            lowPriority: await Task.countDocuments({ priority: 'LOW', user: userId }),
            moderatePriority: await Task.countDocuments({ priority: 'MODERATE', user: userId }),
            highPriority: await Task.countDocuments({ priority: 'HIGH', user: userId }),
            dueDate: await Task.countDocuments({ dueDate: { $exists: true }, user: userId })
        };
        ApiResponse(res, 200, 'Counts fetched successfully', counts);
    } catch (error) {
        console.error('Error fetching counts:', error);
        ApiResponse(res, 500, 'Internal server error');
    }
};

module.exports = {
    getAllCounts
};





















// const Task = require('../models/tasks.model.js');
// const ApiResponse = require('../utils/ApiResponse.js');

// //counts 
// // Count tasks in the "Backlog" column
// const backlogTasksCount = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const count = await Task.countDocuments({ column: 'BACKLOG', user: userId });
//         ApiResponse(res, 200, 'Backlog tasks count fetched successfully', { count });
//     } catch (error) {
//         console.error('Error counting backlog tasks:', error);
//         ApiResponse(res, 500, 'Internal server error');
//     }
// };


// // Count tasks in the "To-do" column
// const todoTasksCount = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const count = await Task.countDocuments({ column: 'TO-DO', user: userId });
//         ApiResponse(res, 200, 'To-do tasks count fetched successfully', { count });
//     } catch (error) {
//         console.error('Error counting to-do tasks:', error);
//         ApiResponse(res, 500, 'Internal server error');
//     }
// };

// // Count tasks in the "In-Progress" column
// const inProgressTasksCount = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const count = await Task.countDocuments({ column: 'PROGRESS', user: userId });
//         ApiResponse(res, 200, 'In-progress tasks count fetched successfully', { count });
//     } catch (error) {
//         console.error('Error counting in-progress tasks:', error);
//         ApiResponse(res, 500, 'Internal server error');
//     }
// };

// // Count tasks in the "Completed" column
// const completedTasksCount = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const count = await Task.countDocuments({ column: 'DONE', user: userId });
//         ApiResponse(res, 200, 'Completed tasks count fetched successfully', { count });
//     } catch (error) {
//         console.error('Error counting completed tasks:', error);
//         ApiResponse(res, 500, 'Internal server error');
//     }
// };

// // Count tasks with "Low" priority
// const lowPriorityTasksCount = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const count = await Task.countDocuments({ priority: 'LOW', user: userId });
//         ApiResponse(res, 200, 'Low priority tasks count fetched successfully', { count });
//     } catch (error) {
//         console.error('Error counting low priority tasks:', error);
//         ApiResponse(res, 500, 'Internal server error');
//     }
// };


// // Count tasks with "Moderate" priority
// const moderatePriorityTasksCount = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const count = await Task.countDocuments({ priority: 'MODERATE', user: userId });
//         ApiResponse(res, 200, 'Moderate priority tasks count fetched successfully', { count });
//     } catch (error) {
//         console.error('Error counting moderate priority tasks:', error);
//         ApiResponse(res, 500, 'Internal server error');
//     }
// };


// // Count tasks with "High" priority
// const highPriorityTasksCount = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const count = await Task.countDocuments({ priority: 'HIGH', user: userId });
//         ApiResponse(res, 200, 'High priority tasks count fetched successfully', { count });
//     } catch (error) {
//         console.error('Error counting high priority tasks:', error);
//         ApiResponse(res, 500, 'Internal server error');
//     }
// };


// // Count tasks with due dates
// const dueDateTasksCount = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const count = await Task.countDocuments({ dueDate: { $exists: true }, user: userId });
//         ApiResponse(res, 200, 'Tasks with due dates count fetched successfully', { count });
//     } catch (error) {
//         console.error('Error counting tasks with due dates:', error);
//         ApiResponse(res, 500, 'Internal server error');
//     }
// };

// module.exports = {
//     backlogTasksCount,
//     todoTasksCount,
//     inProgressTasksCount,
//     completedTasksCount,
//     lowPriorityTasksCount,
//     moderatePriorityTasksCount,
//     highPriorityTasksCount,
//     dueDateTasksCount
// };
