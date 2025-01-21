import { useState } from 'react'
import { Link } from 'react-router'

import '../assets/styles/pages/Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="login-wrapper">
      <div className="title">Login</div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          placeholder='Email' />

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
