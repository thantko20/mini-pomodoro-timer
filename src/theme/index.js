import { extendTheme } from '@chakra-ui/react';

const styles = {
  global: (props) => ({
    body: {
      fontFamily: "'Poppins', sans-serif",
    },
  }),
};

export default extendTheme({ styles });
