# Task & Expense Manager API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
- **POST** `/auth/signup`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get User Profile
- **GET** `/auth/profile`
- **Headers:** `Authorization: Bearer <token>`

---

## 📋 Task Endpoints

### Create Task
- **POST** `/tasks`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "Complete project",
  "description": "Finish the expense manager project",
  "priority": 5,
  "deadline": "2024-01-15T10:00:00.000Z",
  "status": "pending"
}
```

### Get All Tasks
- **GET** `/tasks`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `status` (optional): Filter by status (pending, in-progress, completed)
  - `priority` (optional): Filter by priority (1-5)

### Get Single Task
- **GET** `/tasks/:id`
- **Headers:** `Authorization: Bearer <token>`

### Update Task
- **PUT** `/tasks/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Same as create task

### Update Task Status
- **PATCH** `/tasks/:id/status`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "status": "completed"
}
```

### Delete Task
- **DELETE** `/tasks/:id`
- **Headers:** `Authorization: Bearer <token>`

### Get Task Statistics
- **GET** `/tasks/stats`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "total": 10,
  "completed": 5,
  "pending": 3,
  "inProgress": 2,
  "completionRate": 50
}
```

---

## 💰 Expense Endpoints

### Create Expense
- **POST** `/expenses`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "name": "Grocery shopping",
  "amount": 75.50,
  "description": "Weekly groceries from Walmart",
  "date": "2024-01-10T15:30:00.000Z",
  "category": "Food & Dining"
}
```

### Get All Expenses
- **GET** `/expenses`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `category` (optional): Filter by category
  - `startDate` (optional): Filter from date (YYYY-MM-DD)
  - `endDate` (optional): Filter to date (YYYY-MM-DD)

### Get Single Expense
- **GET** `/expenses/:id`
- **Headers:** `Authorization: Bearer <token>`

### Update Expense
- **PUT** `/expenses/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** Same as create expense

### Delete Expense
- **DELETE** `/expenses/:id`
- **Headers:** `Authorization: Bearer <token>`

### Get Expense Statistics
- **GET** `/expenses/stats`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters:**
  - `startDate` (optional): Start date for statistics
  - `endDate` (optional): End date for statistics
- **Response:**
```json
{
  "totalAmount": 1250.75,
  "totalCount": 25,
  "byCategory": [
    {
      "_id": "Food & Dining",
      "total": 450.25,
      "count": 8
    }
  ],
  "monthly": [
    {
      "_id": { "year": 2024, "month": 1 },
      "total": 1250.75,
      "count": 25
    }
  ]
}
```

### Get Expense Categories
- **GET** `/expenses/categories`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
[
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Bills & Utilities",
  "Entertainment",
  "Healthcare",
  "Education",
  "Travel",
  "Home & Garden",
  "Personal Care",
  "Work & Business",
  "Gifts & Donations",
  "Other"
]
```

---

## 📊 Data Models

### Task Model
```json
{
  "_id": "task_id",
  "user": "user_id",
  "name": "Task name",
  "description": "Task description",
  "priority": 5,
  "deadline": "2024-01-15T10:00:00.000Z",
  "status": "pending",
  "createdAt": "2024-01-10T10:00:00.000Z",
  "updatedAt": "2024-01-10T10:00:00.000Z"
}
```

### Expense Model
```json
{
  "_id": "expense_id",
  "user": "user_id",
  "name": "Expense name",
  "amount": 75.50,
  "description": "Expense description",
  "date": "2024-01-10T15:30:00.000Z",
  "category": "Food & Dining",
  "createdAt": "2024-01-10T10:00:00.000Z",
  "updatedAt": "2024-01-10T10:00:00.000Z"
}
```

---

## 🔧 Priority Levels
- **1** = Lowest priority
- **2** = Low priority
- **3** = Medium priority (default)
- **4** = High priority
- **5** = Highest priority

## 📈 Task Status
- **pending** = Not started yet
- **in-progress** = Currently working on it
- **completed** = Finished

## 🏷️ Expense Categories
- Food & Dining
- Transportation
- Shopping
- Bills & Utilities
- Entertainment
- Healthcare
- Education
- Travel
- Home & Garden
- Personal Care
- Work & Business
- Gifts & Donations
- Other

---

## 🚨 Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 404 Not Found
```json
{
  "message": "Task not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error"
}
```

---

## 🧪 Testing Examples

### Using curl:

**Create a task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test task",
    "description": "Test description",
    "priority": 3,
    "deadline": "2024-01-15T10:00:00.000Z"
  }'
```

**Create an expense:**
```bash
curl -X POST http://localhost:5000/api/expenses \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test expense",
    "amount": 50.00,
    "category": "Food & Dining",
    "date": "2024-01-10T15:30:00.000Z"
  }'
``` 