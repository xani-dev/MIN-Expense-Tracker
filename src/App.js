import React from "react";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import "./App.css";
import { NavBar } from "./components/NavBar";
import { TransactionsLists } from "./components/TransactionList";

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
		<ThemeProvider theme={theme}>
			<div className="layout">
				<NavBar />
				<TransactionsLists />
			</div>
		</ThemeProvider>
	);
}

export default App;
