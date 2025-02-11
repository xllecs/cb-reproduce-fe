import { gql } from "@apollo/client";

export const GET_CART_ITEMS = gql`
  query {
    cartItems {
      productCode
      size
      amount
    }
  }
`

export const GET_IMAGES = gql`
  query($productId: ID, $productCode: String) {
    productImages(productId: $productId, productCode: $productCode) {
      url
    }
  }
`

export const GET_SIZES = gql`
  query($productCode: String!) {
    productSizes(productCode: $productCode) {
      letter
      stock
    }
  }
`
