import { useState } from 'react'
import '../assets/styles/components/Footer.css'

const Footer = () => {
  const [formData, setFormData] = useState({
    email: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  return (
    <div className="footer-wrapper">
      <div className="brand-text">COLE BUXTON</div>
      <ul className='social-links'>
        
      </ul>
      <form>
        <input
          id='email'
          name='email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          required
          placeholder='Email'
        />
      </form>
    </div>
  )
}

export default Footer
