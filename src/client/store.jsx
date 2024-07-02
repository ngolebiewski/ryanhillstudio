import { configureStore } from '@reduxjs/toolkit'
import pageReducer from './redux/pageSlice'

export default configureStore({
  reducer: {
    pages: pageReducer
  },
})