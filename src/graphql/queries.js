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

export const GET_SIZES = gql`
  query($productId: ID!) {
    productSizes(productId: $productId) {
      letter
      stock
    }
  }
`
