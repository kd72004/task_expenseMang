const express = require('express');
const {
  createExpense,
  getExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats,
  getExpenseCategories
} = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createExpense)
  .get(getExpenses);

router.route('/stats')
  .get(getExpenseStats);

router.route('/categories')
  .get(getExpenseCategories);

router.route('/:id')
  .get(getExpense)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router; 
