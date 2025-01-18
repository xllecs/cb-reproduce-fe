import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: false,
  },
  reducers: {
    openCart: (state) => {
      state.value = true
    },
    closeCart: (state) => {
      state.value = false
    },
  },
})

export const { openCart, closeCart } = cartSlice.actions

export default cartSlice.reducer
