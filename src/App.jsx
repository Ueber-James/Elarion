import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Create from './pages/CharacterCreate';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
       <Route path="/criar" element={<Create />} />

       
      </Routes>
    </Router>
  );
}