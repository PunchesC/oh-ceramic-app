import React from 'react';
import { useLocation, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import HomeImage from './components/home/home-image';
import AboutMe from './components/about-me/about-me';
import Inventory from './components/inventory/inventory';
import Cart from './components/cart/cart';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a scrollTo value in the location state
    if (location.state?.scrollTo) {
      const id = location.state.scrollTo;
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]); // Re-run the effect if the location changes

  return (
    <div className="container">
      <nav className="navbar">
        <ul>
          <li><Link to="/" state={{ scrollTo: 'home' }}>Home</Link></li>
          <li><Link to="/" state={{ scrollTo: 'about' }}>About</Link></li>
          <li><Link to="/" state={{ scrollTo: 'inventory' }}>Inventory</Link></li>
          <li><Link to="/" state={{ scrollTo: 'contact' }}>Contact</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={
          <>
            <HomeImage id="home" />
            <AboutMe id="about" />
            <Inventory id="inventory" />
            <section id="contact">
              <h1>Contact</h1>
              <p className="lead">Lorem ipsum dolor sit amet...</p>
            </section>
          </>
        } />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;