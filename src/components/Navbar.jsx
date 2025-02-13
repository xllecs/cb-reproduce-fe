import { useDispatch, useSelector } from 'react-redux'
import { openCart } from '../redux/cart'
import { openSearch } from '../redux/search'

import '../assets/styles/components/Navbar.css'
import { Link } from 'react-router'
import { useState } from 'react'
import Search from './Search'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Navbar = () => {
  const dispatch = useDispatch()
  const amount = useSelector((state) => state.amount.value)
  const cart = useSelector((state) => state.cart.value)

  const [shopList, setShopList] = useState(false)

  const onOpenCart = () => {
    dispatch(openCart())
  }

  const onOpenSearch = () => {
    dispatch(openSearch())
  }

  useGSAP(() => {
    gsap.to('.app-content', {
      filter: cart ? 'blur(5px)' : 'blur(0px)',
      duration: .3
    })
  }, {dependencies: [cart]})

  return (
    <div className="navbar-wrapper">
      <div className="navbar-content">
        <ul className='navbar-left'>
          <li>NEW LAUNCHES</li>
          <li onClick={() => setShopList(!shopList)}>SHOP <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M36 18L24 30L12 18"/></svg>
            <ul className={shopList ? 'active-shop shop-list' : 'shop-list'}>
              <li><Link to='collections/footwear'>FOOTWEAR</Link></li>
            </ul>
          </li>
          <li>INFO <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M36 18L24 30L12 18"/></svg>
          </li>
        </ul>
        <Link to={''}><div className="site-name">COLE BUXTON</div></Link>
        <ul className='navbar-right'>
          <li onClick={onOpenSearch}
          ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M11.5 2.75a8.75 8.75 0 1 0 0 17.5a8.75 8.75 0 0 0 0-17.5ZM1.25 11.5c0-5.66 4.59-10.25 10.25-10.25S21.75 5.84 21.75 11.5S17.16 21.75 11.5 21.75S1.25 17.16 1.25 11.5Zm18.22 7.97a.75.75 0 0 1 1.06 0l2 2a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"/></svg></li>
          <Link to='account/'><li>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="6" r="4"/><ellipse cx="12" cy="17" rx="7" ry="4"/></g></svg>
          </li></Link>
          <li onClick={onOpenCart}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.794 12.03C4.331 9.342 4.6 8 5.487 7.134a4 4 0 0 1 .53-.434C7.04 6 8.41 6 11.15 6h1.703c2.739 0 4.108 0 5.13.7c.19.13.367.276.53.435c.888.865 1.157 2.208 1.694 4.894c.771 3.856 1.157 5.784.269 7.15c-.16.248-.348.477-.56.683C18.75 21 16.785 21 12.853 21H11.15c-3.933 0-5.899 0-7.065-1.138a3.998 3.998 0 0 1-.559-.683c-.888-1.366-.502-3.294.27-7.15Z"/><path strokeLinecap="round" d="M9 6V5a3 3 0 1 1 6 0v1m-5.83 9a3.001 3.001 0 0 0 5.66 0"/></g></svg>
            {amount > 0 && <div className="items-count">{amount}</div>}
          </li>
        </ul>
      </div>
      <Search />
    </div>
  )
}

export default Navbar
