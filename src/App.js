import { useState, useEffect } from 'react';
import Answer from './Answer';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addData, addAnswer } from './weatherSlice';
import cities from './cities.json';

const App = () => {
  const [city, setCity] = useState('Colombo');
  const [temp, setTemp] = useState('');
  const [count, setCount] = useState(1);
  const [winState, setWinState] = useState('PLAYING');

  const dispatch = useDispatch();

  const answers = useSelector((state) => state.weather.answers);

  useEffect(() => {
    if (city == '' && temp == '') {
      setCity(cities[Math.floor(Math.random() * cities.length)].name);
    }
  }, [city, temp]);

  useEffect(() => {
    if (count >= 5) {
      if (Object.values(answers).filter((item) => item.correct).length >= 3) {
        setWinState('WIN');
      } else {
        setWinState('LOSE');
      }
    }
  }, [count, answers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAnswer({ city, temp: temp, correct: false }));
    console.log('do something');
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=9cff733aee57cb05b63dd4f731c46bc4`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        dispatch(addData({ city, temp: result.main.temp }));
        setCity('');
        setTemp('');
        setCount((count) => (count += 1));
      });
  };

  return (
    <div className="App">
      <div style={{ width: '100%' }}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {winState == 'WIN' ? (
              <div className="App">
                <div style={{ width: '100%' }}>
                  <div>You Win</div>
                </div>
              </div>
            ) : winState == 'LOSE' ? (
              <div className="App">
                <div style={{ width: '100%' }}>
                  <div>You Lose</div>
                </div>
              </div>
            ) : (
              <div>
                <h1>{city}</h1>
                <input
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  placeholder="your guess text box"></input>
                <button type="submit">Check</button>
              </div>
            )}
          </div>
        </form>
        <hr />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {Object.values(answers).map((answer) => (
            <Answer key={answer.city} answer={answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
