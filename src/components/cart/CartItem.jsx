import { gql, useMutation, useQuery } from "@apollo/client"
import { DROP_ITEM, UPDATE_AMOUNT } from "../../graphql/mutations"

import '../../assets/styles/components/cart/CartItem.css'
import { GET_CART_ITEMS } from "../../graphql/queries"

const GET_PRODUCT = gql`
  query($id: ID) {
    product(id: $id) {
      name
      price
      color
    }
  }
`

const CartItem = ({ cartItemData }) => {
  const { id, productId, size, amount } = cartItemData
  const { loading, error, data } = useQuery(GET_PRODUCT, {variables: { id: productId }})
  const [updateAmount] = useMutation(UPDATE_AMOUNT)
  const [dropItem] = useMutation(DROP_ITEM)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { name, price, color } = data['product']

  const onDecrease = () => {
    updateAmount({variables: { cartItemId: id, increase: false }})
  }

  const onIncrease = () => {
    updateAmount({variables: { cartItemId: id, increase: true }})
  }

  const onDropItem = () => {
    dropItem({variables: { cartItemId: id }, refetchQueries: [{ query: GET_CART_ITEMS }]})
  }

  return (
    <div className="cart-item-wrapper">
      <div className="cart-item-details">
        <div className="name">{name}</div>
        <div className="price">{price * amount}</div>
        <div className="size-color">{size}, {color}</div>
        <div className="amount-wrapper">
          <div onClick={onDecrease} className="amount-button decrease">-</div>
          <div className="amount">{amount}</div>
          <div onClick={onIncrease} className="amount-button increase">+</div>
        </div>
        <div onClick={onDropItem} className="trash"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M5.5 4.5h10v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2zm5-2a2 2 0 0 1 1.995 1.85l.005.15h-4a2 2 0 0 1 2-2zm-7 2h14m-9 3v8m4-8v8"/></svg></div>
      </div>
    </div>
  )
}

export default CartItem
