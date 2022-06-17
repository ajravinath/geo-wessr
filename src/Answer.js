import React from 'react';
import { useSelector } from 'react-redux';

const Answer = ({ color, city, temp }) => {
  const correctTemp = useSelector((state) => state.weather.data)[city];

  return (
    <div style={{ color: color }}>
      {temp}
      <div>was {correctTemp}</div>
    </div>
  );
};

export default Answer;
