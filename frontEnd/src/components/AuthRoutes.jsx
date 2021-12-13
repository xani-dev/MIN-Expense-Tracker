import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import { NavBar } from "./NavBar";
import { TransactionsLists } from "./TransactionList";
import { Login } from "./Auth/Login";
import { SignUp } from "./Auth/SignUp";
import { AuthContext } from "../ctx/AuthContext/Auth";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  if (user) {
    return (
      <div className="layout">
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<TransactionsLists />} />
           
          </Routes>
        </Router>
      </div>
    );
  }
  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
  )
};

export { AppRoutes };
