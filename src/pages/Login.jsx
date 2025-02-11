import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'

import { AuthContext } from '../context/AuthContext'
import Dashboard from './Dashboard'
import Input from '../components/Input'

import '../assets/styles/pages/Authentication.css'

const Login = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

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
    <div className="authentication-wrapper">
      <div className="title">Login</div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <Input type='text' id='username' placeholder='Username' />
        <Input type='password' id='password' placeholder='Password' />
        <button type='submit'>Sign In</button>
      </form>
      <Link to={'/account/register'}>Create account</Link>
    </div>
  )
}

export default Login
