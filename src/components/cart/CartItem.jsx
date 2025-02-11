import { gql, useMutation, useQuery } from "@apollo/client"
import { DROP_ITEM, UPDATE_AMOUNT } from "../../graphql/mutations"

import '../../assets/styles/components/cart/CartItem.css'
import { GET_CART_ITEMS } from "../../graphql/queries"

const GET_PRODUCT = gql`
  query($code: String) {
    product(code: $code) {
      name
      price
      color
      images { url }
    }
  }
`

const CartItem = ({ cartItemData }) => {
  const { productCode, size, amount } = cartItemData
  const { loading, error, data } = useQuery(GET_PRODUCT, {variables: { code: productCode }})
  const [updateAmount] = useMutation(UPDATE_AMOUNT)
  const [dropItem] = useMutation(DROP_ITEM)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { name, price, color, images } = data['product']

  const imageStyle = {
    'backgroundImage': `url(${import.meta.env.VITE_DJANGO_MEDIA + images[0].url})`,
    'backgroundSize': 'cover',
    'backgroundPosition': 'center',
    'height': '100%',
    'width': '5em',
  }

  const onDecrease = () => {
    updateAmount({variables: { cartItemId: productCode, increase: false }, refetchQueries: [{ query: GET_CART_ITEMS }]})
  }

  const onIncrease = () => {
    updateAmount({variables: { cartItemId: productCode, increase: true }, refetchQueries: [{ query: GET_CART_ITEMS }]})
  }

  const onDropItem = () => {
    dropItem({variables: { cartItemId: productCode }, refetchQueries: [{ query: GET_CART_ITEMS }]})
  }

  return (
    <div className="cart-item-wrapper">
      <div className="cart-item-left">
        <div className="image" style={imageStyle}></div>
        <div className="cart-item-details">
          <div className="name">{name}</div>
          <div className="size-color">{size}, {color}</div>
          <div className="cart-item-buttons">
            <div className="amount-wrapper">
              <div onClick={onDecrease} className="amount-button decrease"><svg xmlns="http://www.w3.org/2000/svg" width=".8em" height=".8em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2Z"/></svg></div>
              <div className="amount">{amount}</div>
              <div onClick={onIncrease} className="amount-button increase"><svg xmlns="http://www.w3.org/2000/svg" width=".8em" height=".8em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2Z"/></svg></div>
            </div>
            <div onClick={onDropItem} className="trash"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.5 4.5h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2zm5-2a2 2 0 0 1 1.995 1.85l.005.15h-4a2 2 0 0 1 2-2zm-7 2h14m-9 3v8m4-8v8"/></svg></div>
          </div>
        </div>
      </div>
      <div className="cart-item-right">
        <div className="price">{price * amount}</div>
      </div>
    </div>
  )
}

export default CartItem
