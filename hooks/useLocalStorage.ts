import { useState } from "react";
import { getItem } from "@utils/localStorage";

export type SetLocalStorageValue<T> = T | ((prevValue: T) => T);
export type SetLocalStorage<T> = (value: SetLocalStorageValue<T>) => void;
export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetLocalStorage<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: SetLocalStorageValue<T>) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
}
