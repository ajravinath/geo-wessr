import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'counter',
  initialState: {
    answers: {},
    data: {}
  },
  reducers: {
    addAnswer: (state, action) => {
      return { ...state, answers: { [action.payload.city]: action.payload.temp } };
    },
    addData: (state, action) => {
      return { ...state, data: { [action.payload.city]: action.payload.temp } };
    }
  }
});

export const { addAnswer, addData } = weatherSlice.actions;

export default weatherSlice.reducer;
