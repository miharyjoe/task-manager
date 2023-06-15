import { useState, useEffect } from "react";

const isLocalStorageAvailable =
  typeof window !== "undefined" && window.localStorage;

const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    if (isLocalStorageAvailable) {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};

export { useLocalStorage };
