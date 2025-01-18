import { gql, useQuery } from '@apollo/client'

import Product from './Product'

import '../assets/styles/components/Banner.css'

const GET_PRODUCTS = gql`
  query GetProducts($category: String) {
    products(category: $category) {
      id
      name
      color
      price
    }
  }
`

const Banner = ({ title }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { category: title },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="banner-wrapper">
      <div className="banner-header">
        <div className="banner-header-content">
          <div className="banner-header-title">{title.toUpperCase()}</div>
          <div className="banner-header-button">VIEW</div>
        </div>
      </div>
      <div className="banner-products">
        {data['products'].map((product, productIndex) => (
          <Product key={productIndex} productData={product} />
        ))}
      </div>
    </div>
  )
}

export default Banner
