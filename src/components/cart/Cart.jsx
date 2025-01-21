import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

import { useDispatch, useSelector } from "react-redux"
import { closeCart } from "../../redux/cart"

import { useQuery } from "@apollo/client"

import CartItem from "./CartItem"

import { GET_CART_ITEMS } from "../../graphql/queries"

import '../../assets/styles/components/cart/Cart.css'

import { updateAmount } from '../../redux/amount'

const Cart = () => {
  const cart = useSelector((state) => state.cart.value)
  const dispatch = useDispatch()

  useGSAP(() => {
    if (cart) {
      gsap.set('body', {
        overflowY: 'hidden',
      })

      gsap.to('.cart-wrapper', {
        transform: 'translateX(-100%)',
        duration: .2,
      })
    } else {
      gsap.set('body', {
        overflowY: 'auto',
      })

      gsap.to('.cart-wrapper', {
        transform: 'translateX(0%)',
        duration: .2,
      })
    }
  }, {dependencies: [cart]})

  const { loading, data } = useQuery(GET_CART_ITEMS)

  if (loading) return <p>Loading...</p>

  let amount = 0

  data['cartItems'].map(cartItem => {
    amount += cartItem.amount
  })

  dispatch(updateAmount(amount))

  const onCloseCart = () => {
    dispatch(closeCart())
  }

  return (
    <div className="cart-wrapper">
      <div onClick={onCloseCart} className="close-cart"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7.5 7.5l6 6m0-6l-6 6"/></svg></div>
      {data['cartItems'].length > 0 ? data['cartItems'].map((cartItem, cartItemIndex) => <CartItem key={cartItemIndex} cartItemData={cartItem} />) :
        <p>Your cart is empty</p>
      }
    </div>
  )
}

export default Cart
