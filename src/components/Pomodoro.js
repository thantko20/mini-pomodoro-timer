/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  CircularProgressLabel,
  Container,
  VStack,
} from '@chakra-ui/react';
import { formatSecondsIntoMMSS } from '../utils';
import { usePomoSettings } from './PomodoroSettingsProvider';
import SoundEffect from '../assets/ting_sound_effect.wav';
import useSoundEffect from '../hooks/useSoundEffect';

const usePomodoro = () => {
  const { pomoDuration, breakDuration, autoChangeMode } = usePomoSettings();
  const [{ mode, timeRemain, isActive }, setPomoState] = useState({
    mode: 'POMO', // 'POMO' or 'BREAK'
    timeRemain: pomoDuration,
    isActive: false,
  });

  const playSound = useSoundEffect(SoundEffect);

  const launch = useRef();

  const handleInterval = useCallback(() => {
    setPomoState((prev) => ({ ...prev, timeRemain: prev.timeRemain - 1 }));
  }, []);

  const timePercentageValue = () => {
    const totalTime = mode === 'POMO' ? pomoDuration : breakDuration;
    return (timeRemain / totalTime) * 100;
  };

  const changeMode = useCallback(
    (mode, isActive = false) => {
      clearInterval(launch.current);
      if (mode === 'POMO') {
        setPomoState({ mode, timeRemain: pomoDuration, isActive });
      } else {
        setPomoState({ mode, timeRemain: breakDuration, isActive });
      }

      launch.current = isActive && setInterval(handleInterval, 1000);
    },
    [breakDuration, pomoDuration, handleInterval],
  );

  const startTimer = () => {
    if (isActive && mode === 'POMO') return;
    changeMode('POMO', true);
  };

  const stopTimer = () => {
    if (!isActive) return;
    changeMode('POMO', false);
  };

  const takeABreak = () => {
    changeMode('BREAK', true);
  };

  const showNotification = (description) => {
    new Notification(description);
  };

  useEffect(() => {
    if (timeRemain === -1) {
      playSound();
      const newMode = mode === 'POMO' ? 'BREAK' : 'POMO';
      mode === 'POMO'
        ? showNotification('Pomodoro session has ended. Time to take a break')
        : showNotification("Break session has ended. Let's study!");
      changeMode(newMode, autoChangeMode);
    }
  }, [
    timeRemain,
    changeMode,
    mode,
    autoChangeMode,
    pomoDuration,
    breakDuration,
  ]);

  useEffect(() => {
    if (mode === 'POMO') {
      setPomoState((prev) => ({ ...prev, timeRemain: pomoDuration }));
    } else {
      setPomoState((prev) => ({ ...prev, timeRemain: breakDuration }));
    }
  }, [breakDuration, pomoDuration]);

  return {
    timePercentageValue: timePercentageValue(),
    timeRemain,
    mode,
    stopTimer,
    startTimer,
    takeABreak,
  };
};

const Pomodoro = () => {
  const {
    timePercentageValue,
    timeRemain,
    mode,
    stopTimer,
    startTimer,
    takeABreak,
  } = usePomodoro();

  return (
    <Container>
      <VStack gap={4}>
        <CircularProgress
          value={timePercentageValue}
          size='300px'
          color={mode === 'POMO' ? 'red.400' : 'blue.400'}
          thickness='4'
        >
          <CircularProgressLabel>
            {formatSecondsIntoMMSS(timeRemain)}
          </CircularProgressLabel>
        </CircularProgress>
        <ButtonGroup spacing={3} size={['sm', 'md']}>
          <Button variant='outline' colorScheme='red' onClick={stopTimer}>
            Stop Timer
          </Button>
          <Button colorScheme='red' onClick={startTimer}>
            Start Timer
          </Button>
          <Button colorScheme='blue' variant='outline' onClick={takeABreak}>
            Take a break
          </Button>
        </ButtonGroup>
      </VStack>
    </Container>
  );
};

export default Pomodoro;
