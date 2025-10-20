import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Carousel from "./components/Carousel";


function App() {
  return (
    <Router>
      {/* Navbar is included on all pages */}
      <Navbar user={localStorage.getItem("username")} />

      <Routes>
        {/* Home page includes Carousel */}
        <Route
          path="/"
          element={
            <>
              <Carousel />
              <Home />
            </>
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
