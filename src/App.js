import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./Pages/About";
import { Home } from "./Pages/Home";
import { Navbar } from "./Components/Navbar";
import { Alert } from "./Components/Alert";
import AlertState from "./Context/Alert/AlertState";
import { FirebaseState } from "./Context/Firebase/FirebaseState";
import Test from "./Pages/Test";

function App() {
  return (
    <FirebaseState>
      <AlertState>
        <Router>
          <Navbar />
          <Alert />
          <Routes>
            <Route path={"/"} exact element={<Home />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/test"} element={<Test/>} />
          </Routes>
        </Router>
      </AlertState>
    </FirebaseState>
  );
}

export default App;
