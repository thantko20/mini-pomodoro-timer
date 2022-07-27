import { createContext, useContext, useState } from 'react';

const PomoSettingsCtx = createContext({
  pomoDuration: 1500,
  breakDuration: 300,
  autoChangeMode: true,
  toggleAutoChangeMode: () => {},
});

export const usePomoSettings = () => useContext(PomoSettingsCtx);

const initialPomoSettings = {
  // In seconds
  pomoDuration: 1500,
  breakDuration: 300,
  autoChangeMode: true,
};

export const PomodoroSettingsProvider = ({ children }) => {
  const [{ pomoDuration, breakDuration, autoChangeMode }, setSettings] =
    useState(initialPomoSettings);

  const toggleAutoChangeMode = () => {
    setSettings((prev) => ({ ...prev, autoChangeMode: !prev.autoChangeMode }));
  };

  return (
    <PomoSettingsCtx.Provider
      value={{
        pomoDuration,
        breakDuration,
        autoChangeMode,
        toggleAutoChangeMode,
      }}
    >
      {children}
    </PomoSettingsCtx.Provider>
  );
};
