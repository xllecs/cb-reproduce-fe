import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './cart'
import searchReducer from './search'
import amountReducer from './amount'

export default configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer,
    amount: amountReducer,
  },
})
