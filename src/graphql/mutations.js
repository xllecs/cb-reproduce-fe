import { gql } from "@apollo/client"

export const ADD_TO_CART = gql`
  mutation($productId: ID!, $size: String!) {
    addCartItem(productId: $productId, size: $size) {
      cartItem {
        productId
        size
      }
    }
  }
`

export const UPDATE_AMOUNT = gql`
  mutation($cartItemId: ID!, $increase: Boolean!) {
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