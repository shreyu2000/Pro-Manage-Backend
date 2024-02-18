const express = require('express');
const router = express.Router();
const { createTask, editTask, deleteTask, updateTaskColumn } = require('../controllers/task.controller.js');

// Route to create a new task
router.post('/', createTask);


// Route to edit a task
router.put('/:id', editTask);

// Route to delete a task
router.delete('/:id', deleteTask);

// Route to update the column status of a task
router.put('/:id/column', updateTaskColumn);

module.exports = router;
