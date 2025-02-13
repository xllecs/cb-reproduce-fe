import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: false,
  },
  reducers: {
    openSearch: (state) => {
      state.value = true
    },
    closeSearch: (state) => {
      state.value = false
    },
  },
})

export const { openSearch, closeSearch } = searchSlice.actions

export default searchSlice.reducer
