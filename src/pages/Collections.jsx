import { gql, useQuery } from "@apollo/client"
import Product from "../components/Product"

import '../assets/styles/pages/Collections.css'
import { useParams } from "react-router"

const GET_PRODUCTS = gql`
  query($collection: String) {
    products(collection: $collection) {
      id
      name
      color
      price
    }
  }
`

const Collections = () => {
  const params = useParams()
  const { loading, data } = useQuery(GET_PRODUCTS, {variables: { collection: params.item }})

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
