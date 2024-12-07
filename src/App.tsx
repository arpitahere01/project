// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PuzzleGrid from './components/PuzzleGrid/PuzzleGrid';
import Login from './Login'; // Ensure the correct path

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/puzzle" element={<PuzzleGrid />} />
          <Route path="/" element={<Login />} /> {/* Default to login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
