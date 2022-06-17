import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markCorrect } from './weatherSlice';

const Answer = ({ answer }) => {
  const dispatch = useDispatch();
  const correctTemp = useSelector((state) => state.weather.data)[answer.city];
  console.log(answer);

  const isCorrect = Math.abs(Number(answer.temp) - Number(correctTemp)) < 5;

  useEffect(() => {
    dispatch(markCorrect({ city: answer.city, correct: isCorrect }));
  }, [answer.city, isCorrect]);

  return (
    <div style={{ color: isCorrect ? 'green' : 'red' }}>
      {answer.temp}
      <div>was {correctTemp}</div>
    </div>
  );
};

export default Answer;
