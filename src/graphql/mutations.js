import { gql } from "@apollo/client"

export const ADD_TO_CART = gql`
  mutation($productCode: String!, $size: String!) {
    addCartItem(productCode: $productCode, size: $size) {
      cartItem {
        productCode
        size
      }
    }
  }
`

export const UPDATE_AMOUNT = gql`
  mutation($cartItemId: String!, $increase: Boolean!) {
    updateAmount(cartItemId: $cartItemId, increase: $increase) {
      cartItem {
        id
        amount
      }
    }
  }
`

export const DROP_ITEM = gql`
  mutation($cartItemId: ID!) {
    dropCartItem(cartItemId: $cartItemId) { ok }
  }
`