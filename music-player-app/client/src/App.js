import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import MusicPlayerComponent from './components/MusicPlayerComponent';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/music" element={<MusicPlayerComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
