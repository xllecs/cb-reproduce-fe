import { useParams } from 'react-router'
import '../assets/styles/pages/ProductView.css'
import Brand from '../components/Brand'
import { gql, useMutation, useQuery } from '@apollo/client'

const GET_PRODUCT = gql`
  query GetProduct($fullName: String!) {
    product(fullName: $fullName) {
      id
      name
      color
      price
      description
      details
    }
  }
`

const ADD_TO_CART = gql`
  mutation($productId: ID!, $size: Int!) {
    addCartItem(productId: $productId, size: $size) {
      cartItem {
        productId
        size
      }
    }
  }
`

const ProductView = () => {
  const { item } = useParams()
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { fullName: item }
  })

  const [addToCart] = useMutation(ADD_TO_CART)
  

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { id, name, color, price, description, details } = data['product']

  const onAddToCart = (productId, size=2) => {
    addToCart({variables: { productId: productId, size: size }})
  }

  return (
    <div className="product-view-wrapper">
      <div className="product-view-content">
        <div className="left-side">
          <img src='src/assets/products/footwear/the-wilson-sneaker-1.webp' />
        </div>
        <div className="right-side">
          <div className="right-side-content">
            <div className="product-name">{name}</div>
            <div className="product-color">Color: {color}</div>
            <div className="product-price">{price}</div>
            <div className="free-shipping">Free shipping on orders over £300</div>
            <div className="add-to-cart" onClick={() => onAddToCart(id)}>ADD TO CART</div>
            <div className="product-description">{description}</div>

            <ul className="product-details">
              {details.split(',').map((detail, index) => (
                <li key={index}>{detail}</li>            
              ))}
            </ul>

            <p>DELIVERY INFO</p>
            <ul className='delivery-info'>
              <li>Free UK Shipping</li>
              <li>Returns within 14 days of purchase</li>
              <li>Full Shipping and returns details</li>
            </ul>
          </div>
        </div>
      </div>
      <Brand />
    </div>
  )
}

export default ProductView
