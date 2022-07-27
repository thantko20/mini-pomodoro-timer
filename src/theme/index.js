import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props) => ({
    body: {
      fontFamily: "'Poppins', sans-serif",
      bg: mode('gray.100', 'gray.800')(props),
    },
  }),
};

export default extendTheme({ styles });
