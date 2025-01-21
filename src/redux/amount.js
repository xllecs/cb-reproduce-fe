import { createSlice } from '@reduxjs/toolkit'

export const amountSlice = createSlice({
  name: 'amount',
  initialState: {
    value: 0,
  },
  reducers: {
    updateAmount: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { updateAmount } = amountSlice.actions

export default amountSlice.reducer
