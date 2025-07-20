import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './components/pages/HomePage';
import { MeetUsPage } from './components/pages/MeetUsPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { PricesPage } from './components/pages/PricesPage';
import { ContactPage } from './components/pages/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meet-us" element={<MeetUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
