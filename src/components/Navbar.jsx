import { useDispatch, useSelector } from 'react-redux'
import { openCart } from '../redux/cart'

import '../assets/styles/components/Navbar.css'
import { Link } from 'react-router'
import { useState } from 'react'

const Navbar = () => {
  const dispatch = useDispatch()
  const amount = useSelector((state) => state.amount.value)

  const [shopList, setShopList] = useState(false)

  const onOpenCart = () => {
    dispatch(openCart())
  }

  return (
    <div className="navbar-wrapper">
      <div className="navbar-content">
        <ul className='navbar-left'>
          <li>NEW LAUNCHES</li>
          <li onClick={() => setShopList(!shopList)}>SHOP <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 4.5v11.586l-4.5-4.5L5.086 13L12 19.914L18.914 13L17.5 11.586l-4.5 4.5V4.5h-2Z"/></svg>
            <ul className={shopList ? 'active-shop shop-list' : 'shop-list'}>
              <li><Link to='collections/footwear'>FOOTWEAR</Link></li>
            </ul>
          </li>
          <li>INFO <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 4.5v11.586l-4.5-4.5L5.086 13L12 19.914L18.914 13L17.5 11.586l-4.5 4.5V4.5h-2Z"/></svg>
            {/* <ul>
              <li>THE BRAND</li>
            </ul> */}
          </li>
        </ul>
        <Link to={''}><div className="site-name">COLE BUXTON</div></Link>
        <ul className='navbar-right'>
          <Link to='account/'><li>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="6" r="4"/><ellipse cx="12" cy="17" rx="7" ry="4"/></g></svg>
          </li></Link>
          <li onClick={onOpenCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.794 12.03C4.331 9.342 4.6 8 5.487 7.134a4 4 0 0 1 .53-.434C7.04 6 8.41 6 11.15 6h1.703c2.739 0 4.108 0 5.13.7c.19.13.367.276.53.435c.888.865 1.157 2.208 1.694 4.894c.771 3.856 1.157 5.784.269 7.15c-.16.248-.348.477-.56.683C18.75 21 16.785 21 12.853 21H11.15c-3.933 0-5.899 0-7.065-1.138a3.998 3.998 0 0 1-.559-.683c-.888-1.366-.502-3.294.27-7.15Z"/><path strokeLinecap="round" d="M9 6V5a3 3 0 1 1 6 0v1m-5.83 9a3.001 3.001 0 0 0 5.66 0"/></g></svg>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 21 21"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6.426 4.503L14.52 4.5a1 1 0 0 1 .997.92l.894 10.999a1 1 0 0 1-.916 1.078l-.08.003H5.58a1 1 0 0 1-1-1l.003-.077l.846-10.997a1 1 0 0 1 .997-.923z"/><path d="M13.5 8.5v.645c0 1.105-1.895 1.355-3 1.355s-3-.395-3-1.5v-.5"/></g></svg> */}
            {amount > 0 && <div className="items-count">{amount}</div>}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
