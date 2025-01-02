import { useState, useEffect } from "react";

// This is a symbol that we use to indicate that the value has not been set yet
const symbol = Symbol("not-set-yet");

/**
 *
 * @param callback - The callback to be debounced. Important! Needs to be a stable reference!
 * @param delay - The delay in ms
 * @returns
 */
export function useDebouncedCallback<T>(
  callback: (arg: T) => any,
  delay: number
) {
  const [value, setValue] = useState<T | typeof symbol>(symbol);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== symbol) {
        callback(value);
        setValue(symbol);
      }
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, callback, delay]);

  return (arg: T) => {
    setValue(arg);
  };
}
