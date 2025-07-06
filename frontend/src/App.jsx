import { useState, useEffect } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleSignup = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const switchToSignup = () => {
    setIsLogin(false)
  }

  const switchToLogin = () => {
    setIsLogin(true)
  }

  // If user is logged in, show dashboard
  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  // If user is not logged in, show login or signup
  return (
    <>
      {isLogin ? (
        <Login onLogin={handleLogin} switchToSignup={switchToSignup} />
      ) : (
        <Signup onSignup={handleSignup} switchToLogin={switchToLogin} />
      )}
    </>
  )
}

export default App
