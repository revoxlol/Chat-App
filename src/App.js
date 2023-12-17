import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import ChatApp from './ChatApp'


const App = () => {
  return (
    <div>

    <Router>
      <div>
        <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         
        </Routes>
      </div>
    </Router>
    
    </div>
  );
};

export default App;
