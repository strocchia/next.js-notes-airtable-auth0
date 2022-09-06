import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ value = "cupcake", children }) => {
  const [theme, setTheme] = useState(value);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    setTheme(localTheme ? localTheme : value);
    applyTheme(localTheme ? localTheme : value);
  }, []);

  const applyTheme = (theme) => {
    let newTheme = theme;
    const html = document.getElementsByTagName("html")[0];
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleThemeChange = (theme) => {
    setTheme(theme);
    applyTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};
