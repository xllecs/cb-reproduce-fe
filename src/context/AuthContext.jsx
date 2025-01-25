import axios from "axios"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    console.log(localStorage)
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens) : null;
  })
  const [user, setUser] = useState()
  
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      })
      setAuthTokens(response.data)
      localStorage.setItem("authTokens", JSON.stringify(response.data))
    } catch (error) {
      console.error("Login failed", error)
      throw error
    }
  }

  const logout = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem("authTokens")
  }

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
        refresh: authTokens.refresh,
      })
      const newTokens = { ...authTokens, access: response.data.access }
      setAuthTokens(newTokens)
      localStorage.setItem("authTokens", JSON.stringify(newTokens))
    } catch (e) {
      logout()
    }
  }

  useEffect(() => {
    if (authTokens) {
      const interval = setInterval(refreshAccessToken, 9 * 60 * 1000)
      return () => clearInterval(interval)
    }
  }, [authTokens])

  return (
    <AuthContext.Provider value={{ authTokens, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
