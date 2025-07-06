# Token Validation Middleware Guide

## How Token Authentication Works

### 1. Token Generation (During Login/Signup)
When a user logs in or signs up, a JWT token is generated:

```javascript
// In authController.js - login function
const user = await User.findOne({ email }).select('+password');

if (user && (await user.matchPassword(password))) {
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id), // 🔑 Token generated here
  });
}
```

### 2. Token Structure
The JWT token contains:
- **Header**: Algorithm info
- **Payload**: User ID and expiration time
- **Signature**: Encrypted with JWT_SECRET

Example token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjEyMzQ1Njc4OTAiLCJpYXQiOjE2OTM5MjM0NTYsImV4cCI6MTY5NDUyODI1Nn0.signature`

### 3. Token Validation Flow (Middleware)

When a user tries to access a protected route like `/api/auth/profile`, here's what happens:

#### Step 1: Check Authorization Header
```javascript
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  // Token exists and starts with "Bearer "
}
```

**Example Request:**
```
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Step 2: Extract Token
```javascript
token = req.headers.authorization.split(' ')[1];
// Splits "Bearer TOKEN" and gets "TOKEN"
```

#### Step 3: Verify Token
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// This checks:
// - Token is not expired
// - Token signature is valid
// - Token was created with correct secret
```

#### Step 4: Find User
```javascript
req.user = await User.findById(decoded.id).select('-password');
// Gets user data from database using ID from token
// Excludes password field for security
```

#### Step 5: Continue or Reject
```javascript
if (!req.user) {
  return res.status(401).json({ message: 'User not found' });
}
next(); // Continue to the actual route handler
```

### 4. Route Protection

Protected routes use the middleware:

```javascript
// In authRoutes.js
router.get('/profile', protect, getProfile);
//           ↑        ↑
//        route   middleware
```

### 5. Complete Flow Example

#### ✅ Valid Token Flow:
1. User sends request with valid token
2. Middleware extracts token from header
3. JWT.verify() validates token signature and expiration
4. User is found in database
5. `req.user` is set with user data
6. Request continues to `getProfile` function
7. Profile data is returned

#### ❌ Invalid Token Scenarios:

**No Token:**
```
GET /api/auth/profile
// No Authorization header
// Response: { "message": "Not authorized, no token" }
```

**Invalid Token:**
```
GET /api/auth/profile
Authorization: Bearer invalid_token_here
// Response: { "message": "Not authorized, token failed" }
```

**Expired Token:**
```
GET /api/auth/profile
Authorization: Bearer expired_token_here
// Response: { "message": "Not authorized, token failed" }
```

**User Not Found:**
```
GET /api/auth/profile
Authorization: Bearer valid_token_but_user_deleted
// Response: { "message": "User not found" }
```

### 6. Testing Token Validation

You can test the token validation using the test file:

```bash
# Start the server
npm run dev

# In another terminal, run the test
node test-token.js
```

This will show you:
- ✅ Successful token validation
- ❌ Failed token validation scenarios
- 🔑 How tokens are generated and used

### 7. Security Features

The middleware provides:
- **Token Verification**: Ensures token is valid and not tampered
- **Expiration Check**: Automatically checks if token has expired
- **User Validation**: Confirms user still exists in database
- **Error Handling**: Proper error messages for different failure scenarios
- **No Password Exposure**: User data is fetched without password field 