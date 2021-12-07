import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./App.css";
import { NavBar } from "./components/NavBar";
import { TransactionsLists } from "./components/TransactionList";
import { MinProvider } from "./Context";
import { Login } from "./components/Login";

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
	const [currentUser, setCurrentUser] = useState(undefined);
	return (
		<MinProvider>
		<ThemeProvider theme={theme}>
			{ currentUser ? ( 
			<div className="layout">
				<NavBar />
				<TransactionsLists />
			</div>
			 ) : ( 
			 <Login setCurrentUser = {setCurrentUser} />
			)}
		</ThemeProvider>
		</MinProvider>
	);
}

export default App;
