import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import MusicPlayerComponent from './components/MusicPlayerComponent';
import NotFoundComponent from './components/NotFoundComponent'; // Make sure to import this component

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/signup" element={<SignupComponent />} />
      <Route path="/music-player" element={<MusicPlayerComponent />} />
      {/* Fallback route for unmatched paths */}
      <Route path="*" element={<NotFoundComponent />} />
    </Routes>
  </HashRouter>
);

export default App;
