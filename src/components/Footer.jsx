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
      <div className="footer-content">
        <div className="brand-text">COLE BUXTON</div>
        <ul className='social-links'>
          <div className="instagram"><a href='https://www.instagram.com/cole_buxton/?hl=en' target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M10.333 3.644a.25.25 0 1 1 0-.5m0 .5a.25.25 0 1 0 0-.5"/><path d="M.858 3.431A2.573 2.573 0 0 1 3.431.858h6.862a2.573 2.573 0 0 1 2.573 2.573v6.862a2.573 2.573 0 0 1-2.573 2.573H3.43a2.573 2.573 0 0 1-2.573-2.573V3.43Z"/><path d="M4.312 6.862a2.55 2.55 0 1 0 5.1 0a2.55 2.55 0 1 0-5.1 0"/></g></svg></a></div>
          <div className="yt"><a href='https://www.youtube.com/@cole_buxton' target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a></div>
          <div className="tiktok"><a href='https://www.tiktok.com/@colebuxton?lang=en' target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.357 7.75a.537.537 0 0 0-.495-.516a4.723 4.723 0 0 1-2.415-.938a4.85 4.85 0 0 1-1.887-3.3a.538.538 0 0 0-.517-.496h-2.108a.517.517 0 0 0-.517.527v12.59a2.794 2.794 0 0 1-2.974 2.762a2.815 2.815 0 0 1-2.51-3.711A2.836 2.836 0 0 1 9.93 12.78a.506.506 0 0 0 .558-.506V9.807s-.896-.063-1.202-.063a5.271 5.271 0 0 0-4.101 1.93a5.789 5.789 0 0 0-1.37 2.52a5.862 5.862 0 0 0 2.14 6.072A5.926 5.926 0 0 0 9.591 21.5a5.946 5.946 0 0 0 4.207-1.719a5.841 5.841 0 0 0 1.75-4.133V8.71a7.844 7.844 0 0 0 4.218 1.613a.517.517 0 0 0 .548-.527V7.751z"/></svg></a></div>
          <div className="x"><a href='https://x.com/cole__buxton?lang=en' target='_blank'><svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.751 3h3.067l-6.7 7.625L22 21h-6.172l-4.833-6.293L5.464 21h-3.07l7.167-8.155L2 3h6.328l4.37 5.752zm-1.076 16.172h1.7L7.404 4.732H5.58z"/></svg></a></div>
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
    </div>
  )
}

export default Footer
