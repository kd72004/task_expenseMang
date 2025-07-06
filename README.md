# 🎯💰 Task & Expense Manager

A modern, AI-inspired web application for managing tasks and expenses with a beautiful gradient UI and real-time updates.

![Task & Expense Manager](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔐 Authentication System
- **Secure Login/Signup** with JWT tokens
- **Local Storage** management 
- **Automatic token refresh** and error handling
- **Protected routes** and user sessions

### 📋 Task Management
- **Create, Read, Update, Delete** tasks
- **Priority levels** (1-5 scale)
- **Status tracking** (Pending, In Progress, Completed)
- **Deadline management** with date picker
- **Advanced filtering** by status and priority
- **Real-time search** functionality
- **Beautiful task cards** with hover effects

### 💰 Expense Management
- **Complete CRUD operations** for expenses
- **Category-based organization**
- **Amount tracking** in Indian Rupees (₹)
- **Date-based filtering** and search
- **Expense statistics** and analytics
- **Visual category indicators** with color coding

### 🎨 Modern UI/UX
- **Gradient backgrounds** and glassmorphism effects
- **Smooth animations** and transitions
- **Responsive design** for all devices
- **Emoji icons** for better visual appeal
- **Backdrop blur** and modern shadows
- **AI-inspired color scheme** 

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (optional - uses defaults)
# MONGODB_URI=mongodb://localhost:27017/expense_manager
# JWT_SECRET=your_secret_key
# PORT=5000

# Start the server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
task_expenseManag/
├── backend/
│   ├── controllers/          # API controllers
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── expenseController.js
│   ├── models/              # MongoDB schemas
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── Expense.js
│   ├── routes/              # API routes
│   ├── middleware/          # Auth & error handling
│   ├── utils/               # JWT generation
│   └── config/              # Database configuration
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── TaskList.jsx
    │   │   ├── TaskForm.jsx
    │   │   ├── ExpenseList.jsx
    │   │   └── ExpenseForm.jsx
    │   ├── utils/           # API utilities
    │   └── App.jsx          # Main app component
    └── package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Tasks
- `GET /api/tasks` - Get all tasks (with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

### Expenses
- `GET /api/expenses` - Get all expenses (with filters)
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/:id` - Get single expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/stats` - Get expense statistics
- `GET /api/expenses/categories` - Get expense categories

## 🎨 UI Components

### Modern Design Elements
- **Glassmorphism cards** with backdrop blur
- **Gradient buttons** with hover effects
- **Smooth transitions** and animations
- **Emoji icons** for better UX
- **Responsive grid layouts**
- **Modern form inputs** with focus states

### Color Scheme
- **Primary**: Purple to Blue gradients
- **Success**: Green gradients
- **Error**: Red to Pink gradients
- **Background**: Slate to Blue gradients
- **Cards**: White with transparency

## 🔒 Security Features

- **JWT token authentication**
- **Password hashing** with bcrypt
- **Protected API routes**
- **Input validation** and sanitization
- **CORS configuration**
- **Helmet security headers**

## 📊 Data Models

### User Model
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  createdAt: Date
}
```

### Task Model
```javascript
{
  user: ObjectId,
  name: String,
  description: String,
  priority: Number (1-5),
  deadline: Date,
  status: String (pending/in-progress/completed),
  createdAt: Date,
  updatedAt: Date
}
```

### Expense Model
```javascript
{
  user: ObjectId,
  name: String,
  amount: Number,
  description: String,
  date: Date,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Backend Deployment
```bash
# Set environment variables
NODE_ENV=production
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secure_secret
PORT=5000

# Start production server
npm start
```

### Frontend Deployment
```bash
# Build for production
npm run build

# Deploy to your preferred platform
# (Vercel, Netlify, AWS, etc.)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **React** for the frontend framework
- **Express.js** for the backend API
- **MongoDB** for the database
- **Tailwind CSS** for styling
- **JWT** for authentication

---

<div align="center">

**Made with ❤️ and ☕ by Kalyani Dave**

</div> 
