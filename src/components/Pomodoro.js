import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Button,
  ButtonGroup,
  CircularProgress,
  CircularProgressLabel,
  Container,
  FormControl,
  FormLabel,
  Switch,
  VStack,
} from '@chakra-ui/react';
import { formatSecondsIntoMMSS } from '../utils';

const initialPomoSettings = {
  // In seconds
  pomoDuration: 1500,
  breakDuration: 300,
  autoChangeMode: true,
};

const usePomoSettings = () => {
  const [settings, setSettings] = useState(initialPomoSettings);

  const toggleAutoChangeMode = () => {
    setSettings((prev) => ({ ...prev, autoChangeMode: !prev.autoChangeMode }));
  };

  return { settings, toggleAutoChangeMode };
};

const initialPomoState = {
  mode: 'POMO', // 'POMO' or 'BREAK'
  timeRemain: initialPomoSettings.pomoDuration,
  isActive: false,
};

const usePomodoro = () => {
  const { settings, toggleAutoChangeMode } = usePomoSettings();
  const [{ mode, timeRemain, isActive }, setPomoState] =
    useState(initialPomoState);

  const launch = useRef();

  const handleInterval = useCallback(() => {
    setPomoState((prev) => ({ ...prev, timeRemain: prev.timeRemain - 1 }));
  }, []);

  const timePercentageValue = () => {
    const totalTime =
      mode === 'POMO' ? settings.pomoDuration : settings.breakDuration;
    return (timeRemain / totalTime) * 100;
  };

  const changeMode = useCallback(
    (mode, isActive = false) => {
      clearInterval(launch.current);
      if (mode === 'POMO') {
        setPomoState({ mode, timeRemain: settings.pomoDuration, isActive });
      } else {
        setPomoState({ mode, timeRemain: settings.breakDuration, isActive });
      }

      launch.current = isActive && setInterval(handleInterval, 1000);
    },
    [settings.breakDuration, settings.pomoDuration, handleInterval],
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
      const newMode = mode === 'POMO' ? 'BREAK' : 'POMO';
      mode === 'POMO'
        ? showNotification('Pomodoro session has ended. Time to take a break')
        : showNotification("Break session has ended. Let's study!");
      changeMode(newMode, settings.autoChangeMode);
    }
  }, [timeRemain, changeMode, mode, settings.autoChangeMode]);

  return {
    timePercentageValue: timePercentageValue(),
    timeRemain,
    mode,
    stopTimer,
    startTimer,
    takeABreak,
    toggleAutoChangeMode,
    autoChangeMode: settings.autoChangeMode,
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
    toggleAutoChangeMode,
    autoChangeMode,
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
        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='changeMode' mb={0}>
            Auto Change Modes:
          </FormLabel>
          <Switch
            onChange={toggleAutoChangeMode}
            isChecked={autoChangeMode}
            colorScheme='red'
            id='changeMode'
            size='lg'
          />
        </FormControl>
      </VStack>
    </Container>
  );
};

export default Pomodoro;
