import { createContext, useContext, useState } from 'react';

// IN SECONDS
const DEFAULT_POMO_DURATION = 1500; // 25 min
const DEFAULT_BREAK_DURATION = 300; // 5 min

const PomoSettingsCtx = createContext({
  pomoDuration: DEFAULT_POMO_DURATION,
  breakDuration: DEFAULT_BREAK_DURATION,
  autoChangeMode: true,
  toggleAutoChangeMode: () => {},
  handlePomoDurationOnChange: () => {},
  handleBreakDurationOnChange: () => {},
});

export const usePomoSettings = () => useContext(PomoSettingsCtx);

const initialPomoSettings = {
  // In seconds
  pomoDuration: DEFAULT_POMO_DURATION,
  breakDuration: DEFAULT_BREAK_DURATION,
  autoChangeMode: true,
};

export const PomodoroSettingsProvider = ({ children }) => {
  const [{ pomoDuration, breakDuration, autoChangeMode }, setSettings] =
    useState(initialPomoSettings);

  const toggleAutoChangeMode = () => {
    setSettings((prev) => ({ ...prev, autoChangeMode: !prev.autoChangeMode }));
  };

  const handlePomoDurationOnChange = (valueInMin) => {
    const valueInSec = valueInMin * 60;

    setSettings((prev) => ({ ...prev, pomoDuration: valueInSec }));
  };

  const handleBreakDurationOnChange = (valueInMin) => {
    const valueInSec = valueInMin * 60;

    setSettings((prev) => ({ ...prev, breakDuration: valueInSec }));
  };

  return (
    <PomoSettingsCtx.Provider
      value={{
        pomoDuration,
        breakDuration,
        autoChangeMode,
        toggleAutoChangeMode,
        handlePomoDurationOnChange,
        handleBreakDurationOnChange,
      }}
    >
      {children}
    </PomoSettingsCtx.Provider>
  );
};
