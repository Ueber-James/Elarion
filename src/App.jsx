import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Create from './pages/CharacterCreate';
import CharacterEdit from './pages/viewsCharacter';
import Home from './pages/home';
import CharacterList from './pages/CharacterList';






export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
       <Route path="/criar" element={<Create />} />
        <Route path="/edit/:id" element={<CharacterEdit />} />
       <Route path="/home" element={<Home />} />
        <Route path="/lista" element={<CharacterList />} />



       
      </Routes>
    </Router>
  );
}