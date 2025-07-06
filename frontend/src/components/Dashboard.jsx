import { useEffect, useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
// import api from '../utils/api';

const Dashboard = ({ user, onLogout }) => {
  const [userData, setUserData] = useState(user);
  const [activeTab, setActiveTab] = useState('tasks');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [refreshTasks, setRefreshTasks] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Expense states
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [refreshExpenses, setRefreshExpenses] = useState(0);

  useEffect(() => {
    // Get user data from localStorage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    // Call the onLogout callback
    onLogout();
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleTaskSave = () => {
    setShowTaskForm(false);
    setEditingTask(null);
    // Trigger task list refresh
    setRefreshTasks(prev => prev + 1);
    // Show success message
    setSuccessMessage(editingTask ? 'Task updated successfully!' : 'Task created successfully!');
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleTaskCancel = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  // Expense handlers
  const handleAddExpense = () => {
    setEditingExpense(null);
    setShowExpenseForm(true);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowExpenseForm(true);
  };

  const handleExpenseSave = () => {
    setShowExpenseForm(false);
    setEditingExpense(null);
    // Trigger expense list refresh
    setRefreshExpenses(prev => prev + 1);
    // Show success message
    setSuccessMessage(editingExpense ? 'Expense updated successfully!' : 'Expense added successfully!');
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleExpenseCancel = () => {
    setShowExpenseForm(false);
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Expense & Task Manager
              </h1>
              
              {/* Navigation Tabs */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'tasks'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/60 backdrop-blur-sm'
                  }`}
                >
                  📋 Tasks
                </button>
                <button
                  onClick={() => setActiveTab('expenses')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === 'expenses'
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white/60 backdrop-blur-sm'
                  }`}
                >
                  💰 Expenses
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                👋 Welcome, {userData?.name}!
              </span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg shadow-red-500/25 transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              {/* Success Message */}
              {successMessage && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎉</span>
                    <span className="font-medium">{successMessage}</span>
                  </div>
                </div>
              )}

              {/* Task Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  🎯 Task Management
                </h2>
                <button
                  onClick={handleAddTask}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/25 transition-all duration-200 flex items-center space-x-2"
                >
                  <span>✨</span>
                  <span>Add New Task</span>
                </button>
              </div>

              {/* Task Form Modal */}
              {showTaskForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                  <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                    <TaskForm
                      task={editingTask}
                      onSave={handleTaskSave}
                      onCancel={handleTaskCancel}
                    />
                  </div>
                </div>
              )}

              {/* Task List */}
              <TaskList
                key={refreshTasks} // Force re-render when refreshTasks changes
                onEditTask={handleEditTask}
                onDeleteTask={() => setRefreshTasks(prev => prev + 1)}
                onStatusChange={() => setRefreshTasks(prev => prev + 1)}
              />
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-6">
              {/* Success Message */}
              {successMessage && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl shadow-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎉</span>
                    <span className="font-medium">{successMessage}</span>
                  </div>
                </div>
              )}

              {/* Expense Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  💰 Expense Management
                </h2>
                <button
                  onClick={handleAddExpense}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium shadow-lg shadow-purple-500/25 transition-all duration-200 flex items-center space-x-2"
                >
                  <span>✨</span>
                  <span>Add New Expense</span>
                </button>
              </div>

              {/* Expense Form Modal */}
              {showExpenseForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                  <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
                    <ExpenseForm
                      expense={editingExpense}
                      onSave={handleExpenseSave}
                      onCancel={handleExpenseCancel}
                    />
                  </div>
                </div>
              )}

              {/* Expense List */}
              <ExpenseList
                key={refreshExpenses} // Force re-render when refreshExpenses changes
                onEditExpense={handleEditExpense}
                onDeleteExpense={() => setRefreshExpenses(prev => prev + 1)}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 