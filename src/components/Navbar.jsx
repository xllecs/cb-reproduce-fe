import { useDispatch, useSelector } from 'react-redux'
import { openCart } from '../redux/cart'

import '../assets/styles/components/Navbar.css'
import { Link } from 'react-router'

const Navbar = () => {
  const dispatch = useDispatch()
  const amount = useSelector((state) => state.amount.value)

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
      <Link to={''}><div className="site-name">COLE BUXTON</div></Link>
      <ul className='navbar-right'>
        <Link to='account/login'><li>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M10.5 2.5a3 3 0 0 1 3 3v2a3 3 0 1 1-6 0v-2a3 3 0 0 1 3-3zm7 14v-.728c0-3.187-3.686-5.272-7-5.272s-7 2.085-7 5.272v.728a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/></svg>
        </li></Link>
        <li onClick={onOpenCart}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6.426 4.503L14.52 4.5a1 1 0 0 1 .997.92l.894 10.999a1 1 0 0 1-.916 1.078l-.08.003H5.58a1 1 0 0 1-1-1l.003-.077l.846-10.997a1 1 0 0 1 .997-.923z"/><path d="M13.5 8.5v.645c0 1.105-1.895 1.355-3 1.355s-3-.395-3-1.5v-.5"/></g></svg>
          {amount > 0 && <div className="items-count">{amount}</div>}
        </li>
      </ul>
    </div>
  )
}

export default Navbar
