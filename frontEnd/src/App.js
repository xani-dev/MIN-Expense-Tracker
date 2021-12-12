import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import { MinProvider } from "./ctx/Context";
import { AuthProvider } from "./ctx/AuthContext/Auth";
import { AppRoutes } from "./components/AuthRoutes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D57EA7",
      contrastText: "#fff",
    },
    text: {
      primary: "#fff",
    },
  },
  overrides: {
    MuiInputLabel: {
      root: { color: "#fff", fontWeight: "normal" },
    },

    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "1px solid #D57EA7",
        },
        "&:hover": {
          borderBottom: "1px solid #D57EA7",
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: "#fff",
        fontWeight: 600,
        paddingBottom: "16px",
      },
    },
    MuiRadio: {
      root: {
        color: "#fff",
      },
    },
    MuiIconButton: {
      label: { color: "#D57EA7" },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <MinProvider>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </MinProvider>
    </AuthProvider>
  );
}

export default App;
