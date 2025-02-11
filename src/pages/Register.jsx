import { useContext, useState } from "react"

import { Link, useNavigate } from "react-router"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import Input from "../components/Input"

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
    <div className="authentication-wrapper">
      <div className="title">Create account</div>

      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <Input type='text' id='username' placeholder='Username' />
        <Input type='email' id='email' placeholder='Email' />
        <Input type='password' id='password' placeholder='Password' />
        <Input type='password' id='passwordConfirm' name='password_confirm' placeholder='Confirm password' />
        <button type="submit">Create</button>
      </form>
      <Link to={'/account/login'}>Sign into account</Link>
    </div>
  )
}

export default Register
