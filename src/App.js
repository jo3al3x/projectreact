import React from 'react';
import Header from './my-components/Header';
import Footer from './my-components/Footer';
import Home from './my-components/Home';
import AdvancedJS from './my-components/AdvancedJS';
import FAQ from './my-components/Faq';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advancedJS" element={<AdvancedJS />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
