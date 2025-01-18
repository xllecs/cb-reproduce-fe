import { useDispatch } from 'react-redux'
import { openCart } from '../redux/cart'

import '../assets/styles/components/Navbar.css'

const Navbar = () => {
  const dispatch = useDispatch()

  const onOpenCart = () => {
    dispatch(openCart())
  }

  return (
    <div className="navbar-wrapper">
      <ul className='navbar-left'>
        <li>NEW LAUNCHES</li>
        <li>SHOP</li>
        <li>INFO</li>
      </ul>
      <div className="site-name">COLE BUXTON</div>
      <ul className='navbar-right'>
        <li><img className='navbar-icon' src='src/assets/icons/account.png' /></li>
        <li onClick={onOpenCart}><img className='navbar-icon' src='src/assets/icons/bag.png' /></li>
      </ul>
    </div>
  )
}

export default Navbar
