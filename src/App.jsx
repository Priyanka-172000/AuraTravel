import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Destinations from './pages/Destinations/Destinations';
import DestinationDetails from './pages/DestinationDetails/DestinationDetails';
import AIPlanner from './pages/AIPlanner/AIPlanner';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Guides from './pages/Guides/Guides';
import Popular from './pages/Popular/Popular';
import Careers from './pages/Careers/Careers';
import Privacy from './pages/Privacy/Privacy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="destination/:id" element={<DestinationDetails />} />
        <Route path="planner" element={<AIPlanner />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="guides" element={<Guides />} />
        <Route path="popular" element={<Popular />} />
        <Route path="careers" element={<Careers />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="*" element={<div style={{padding: '100px 20px', textAlign: 'center', minHeight: '60vh'}}><h2>404 - Page Not Found</h2><p>The page you are looking for does not exist.</p></div>} />
      </Route>
    </Routes>
  );
}

export default App;
