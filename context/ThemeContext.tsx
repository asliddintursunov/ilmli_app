"use client";

import { createContext, useState, useEffect } from "react";
var defaultValue: unknown;
export const ThemeContext = createContext<unknown>(defaultValue);
export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState("winter");
  //   const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // setMounted(true);
    const storedTheme = localStorage.getItem("theme") || "winter";
    setTheme(storedTheme);
  }, []);
  //   if (!mounted) return <>Loading...</>;
  const changeTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
