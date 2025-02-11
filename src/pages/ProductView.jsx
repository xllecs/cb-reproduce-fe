import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import gsap from 'gsap'

import { gql, useMutation, useQuery } from '@apollo/client'
import { ADD_TO_CART } from '../graphql/mutations'
import { GET_CART_ITEMS, GET_SIZES } from '../graphql/queries'

import Brand from '../components/Brand'

import '../assets/styles/pages/ProductView.css'

const GET_PRODUCT = gql`
  query GetProduct($code: String!) {
    product(code: $code) {
      name
      code
      color
      price
      description
      details
      images { url }
    }
  }
`

const GET_COLORS = gql`
  query ($name: String) {
    products(name: $name) {
      code
      images { url }
    }
  }
`

const ProductView = () => {
  const { code } = useParams()

  const [currentSize, setCurrentSize] = useState('')
  const [stock, setStock] = useState()

  const magnifyingRef = useRef()

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { code }
  })

  const { loading: sizesLoading, data: sizesData } = useQuery(GET_SIZES, {
    skip: !data || !data.product,
    variables: { productCode: data?.product?.code }
  })

  const { loading: colorsLoading, error: colorsError, data: colorsData } = useQuery(GET_COLORS, {
    skip: !data || !data.product,
    variables: { name: data?.product?.name }
  })

  const [addToCart] = useMutation(ADD_TO_CART)

  if (loading || sizesLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const { name, color, price, description, details, images } = data['product']

  if (colorsLoading) return <p>Loading colors...</p>
  if (colorsError) return <p>Error: {colorsError.message}</p>

  const colors = colorsData.products.map(product => ({ code: product.code, url: product.images[0].url }))

  const colorStyle = (currentCode, url) => {
    return {
      width: '3.5em',
      height: '4em',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      border: code === currentCode ? '1px solid black' : 'none',
      backgroundImage: `url(${import.meta.env.VITE_DJANGO_MEDIA + url})`,
    }
  }

  const handleSelect = (size) => {
    setCurrentSize(size.letter)
    setStock(size.stock)
  }

  const onAddToCart = (productCode, size=currentSize) => {
    if (currentSize && stock) (
      addToCart({variables: { productCode: productCode, size: size }, refetchQueries: [{query: GET_CART_ITEMS}]})
    )
  }

  const showMagnifying = () => {
    gsap.to(magnifyingRef.current, {
      opacity: 1,
      duration: .1
    })
  }
  
  const hideMagnifying = () => {
    gsap.to(magnifyingRef.current, {
      opacity: 0,
      duration: .1
    })
  }

  const productImageStyling = (imageUrl) => {
    return {
      backgroundImage: `url(${import.meta.env.VITE_DJANGO_MEDIA + imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      cursor: 'pointer',
      position: 'relative'
    }
  }

  return (
    <div className="product-view-wrapper">
      <div className="product-view-content">
        <div className="product-images">
          {images.map((image, imageIndex) => (
            <div key={imageIndex} className='image' onMouseEnter={showMagnifying} onMouseLeave={hideMagnifying} style={productImageStyling(image.url)}>
              <svg ref={magnifyingRef} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6 11.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11m7.5 2L10 10"/></svg>
            </div>
          ))}
        </div>
        <div className="right-side">
          <div className="right-side-content">
            <div className="product-name-price">
              <div className="product-name">{name}</div>
              <div className="product-price">{price}</div>
            </div>
            <div className="current-color">Color: {color}</div>
            <div className="product-colors">
              {colors.map((color, colorIndex) => (
                <Link key={colorIndex} to={`/products/${color.code}`}><div className='color' style={colorStyle(color.code, color.url)}></div></Link>
              ))}
            </div>
            <div className="current-size">Size: {currentSize}</div>
            <div className="product-sizes">
              {sizesData.productSizes.map((size, sizeIndex) => (
                <div key={sizeIndex}
                  className={currentSize === size.letter ? 'selected-size size' : 'size'}
                  onClick={() => handleSelect(size)}>{size.letter}</div>
                ))}
            </div>
            <div className="product-stock-shipping">
              {stock <= 5 && stock != 0 && <div className="stock">Only {stock} left</div>}
              {stock > 5 && <div className="stock" style={{ color: '#47E5BC' }}>In stock</div>}
              {stock === 0 && <div className="stock" style={{ color: '#CF1259' }}>Sold out</div>}
              <div className="free-shipping"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M7.506 15.265a.75.75 0 0 0 1.446-.4l-1.446.4Zm-1.43-7.99l.724-.2l-.723.2ZM4.705 5.92l-.2.723l.2-.723ZM3.2 4.725a.75.75 0 1 0-.402 1.445L3.2 4.725Zm16.988 11a.75.75 0 1 0-.378-1.451l.378 1.451Zm-9.991 1.834c.31 1.12-.37 2.303-1.574 2.616L9 21.626c1.977-.513 3.185-2.502 2.643-4.467l-1.446.4Zm-1.574 2.616c-1.212.315-2.428-.389-2.74-1.519l-1.446.4c.54 1.955 2.594 3.082 4.563 2.57l-.377-1.451Zm-2.74-1.519c-.31-1.12.37-2.303 1.574-2.616l-.377-1.45c-1.977.513-3.186 2.502-2.643 4.467l1.446-.4Zm1.574-2.616c1.212-.315 2.428.389 2.74 1.519l1.446-.4c-.54-1.955-2.594-3.082-4.563-2.57l.377 1.451Zm1.494-1.175L6.8 7.075l-1.446.4l2.152 7.79l1.446-.4ZM4.904 5.197l-1.703-.472l-.402 1.445l1.704.473l.401-1.446ZM6.8 7.075a2.707 2.707 0 0 0-1.896-1.878l-.4 1.446c.425.118.742.44.85.831l1.446-.4Zm4.31 11.01l9.079-2.36l-.378-1.451l-9.079 2.36l.377 1.451Z"/><path stroke="currentColor" strokeWidth="1.5" d="M9.565 8.73c-.485-1.755-.727-2.633-.315-3.324c.411-.692 1.316-.927 3.126-1.398l1.92-.498c1.81-.47 2.715-.706 3.428-.307c.713.4.956 1.277 1.44 3.033l.515 1.862c.485 1.755.728 2.633.316 3.325c-.412.691-1.317.927-3.127 1.397l-1.92.499c-1.81.47-2.715.705-3.428.306c-.713-.4-.955-1.277-1.44-3.032L9.565 8.73Z"/></g></svg> Free shipping on orders over £300</div>
            </div>

            <div className="add-to-cart" onClick={() => onAddToCart(code)}>ADD TO CART</div>
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
