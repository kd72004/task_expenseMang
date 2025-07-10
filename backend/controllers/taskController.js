const Task = require('../models/Task');
const Notification = require('../models/Notification');


const createTask = async (req, res) => {
  try {
    const { name, description, priority, deadline, status, assignee, category } = req.body;

    const task = await Task.create({
      user: req.user._id,
      name,
      description,
      priority,
      deadline,
      status,
      assignee,
      category
    });

    // Create notification for assignee if assigned
    if (assignee) {
      await Notification.create({
        user: assignee,
        message: `You have been assigned a new task: ${name}`,
        task: task._id
      });
    }

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getTasks = async (req, res) => {
  try {
    const { status, priority, category, assignee } = req.query;
    let query = { user: req.user._id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = { $regex: category, $options: 'i' };
    if (assignee) query.assignee = assignee;

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateTask = async (req, res) => {
  try {
    const { name, description, priority, deadline, status, assignee, category } = req.body;

    let task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if assignee is changed
    const assigneeChanged = assignee && String(task.assignee) !== String(assignee);

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { name, description, priority, deadline, status, assignee, category },
      { new: true, runValidators: true }
    );

    // Notify new assignee if changed
    if (assigneeChanged) {
      await Notification.create({
        user: assignee,
        message: `You have been assigned a new task: ${name}`,
        task: task._id
      });
    }

    res.json(task);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    let task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    console.error('Update task status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ user: req.user._id });
    const completedTasks = await Task.countDocuments({ user: req.user._id, status: 'completed' });
    const pendingTasks = await Task.countDocuments({ user: req.user._id, status: 'pending' });
    const inProgressTasks = await Task.countDocuments({ user: req.user._id, status: 'in-progress' });

    res.json({
      total: totalTasks,
      completed: completedTasks,
      pending: pendingTasks,
      inProgress: inProgressTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    });
  } catch (error) {
    console.error('Get task stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  getTaskStats
}; 
