import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

const ThemeSwitch = () => {
  const currentIcon = useColorModeValue(<SunIcon />, <MoonIcon />);
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={currentIcon}
      colorScheme={useColorModeValue('yellow', 'purple')}
      onClick={toggleColorMode}
    />
  );
};

export default ThemeSwitch;
