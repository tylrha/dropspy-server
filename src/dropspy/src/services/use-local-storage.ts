import { useState } from "react";

function useLocalStorage(key: string, initialValue: string) {

  // console.log(key + " - " + initialValue)

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {return initialValue}

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (e) {
      console.log(`error while getting localStorage: ${e}`)
      return initialValue
    }
  })

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {window.localStorage.setItem(key, JSON.stringify(valueToStore))}
    } catch (e) {
      console.log(`error while setting localStorage: ${e}`)
    }
  }

  return [storedValue, setValue]
}

export {useLocalStorage}
