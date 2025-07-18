import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Todofield from './Components/Todofield';
import Signup from './Components/Signup'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Todofield />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
