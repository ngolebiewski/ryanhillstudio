import { createSlice } from '@reduxjs/toolkit'

export const pageSlice = createSlice({
  name: 'pages',
  initialState: {
    sitePages: [],
    pageHierarchy: [],
  },
  reducers: {
    updatePages: (state, action) => {
      state.sitePages = action.payload
    },
    resetPages: (state) => {
      state.sitePages = []
    },
    setPageHierarchy: (state, action) => {
      state.pageHierarchy = action.payload
    },
  },
})

export const { updatePages, resetPages, setPageHierarchy } = pageSlice.actions

export default pageSlice.reducer