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
  Flex,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { usePomoSettings } from './PomodoroSettingsProvider';
import DurationSlider from './DurationSlider';

const PomoDurationSlider = () => {
  const { pomoDuration, handlePomoDurationOnChange } = usePomoSettings();

  return (
    <DurationSlider
      duration={pomoDuration}
      handleDuration={handlePomoDurationOnChange}
      label='Pomodoro Duration in Min'
      min={15}
      max={50}
    />
  );
};

const BreakDurationSlider = () => {
  const { breakDuration, handleBreakDurationOnChange } = usePomoSettings();

  return (
    <DurationSlider
      duration={breakDuration}
      handleDuration={handleBreakDurationOnChange}
      label='Break Duration in Min'
      min={3}
      max={15}
    />
  );
};

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleAutoChangeMode, autoChangeMode } = usePomoSettings();

  return (
    <>
      <IconButton
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
          <ModalBody color='gray.300' py={6}>
            <Flex direction='column' gap={8}>
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
