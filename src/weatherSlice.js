import { createSlice } from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'counter',
  initialState: {
    answers: {},
    data: {},
    correctCount: 0
  },
  reducers: {
    addAnswer: (state, action) => {
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.city]: {
            ...state.answers[action.payload.city],
            city: action.payload.city,
            temp: action.payload.temp,
            correct: action.payload.correct
          }
        }
      };
    },
    markCorrect: (state, action) => {
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.city]: {
            ...state.answers[action.payload.city],
            correct: action.payload.correct
          }
        }
      };
    },
    addData: (state, action) => {
      return { ...state, data: { ...state.data, [action.payload.city]: action.payload.temp } };
    }
  }
});

export const { addAnswer, addData, markCorrect } = weatherSlice.actions;

export default weatherSlice.reducer;
