import { gql, useQuery } from '@apollo/client'
import '../assets/styles/components/Product.css'
import { Link } from 'react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const GET_IMAGE = gql`
  query GetImage($productId: ID) {
    productImages(productId: $productId) {
      image
    }
  }
`

const Product = ({productData}) => {
  const productImage = useRef()
        
  const { loading, error, data } = useQuery(GET_IMAGE, {
    variables: { productId: productData.id },
  })

  const productViewUrl = `/products/${productData.name.toLowerCase().split(' ').join('-') + '-' + productData.color.toLowerCase().split(' ').join('-')}`

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const imageStyling = data && data['productImages'] && data['productImages'].length > 0 ?
    {
      height: '30vw',
      width: '24.5vw',
      backgroundImage: `url(${import.meta.env.VITE_DJANGO_MEDIA + data.productImages[0].image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    } : {}
  
  const hoverImageStyling = data && data['productImages'] && data['productImages'].length > 0 ?
    {
      height: '100%',
      width: '100%',
      backgroundImage: `url(${import.meta.env.VITE_DJANGO_MEDIA + data.productImages[1].image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'absolute',
      top: 0,
      opacity: 0
    } : {}

  const onProductEnter = () => {
    gsap.to(productImage.current, {
      opacity: 1,
      duration: .3
    })
  }

  const onProductLeave = () => {
    gsap.to(productImage.current, {
      opacity: 0,
      duration: .3
    })
  }

  return (
    <Link to={productViewUrl}>
      <div className="product-wrapper" onMouseEnter={onProductEnter} onMouseLeave={onProductLeave}>
        <div className="product-image" style={imageStyling}>
          <div className="product-image-hover" ref={productImage} style={hoverImageStyling}></div>
        </div>
        <div className="product-details">
          <div className="product-name-color">
            <div className="product-name">{productData.name}</div>
            <div className="product-color">{productData.color}</div>
          </div>
          <div className="product-price">{productData.price}</div>
        </div>
      </div>
    </Link>
  )
}

export default Product
