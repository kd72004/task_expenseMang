# Frontend Authentication System

This frontend implements a complete authentication system with login, signup, and dashboard functionality.

## Features

### 🔐 Authentication Flow
- **Login Page**: Email and password authentication
- **Signup Page**: User registration with name, email, and password
- **Dashboard**: Protected area shown after successful authentication
- **Logout**: Clear localStorage and return to login

### 💾 Local Storage Management
- User data is stored in localStorage after successful login/signup
- **Important**: The `_id` field is automatically removed from the payload before storage
- Token is included for API authentication
- Automatic cleanup on logout

### 🎨 UI/UX Features
- Modern, responsive design using Tailwind CSS
- Form validation (password confirmation, length requirements)
- Loading states during API calls
- Error handling and display
- Smooth transitions between login/signup forms

## File Structure

```
src/
├── components/
│   ├── Login.jsx          # Login form component
│   ├── Signup.jsx         # Signup form component
│   └── Dashboard.jsx      # Dashboard after authentication
├── utils/
│   └── api.js            # API configuration with interceptors
└── App.jsx               # Main app with auth flow logic
```

## API Integration

### Backend Endpoints Used
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Request/Response Format
**Login Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Signup Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (both login/signup):**
```json
{
  "_id": "user_id_here",
  "name": "John Doe",
  "email": "user@example.com",
  "token": "jwt_token_here"
}
```

### Local Storage Format
The `_id` is removed before storage:
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "token": "jwt_token_here"
}
```

## Usage

1. **Start the backend server** (make sure it's running on `http://localhost:5000`)
2. **Start the frontend development server**:
   ```bash
   cd frontend
   npm run dev
   ```
3. **Open your browser** and navigate to the frontend URL
4. **Create an account** or **login** with existing credentials
5. **Access the dashboard** after successful authentication

## Security Features

- **Token-based authentication** with automatic header injection
- **Automatic token refresh** handling
- **401 error handling** - automatically logs out user on token expiration
- **Password validation** (minimum 6 characters)
- **Password confirmation** check on signup

## Customization

### Changing Backend URL
Edit `src/utils/api.js`:
```javascript
const api = axios.create({
  baseURL: 'http://your-backend-url:port/api',
  // ...
});
```

### Adding Protected Routes
Use the user state in App.jsx to conditionally render components:
```javascript
if (user) {
  return <ProtectedComponent />;
} else {
  return <Login />;
}
```

### Styling
All components use Tailwind CSS classes. Modify the className attributes to customize the appearance. 