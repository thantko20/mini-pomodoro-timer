import {
  VStack,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { useState } from 'react';

const DurationSlider = ({ label, duration, handleDuration, min, max }) => {
  const [sliderValue, setSliderValue] = useState(duration / 60);

  const handleOnChange = (value) => setSliderValue(value);

  return (
    <VStack spacing={2} align='start'>
      <Text fontWeight='medium'>{label}</Text>
      <Slider
        defaultValue={sliderValue}
        min={min}
        max={max}
        onChange={handleOnChange}
        onChangeEnd={handleDuration}
        position='relative'
        colorScheme='red'
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb
          boxSize={8}
          color={'gray.800'}
          fontSize='sm'
          fontWeight='medium'
        >
          {sliderValue}
        </SliderThumb>
      </Slider>
    </VStack>
  );
};

export default DurationSlider;
