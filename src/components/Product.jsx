import { gql, useQuery } from '@apollo/client'
import '../assets/styles/components/Product.css'
import { useEffect } from 'react'
import { Link } from 'react-router'

const GET_IMAGE = gql`
  query GetImage($productId: ID) {
    productImages(productId: $productId) {
      image
    }
  }
`

const Product = ({productData}) => {
  const { loading, error, data } = useQuery(GET_IMAGE, {
    variables: { productId: productData.id },
  })

  const productViewUrl = `/products/${productData.name.toLowerCase().split(' ').join('-') + '-' + productData.color.toLowerCase().split(' ').join('-')}`

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <Link to={productViewUrl}>
      <div className="product-wrapper">
        <div className="product-details">
          <div className="product-name">{productData.name}</div>
          <div className="product-color">{productData.color}</div>
          <div className="product-price">{productData.price}</div>
        </div>
      </div>
    </Link>
  )
}

export default Product
