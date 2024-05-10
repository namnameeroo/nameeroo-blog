"use client";
import {useEffect, useState} from "react";
interface Themes {
  (): "dark" | "light" | "";
}
const useTheme: Themes = () => {
  console.log("no");
  const [theme, setTheme] = useState<"dark" | "light" | "">("");
  useEffect(() => {
    const localTheme = localStorage?.getItem("current-theme");
    console.log({isDark: localTheme});
    if (localTheme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  return theme ?? "";
};

export default useTheme;
