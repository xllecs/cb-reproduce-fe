import { gql } from "@apollo/client";

export const GET_CART_ITEMS = gql`
  query {
    cartItems {
      id
      productId
      size
      amount
    }
  }
`

export const GET_IMAGES = gql`
  query($productCode: String!) {
    images(productCode: $productCode) {
      image
    }
  }
`

export const GET_SIZES = gql`
  query($productId: ID!) {
    productSizes(productId: $productId) {
      letter
      stock
    }
  }
`
