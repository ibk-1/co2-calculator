import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from './FileUpload';
import GraphPage from './GraphPage'; // Your graph component
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FileUpload />} />
        <Route path="/graph" element={<GraphPage />} />
      </Routes>
    </Router>
  );
}

export default App;
