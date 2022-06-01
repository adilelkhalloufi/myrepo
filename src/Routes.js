import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Oublie from "./Login/Oublie";
import Dashbord from "./Login/Dashbord";

function App() {
  return (
    <>
      {" "}
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />{" "}
          <Route path="/Login" exact element={<Login />} />{" "}
          <Route path="/Register" exact element={<Register />} />{" "}
          <Route path="/Oublie" exact element={<Oublie />} />{" "}
          <Route path="/Dashbord" exact element={<Dashbord />} />{" "}
        </Routes>{" "}
      </Router>{" "}
    </>
  );
}

export default App;
