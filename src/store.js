import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from './weatherSlice';

export default configureStore({
  reducer: { weather: weatherSlice }
});
