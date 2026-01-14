import { useState, useEffect } from "react";
import MainBody from "./Components/MainBody";
import Navbar from "./Components/Navbar";

const App = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="lg:container mx-auto px-4 sm:px-8">
      <Navbar theme={theme} handleThemeSwitch={handleThemeSwitch} />
      <MainBody />
    </div>
  );
};

export default App;
