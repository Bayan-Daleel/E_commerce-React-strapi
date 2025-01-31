import React from "react";
import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    /*...: تُستخدم لنشر محتويات الكائن داخل كائن آخر.
أي كائن يتم إرجاعه من التعبير الشرطي (إما {...} عند الوضع النهاري أو {...} عند الوضع الليلي) يتم نشره في كائن التصميم (palette).
*/
    ...(mode === "light"
      ? {
          // palette values for light mode
          text: {
            primary: "#2B3445",
          },
          neutral: {
            main: "#64748B",
          },
          bg: {
            main: "#f6f6f6",
          },
          favColor: {
            main: grey[300],
          },
          myColor: {
            main: "#f6f9fc",
          },
        }
      : {
          // palette values for dark mode
          neutral: {
            main: "#64748B",
          },
          bg: {
            main: "#1D2021",
          },
          favColor: {
            main: grey[800],
          },
          text: {
            primary: "#fff",
          },
          myColor: {
            main: "#252b32",
          },
        }),
  },
});

// context for color mode
export const ColorModeContext = createContext({
  //ينشئ سياقًا جديدًا يحمل دالة افتراضية toggleColorMode، والتي سيتم استبدالها لاحقًا.
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState(
    localStorage.getItem("mode") ? localStorage.getItem("mode") : "light"
  );

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return [theme, colorMode];
};
