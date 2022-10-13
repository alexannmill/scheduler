import { useState } from "react";

export function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      return setHistory((prev) => [...prev.slice(0, -1), newMode]);
    }
    setHistory((prev) => [...prev, newMode]);
  };

  const back = () => {
    if (history.length === 1) return [initialMode];
    setHistory((prev) => [...prev.slice(0, -1)]);
    setMode(history[history.length - 2]);
  };

  return { mode, transition, back };
}
