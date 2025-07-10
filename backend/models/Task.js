const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a task name'],
    trim: true,
    maxlength: [100, 'Task name cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  priority: {
    type: Number,
    required: [true, 'Please provide a priority level'],
    min: [1, 'Priority must be at least 1'],
    max: [5, 'Priority cannot be more than 5'],
    default: 3
  },
  deadline: {
    type: Date,
    required: [true, 'Please provide a deadline']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  category: {
    type: String,
    trim: true,
    maxlength: [100, 'Category cannot be more than 100 characters'],
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Task', taskSchema); 