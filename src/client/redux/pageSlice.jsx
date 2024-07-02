import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
  name: 'pages',
  initialState: {
    sitePages: [],
    pageHierarchy: [],
    imageHash: {}, 
    currentPage: {},
  },
  reducers: {
    updatePages: (state, action) => {
      state.sitePages = action.payload;
    },
    resetPages: (state) => {
      state.sitePages = [];
    },
    setPageHierarchy: (state, action) => {
      state.pageHierarchy = action.payload;
    },

    setImageHash: (state, action) => {
      state.imageHash = action.payload;
    },

    updateImageInHash: (state, action) => {
      const { seriesKey, images } = action.payload;
      state.imageHash[seriesKey] = images; // Update or add images for a specific series key
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    resetCurrentPage: (state) => {
      state.currentPage = {}
    }

  },
});

export const { updatePages, resetPages, setPageHierarchy, setImageHash, updateImageInHash, resetCurrentPage, setCurrentPage } = pageSlice.actions;

export default pageSlice.reducer;