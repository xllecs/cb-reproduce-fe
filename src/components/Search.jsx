import { gql, useLazyQuery, useQuery } from '@apollo/client'
import '../assets/styles/components/Search.css'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { closeSearch } from '../redux/search'
import { Link, useNavigate } from 'react-router'

const GET_PRODUCTS = gql`
  query($input: String) {
    products(input: $input) {
      code
      name
      price
      images { url }
    }
  }
`

const Search = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const search = useSelector((state) => state.search.value)
  const navigate = useNavigate()

  const [getProducts, { data }] = useLazyQuery(GET_PRODUCTS)

  useGSAP(() => {
    gsap.to('.search-wrapper', {
      opacity: search ? 1 : 0,
      display: search ? 'flex' : 'none',
      duration: .2,
    })

    
    if (data) {
      gsap.to('.search-results-wrapper', {
        opacity: search ? 1 : 0,
        display: search ? 'block' : 'none',
        duration: .2,
      })
    }
  }, {dependencies: [search, data]})

  const onCloseSearch = () => {
    dispatch(closeSearch())
  } 

  const handleSearch = () => {
    if (input) {
      getProducts({variables: {input}})
    }
  }

  const searchResultImageStyle = (url) => {
    return {
      height: '6em',
      width: '5em',
      backgroundImage: `url(${import.meta.env.VITE_DJANGO_MEDIA + url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
  }

  const handleViewProduct = (code) => {
    navigate(`/products/${code}`)
    onCloseSearch()
  }

  const searchResultEnter = (e) => {
    const searchResult = e.currentTarget.closest('.search-result')

    gsap.to(searchResult, {
      backgroundColor: 'rgba(0, 0, 0, .1)',
    })
  }

  const searchResultLeave = (e) => {
    const searchResult = e.currentTarget.closest('.search-result')

    gsap.to(searchResult, {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    })
  }

  return (
    <div className="search-wrapper">
      <div className="search-input-wrapper">
        <input
          type='text'
          id='search'
          name='search'
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          placeholder='Search'
        />

        <div className="search-results-wrapper">
          <div className="search-results-content">
            <div className="search-results-text">Products</div>
            {data && data.products.map((product, productIndex) => (
              <div className="search-result" key={productIndex}
                onClick={() => handleViewProduct(product.code)} onMouseEnter={searchResultEnter} onMouseLeave={searchResultLeave}>
                <div className="search-result-image" style={searchResultImageStyle(product.images[0].url)}></div>
                <div className="search-result-text">
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="close-search"
        onClick={onCloseSearch}><svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 21 21"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m7.5 7.5l6 6m0-6l-6 6"/></svg></div>
    </div>
  )
}

export default Search
