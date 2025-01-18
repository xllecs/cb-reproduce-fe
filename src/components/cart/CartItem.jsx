import { gql, useQuery } from "@apollo/client"

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
  const { productId, size, amount } = cartItemData
  const { loading, error, data } = useQuery(GET_PRODUCT, {variables: { id: productId }})

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { name, price, color } = data['product']

  return (
    <div className="cart-item-wrapper">
      {name}
      {price}
      {color}
      {size}
      {amount}
    </div>
  )
}

export default CartItem
