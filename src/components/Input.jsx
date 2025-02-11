import { useState } from "react"

import '../assets/styles/components/Input.css'

const Input = ({type, id, name, placeholder}) => {
  const [input, setInput] = useState('')

  const handleChange = (e) => {
    setInput(e.target.value) 
  }
  
  return (
    <div className="input-wrapper">
      <input
        type={type}
        id={id}
        name={id || name}
        value={input}
        onChange={handleChange}
        required
        placeholder={placeholder} />
    </div>
  )
}

export default Input
