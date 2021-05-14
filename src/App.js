import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { TransactionsLists } from "./components/Transactions/List";

const theme = createMuiTheme({
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
		<MuiThemeProvider theme={theme}>
			<div className="layout">
				<NavBar />
				<TransactionsLists />
			</div>
		</MuiThemeProvider>
	);
}

export default App;
