import { Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import NavBar from './components/NavBar';
import Pomodoro from './components/Pomodoro';

const App = () => {
  useEffect(() => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notification.');
    } else {
      Notification.requestPermission();
    }
  }, []);

  return (
    <Flex gap={10} direction='column'>
      <NavBar />
      <Pomodoro />
    </Flex>
  );
};

export default App;
