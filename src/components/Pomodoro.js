import { useState, useEffect, useReducer } from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { formatSecondsIntoMMSS } from '../utils';

const initialPomoSettings = {
  // In seconds
  pomoDuration: 1500,
  breakDuration: 300,
  mode: 'POMO', // 'POMO' or 'BREAK'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return {
        ...state,
        mode: action.payload,
      };
    default:
      return state;
  }
};

const usePomodoro = () => {
  const [{ pomoDuration, breakDuration, mode }, dispatch] = useReducer(
    reducer,
    initialPomoSettings,
  );
  const [timeRemain, setTimeRemain] = useState(pomoDuration);

  const handleInterval = () => {
    setTimeRemain((prev) => prev - 1);
  };

  const timePercentageValue = () => {
    const totalTime = mode === 'POMO' ? pomoDuration : breakDuration;
    return (timeRemain / totalTime) * 100;
  };

  useEffect(() => {
    const intervalId = setInterval(handleInterval, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeRemain === -1) {
      if (mode === 'POMO') {
        setTimeRemain(breakDuration);
        dispatch({ type: 'CHANGE_MODE', payload: 'BREAK' });
      } else {
        setTimeRemain(pomoDuration);
        dispatch({ type: 'CHANGE_MODE', payload: 'POMO' });
      }
    }
  }, [timeRemain, mode, breakDuration, pomoDuration]);

  return {
    timePercentageValue: timePercentageValue(),
    timeRemain,
    mode,
  };
};

const Pomodoro = () => {
  const { timePercentageValue, timeRemain, mode } = usePomodoro();

  return (
    <>
      <CircularProgress
        value={timePercentageValue}
        size='300px'
        color={mode === 'POMO' ? 'red.400' : 'blue.400'}
      >
        <CircularProgressLabel>
          {formatSecondsIntoMMSS(timeRemain)}
        </CircularProgressLabel>
      </CircularProgress>
    </>
  );
};

export default Pomodoro;
