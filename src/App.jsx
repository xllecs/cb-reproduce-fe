import Home from './pages/Home'

import Cart from './components/cart/Cart'
import Navbar from './components/Navbar'

import './App.css'
import ProductView from './pages/ProductView'

import { BrowserRouter as Router, Routes, Route } from 'react-router'

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="products/" element={<ProductView />} /> */}
          <Route path="products/:item" element={<ProductView />} />
        </Routes>
      </Router>
      <Cart />
    </div>
  )
}

export default App
