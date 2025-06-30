import { configureStore } from '@reduxjs/toolkit';
import apodReducer from './slices/apodSlice';
import marsReducer from './slices/marsSlice';

const store = configureStore({
  reducer: {
    apod: apodReducer,
    mars: marsReducer,
  },
});

export default store;
