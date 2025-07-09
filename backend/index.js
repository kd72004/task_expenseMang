const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

try {
  require('dotenv').config();
} catch (error) {
  console.log('No .env file found, using default values');
}

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');


const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());


app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/expenses', expenseRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'Expense Manager API is running' });
});


app.use(errorHandler);


app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || '123';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
