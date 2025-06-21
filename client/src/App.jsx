// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Storefront from './pages/StoreFront';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import UserDashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/store" element={<Storefront />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;