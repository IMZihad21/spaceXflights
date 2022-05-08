import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { selectThemeMode } from "Redux/slices/themeModeSlice";
import { useAppSelector } from "Redux/store";

interface ThemeLayoutProps {
  children: React.ReactNode;
}

const ThemeLayout: React.FC<ThemeLayoutProps> = ({ children }) => {
  const themeMode = useAppSelector(selectThemeMode);
  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeMode === "light" ? "#fff" : "#000",
      },
      text: {
        primary: themeMode === "light" ? "#000" : "#fff",
      },
      background: {
        default: themeMode === "light" ? "#fff" : "#000",
        paper: themeMode === "light" ? "#f1f1f1" : "#0c0c0c",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            "& a": {
              textDecoration: "none",
              color: "inherit",
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            "& .MuiTabs-indicator": {
              backgroundColor:
                themeMode === "light" ? "#000 !important" : "#fff !important",
            },
            "& .Mui-selected": {
              color:
                themeMode === "light" ? "#000 !important" : "#fff !important",
              fontWeight: "600",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: themeMode === "light" ? "#fff" : "#000",
            borderColor: themeMode === "light" ? "#fff" : "#000",
            backgroundColor: themeMode === "light" ? "#000" : "#fff",
            "&:hover": {
              backgroundColor: themeMode === "light" ? "#000" : "#fff",
            },
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeLayout;
