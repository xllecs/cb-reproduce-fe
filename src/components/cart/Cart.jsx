import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

import { useDispatch, useSelector } from "react-redux"
import { closeCart } from "../../redux/cart"

import { gql, useQuery } from "@apollo/client"

import '../../assets/styles/components/cart/Cart.css'
import CartItem from "./CartItem"

const GET_CART_ITEMS = gql`
  query {
    cartItems {
      productId
      size
      amount
    }
  }
`

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

  const { loading, error, data } = useQuery(GET_CART_ITEMS)

  if (loading) return <p>Loading...</p>
  // if (error) return <p>Error: </p>

  const onCloseCart = () => {
    dispatch(closeCart())
  }

  return (
    <div className="cart-wrapper">
      <div onClick={onCloseCart}><img className="close-cart" src="src/assets/icons/close.png" /></div>
      {data['cartItems'].map((cartItem, cartItemIndex) => <CartItem key={cartItemIndex} cartItemData={cartItem} />)}
    </div>
  )
}

export default Cart
