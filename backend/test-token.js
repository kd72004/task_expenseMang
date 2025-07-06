const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test the token system
async function testTokenSystem() {
  console.log('🚀 Testing Token System...\n');

  try {
    // 1. Register a new user (this will return a token)
    console.log('1️⃣ Registering a new user...');
    const signupResponse = await axios.post(`${BASE_URL}/auth/signup`, {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('✅ Signup successful!');
    console.log('📧 Email:', signupResponse.data.email);
    console.log('🔑 Token received:', signupResponse.data.token.substring(0, 20) + '...');
    console.log('');

    // 2. Login with the same user (this will return a new token)
    console.log('2️⃣ Logging in with the same user...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    console.log('✅ Login successful!');
    console.log('🔑 New token received:', loginResponse.data.token.substring(0, 20) + '...');
    console.log('');

    // 3. Access protected route with token
    console.log('3️⃣ Accessing protected profile route...');
    const token = loginResponse.data.token;
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('✅ Profile access successful!');
    console.log('👤 User profile:', profileResponse.data);
    console.log('');

    // 4. Try to access protected route without token (should fail)
    console.log('4️⃣ Trying to access profile without token...');
    try {
      await axios.get(`${BASE_URL}/auth/profile`);
    } catch (error) {
      console.log('❌ Access denied (as expected):', error.response.data.message);
    }
    console.log('');

    // 5. Try to access with invalid token (should fail)
    console.log('5️⃣ Trying to access profile with invalid token...');
    try {
      await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': 'Bearer invalid_token_here'
        }
      });
    } catch (error) {
      console.log('❌ Access denied (as expected):', error.response.data.message);
    }

    console.log('\n🎉 Token system test completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testTokenSystem();
}

module.exports = { testTokenSystem }; 