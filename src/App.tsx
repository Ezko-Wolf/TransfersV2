import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./features/login";
import Register from "./features/register";
import Main from "./Main";

function App() {
  return (
    <Main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Main>
  );
}

export default App;
