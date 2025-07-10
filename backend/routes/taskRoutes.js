const express = require('express');
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const notificationController = require('../controllers/notificationController');

const router = express.Router();

router.use(protect);


router.route('/')
  .post(createTask)
  .get(getTasks);

router.route('/stats')
  .get(getTaskStats);

router.route('/notifications')
  .get(protect, notificationController.getNotifications);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

router.route('/:id/status')
  .patch(updateTaskStatus);

module.exports = router; 
