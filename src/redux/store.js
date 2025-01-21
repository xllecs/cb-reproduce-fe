import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './cart'
import amountReducer from './amount'

export default configureStore({
  reducer: {
    cart: cartReducer,
    amount: amountReducer,
  },
})