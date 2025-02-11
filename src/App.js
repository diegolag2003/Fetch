import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Browse from './Pages/Browse/Browse';
import Login from './Pages/Login/Login';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Fetch" element={<Login />} />
        <Route path="/Fetch/Browse" element={<Browse/>} />
      </Routes>
    </Router>
  );
}

export default App;