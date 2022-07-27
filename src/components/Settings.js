import {
  IconButton,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { usePomoSettings } from './PomodoroSettingsProvider';

const PomoDurationSlider = () => {
  const { pomoDuration, handlePomoDurationOnChange } = usePomoSettings();

  return (
    <VStack spacing={2} align='start'>
      <Text fontWeight='semibold' fontSize='lg'>
        Pomodoro Duration In Min
      </Text>
      <Slider
        defaultValue={pomoDuration / 60}
        min={15}
        max={50}
        onChange={handlePomoDurationOnChange}
        position='relative'
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb
          boxSize={8}
          color='red.900'
          bg='red.200'
          fontWeight='medium'
        >
          {pomoDuration / 60}
        </SliderThumb>
      </Slider>
    </VStack>
  );
};

const BreakDurationSlider = () => {
  const { breakDuration, handleBreakDurationOnChange } = usePomoSettings();

  return (
    <VStack spacing={2} align='start'>
      <Text fontWeight='semibold' fontSize='lg'>
        Break Duration In Min
      </Text>
      <Slider
        defaultValue={breakDuration / 60}
        min={3}
        max={15}
        onChange={handleBreakDurationOnChange}
        position='relative'
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb
          boxSize={8}
          color='red.900'
          fontWeight='medium'
          bg='red.200'
        >
          {breakDuration / 60}
        </SliderThumb>
      </Slider>
    </VStack>
  );
};

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleAutoChangeMode, autoChangeMode } = usePomoSettings();

  return (
    <>
      <IconButton
        variant='ghost'
        size='lg'
        aria-label='settings'
        colorScheme='red'
        icon={<SettingsIcon />}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction='column' gap={6}>
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
              <PomoDurationSlider />
              <BreakDurationSlider />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Settings;
