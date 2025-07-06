# Expense Manager Backend

A Node.js backend API for the Expense Manager application with user authentication and database integration.

## Features

- User registration and login
- JWT-based authentication
- MongoDB database integration
- Password encryption with bcrypt
- Input validation
- Error handling middleware
- Security headers with helmet
- CORS support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense_manager
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/signup`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

#### Get User Profile
- **GET** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   └── errorHandler.js     # Error handling middleware
├── models/
│   └── User.js             # User model
├── routes/
│   └── authRoutes.js       # Authentication routes
├── utils/
│   └── generateToken.js    # JWT token generation
├── index.js                # Main server file
├── package.json            # Dependencies
└── README.md              # Documentation
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- Security headers with helmet
- CORS configuration
- Error handling

## Testing the API

You can test the API using tools like Postman, Insomnia, or curl:

### Register a new user:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get profile (with token):
```bash
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRE`: JWT token expiration time
- `NODE_ENV`: Environment (development/production)

## Error Handling

The API includes comprehensive error handling for:
- Invalid input data
- Duplicate email addresses
- Invalid JWT tokens
- Database connection errors
- Validation errors

All errors return appropriate HTTP status codes and error messages. 