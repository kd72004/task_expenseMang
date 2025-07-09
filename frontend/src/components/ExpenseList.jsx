import { useState, useEffect } from 'react';
import api from '../utils/api';

const ExpenseList = ({ onEditExpense, onDeleteExpense }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    startDate: '',
    endDate: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchExpenses();
    fetchStats();
  }, [filters]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      
      const response = await api.get(`/expenses?${params}`);
      setExpenses(response.data);
    } catch (error) {
      setError('Failed to fetch expenses');
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      
      const response = await api.get(`/expenses/stats?${params}`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDelete = async (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await api.delete(`/expenses/${expenseId}`);
        fetchExpenses();
        fetchStats();
        if (onDeleteExpense) onDeleteExpense(expenseId);
      } catch (error) {
        setError('Failed to delete expense');
      }
    }
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category) => {
    const colors = {
      'Food & Dining': 'bg-orange-100 text-orange-800',
      'Transportation': 'bg-blue-100 text-blue-800',
      'Shopping': 'bg-purple-100 text-purple-800',
      'Bills & Utilities': 'bg-red-100 text-red-800',
      'Entertainment': 'bg-pink-100 text-pink-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Education': 'bg-indigo-100 text-indigo-800',
      'Travel': 'bg-yellow-100 text-yellow-800',
      'Home & Garden': 'bg-teal-100 text-teal-800',
      'Personal Care': 'bg-rose-100 text-rose-800',
      'Work & Business': 'bg-gray-100 text-gray-800',
      'Gifts & Donations': 'bg-cyan-100 text-cyan-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Other'];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
 
      {stats && (
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
          <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            📊 Expense Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-indigo-600">₹{stats.totalAmount.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Total Amount</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{stats.totalCount}</p>
              <p className="text-sm text-gray-600">Total Expenses</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                ₹{stats.totalCount > 0 ? (stats.totalAmount / stats.totalCount).toFixed(2) : '0.00'}
              </p>
              <p className="text-sm text-gray-600">Average per Expense</p>
            </div>
          </div>
        </div>
      )}

     
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Categories</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Transportation">Transportation</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills & Utilities">Bills & Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Travel">Travel</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Work & Business">Work & Business</option>
              <option value="Gifts & Donations">Gifts & Donations</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setFilters({ category: '', startDate: '', endDate: '' });
                setSearchTerm('');
              }}
              className="w-full bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg shadow-gray-500/25 transition-all duration-200"
            >
              🧹 Clear Filters
            </button>
          </div>
        </div>
      </div>

     
      {error && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800 px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">⚠️</span>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      
      <div className="space-y-4">
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💰</div>
            <p className="text-gray-500 text-lg">No expenses found</p>
            <p className="text-gray-400 text-sm">Add your first expense to start tracking!</p>
          </div>
        ) : (
          filteredExpenses.map((expense) => (
            <div key={expense._id} className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{expense.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(expense.category)}`}>
                      {expense.category}
                    </span>
                    <span className="text-lg font-bold text-red-600">
                      ₹{expense.amount.toFixed(2)}
                    </span>
                  </div>
                  {expense.description && (
                    <p className="text-gray-600 mb-3">{expense.description}</p>
                  )}
                  <div className="text-sm text-gray-500">
                    <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                    <p>Added: {new Date(expense.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEditExpense(expense)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
