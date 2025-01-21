import { useState } from "react"

import '../assets/styles/pages/Register.css'
import { Link } from "react-router"

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
  }

  return (
    <div className="register-wrapper">
      <div className="title">Create account</div>

      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          id='firstName'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
          required
          placeholder="First Name"
        />

        <input
          type='text'
          id='lastName'
          name='lastName'
          value={formData.lastName}
          onChange={handleChange}
          required
          placeholder="Last Name"
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

        <button type="submit">Create</button>
      </form>
      <Link to={'/account/login'}>Sign into account</Link>
    </div>
  )
}

export default Register
