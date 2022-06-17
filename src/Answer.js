import React from 'react';
import { useSelector } from 'react-redux';

const Answer = ({ city, temp }) => {
  const correctTemp = useSelector((state) => state.weather.data)[city];
  console.log(city, temp);
  const isCorrect = Math.abs(Number(temp) - Number(correctTemp)) < 5;
  return (
    <div style={{ color: isCorrect ? 'green' : 'red' }}>
      {temp}
      <div>was {correctTemp}</div>
    </div>
  );
};

export default Answer;
