import Home from './pages/Home'

import Cart from './components/cart/Cart'
import Navbar from './components/Navbar'

import './App.css'
import ProductView from './pages/ProductView'

import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Collections from './pages/Collections'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="products/" element={<ProductView />} /> */}
          <Route path="products/:item" element={<ProductView />} />
          <Route path="collections/:item" element={<Collections />} />
          <Route path="account/" element={<Dashboard />} />
          <Route path="account/login" element={<Login />} />
          <Route path="account/register" element={<Register />} />
        </Routes>
      </Router>
      <Cart />
      <Footer />
    </div>
  )
}

export default App
