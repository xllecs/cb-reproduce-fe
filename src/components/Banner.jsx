import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router'

import Product from './Product'

import '../assets/styles/components/Banner.css'

const GET_PRODUCTS = gql`
  query GetProducts($collection: String) {
    products(collection: $collection) {
      id
      name
      color
      price
    }
  }
`

const Banner = ({ title, bgImage }) => {
  const bannerHeaderStyle = {  
    height: '100vh',
    position: 'relative',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { collection: title.toLowerCase().split(' ').join('-') },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="banner-wrapper">
      <div className="banner-header" style={bannerHeaderStyle}>
        <div className="banner-gradient"></div>
        <div className="banner-header-content">
          <div className="banner-header-title">{title}</div>
          <Link to={`/collections/${title.toLowerCase().split(' ').join('-')}`}><div className="banner-header-button">VIEW</div></Link>
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
