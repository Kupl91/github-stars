import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;