import { useContext, useState } from "react"

import '../assets/styles/pages/Register.css'
import { Link, useNavigate } from "react-router"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const Register = () => {
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', formData)
      navigate('/account/login')
    } catch (e) {
      setMessage(e.response?.data?.error || 'Registration failed.')
    }
  }

  return (
    <div className="register-wrapper">
      <div className="title">Create account</div>

      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          id='username'
          name='username'
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Username"
        />

        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />

        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Password"
        />

        <input
          type='password'
          id='passwordConfirm'
          name='password_confirm'
          value={formData.password_confirm}
          onChange={handleChange}
          required
          placeholder="Confirm password"
        />

        <button type="submit">Create</button>
      </form>
      <Link to={'/account/login'}>Sign into account</Link>
    </div>
  )
}

export default Register
