import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './weatherSlice';

export default configureStore({
  weather: weatherSlice
});
