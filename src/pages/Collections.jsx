import { gql, useQuery } from "@apollo/client"
import Product from "../components/Product"

import '../assets/styles/pages/Collections.css'

const GET_PRODUCTS = gql`
  query($category: String) {
    products(category: $category) {
      id
      name
      color
      price
    }
  }
`

const Collections = () => {
  const { loading, data } = useQuery(GET_PRODUCTS)

  if (loading) return <p>Loading...</p>

  return (
    <div className="collections-wrapper">
      {data['products'].map((product, productIndex) => (
        <Product key={productIndex} productData={product} />
      ))}
    </div>
  )
}

export default Collections
