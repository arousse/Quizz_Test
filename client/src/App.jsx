import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Category from './components/Quiz/Category';

import Home from './pages/Home';
import Learn from './pages/Learn';
import Dashboard from './pages/Dashboard';
import NoPage from './pages/NoPage';
import LoginComponent from './components/Authentication/LoginComponent';
import RegisterComponent from './components/Authentication/RegisterComponent';
import StatisticComponent from './components/Statistic/StatisticComponent';

function App() {
  function renderDom() {
    if (sessionStorage.getItem('userData')) {
      return (
        <>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/:id" element={<Category />} />
              <Route path="*" element={<NoPage />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/register" element={<Home />} />
              <Route path="/statistics" element={<StatisticComponent />} />
            </Routes>
          </BrowserRouter>
        </>
      );
    }
    return (
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return renderDom();
}

export default App;
