import { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'

import '../assets/styles/pages/Login.css'
import { AuthContext } from '../context/AuthContext'
import Dashboard from './Dashboard'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(formData.username, formData.password)
      navigate('/account')
    } catch (e) {
      setError('Invalid username or password.')
    }
  }

  return (
    <div className="login-wrapper">
      <div className="title">Login</div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='username'
          name='username'
          value={formData.username}
          onChange={handleChange}
          required
          placeholder='Username' />

        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
          placeholder='Password' />

        <button type='submit'>Sign In</button>
      </form>
      <Link to={'/account/register'}>Create account</Link>
    </div>
  )
}

export default Login
