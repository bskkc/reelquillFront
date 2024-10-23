import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/loginPage/LoginPage';
import RegisterPage from './components/registerPage/RegisterPage';
import HomePage from './components/homePage/HomePage';
import MainContainer from './components/MainContainer';

function App() {
  return (
    <Router>
      <MainContainer>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </MainContainer>
    </Router>
  );
}

export default App;
