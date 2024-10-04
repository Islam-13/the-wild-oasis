import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkMode({ children }) {
  const [isDark, setIsDark] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "theme"
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDark]);

  function toggleTheme() {
    setIsDark((dark) => !dark);
  }

  return (
    <DarkModeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("Context used outside the provider!!");

  return context;
}

export { DarkMode, useDarkMode };
