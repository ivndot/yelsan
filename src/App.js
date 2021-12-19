import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
//components
import FormatOne from "./components/FormatOne";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Consult from "./components/Consult";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formato1" element={<FormatOne />} />
          <Route path="/formato2" element={<Home />} />
          <Route path="/formato3" element={<Home />} />
          <Route path="/consulta" element={<Consult />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </>
  );
};

export default App;
