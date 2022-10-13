import { useState } from "react";

export function useVisualMode(initialMode) {
  //states
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    //case for true passing in for replace (error,saving,deleting)
    if (replace) {
      //remove last mode form history pass in new mode
      return setHistory((prev) => [...prev.slice(0, -1), newMode]);
    }
    //adding newMode to history
    setHistory((prev) => [...prev, newMode]);
  };

  const back = () => {
    //case for no history
    if (history.length === 1) return [initialMode];
    setHistory((prev) => [...prev.slice(0, -1)]);
    setMode(history[history.length - 2]);
  };

  return { mode, transition, back };
}
