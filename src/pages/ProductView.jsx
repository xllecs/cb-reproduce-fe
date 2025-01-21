import { useState } from 'react'
import { useParams } from 'react-router'

import { gql, useMutation, useQuery } from '@apollo/client'
import { ADD_TO_CART } from '../graphql/mutations'
import { GET_CART_ITEMS, GET_SIZES } from '../graphql/queries'

import Brand from '../components/Brand'

import '../assets/styles/pages/ProductView.css'

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

const ProductView = () => {
  const { item } = useParams()
  
  const [currentSize, setCurrentSize] = useState('')
  const [stock, setStock] = useState()

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { fullName: item }
  })

  const { loading: sizesLoading, data: sizesData } = useQuery(GET_SIZES, {
    skip: !data || !data.product,
    variables: { productId: data?.product?.id }
  })

  const [addToCart] = useMutation(ADD_TO_CART)

  if (loading || sizesLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { id, name, color, price, description, details } = data['product']

  const handleSelect = (size) => {
    setCurrentSize(size.letter)
    setStock(size.stock)
  }

  const onAddToCart = (productId, size=currentSize) => {
    addToCart({variables: { productId: productId, size: size }, refetchQueries: [{query: GET_CART_ITEMS}]})
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
            <div className="product-sizes">
              {sizesData.productSizes.map((size, sizeIndex) => (
                <div key={sizeIndex}
                  className={currentSize === size.letter ? 'selected-size size' : 'size'}
                  onClick={() => handleSelect(size)}>{size.letter}</div>
                ))}
            </div>
            {stock <= 5 && stock != 0 && <div className="stock">Only {stock} left</div>}
            {stock > 5 && <div className="stock">In stock</div>}
            {stock === 0 && <div className="stock">Sold out</div>}
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
