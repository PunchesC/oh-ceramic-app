import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import HomeImage from './components/home/home-image';
import AboutMe from './components/about-me/about-me';
import Inventory from './components/inventory/inventory';
import Cart from './components/cart/cart';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <ul>
            <li><a href="#home">Home</a></li> {/* Use <a> for internal navigation */}
            <li><a href="#about">About</a></li>
            <li><a href="#inventory">Inventory</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/cart">Cart</Link></li> {/* Use <Link> for different page navigation */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              {/* Wrap components in a fragment to display them together */}
              <HomeImage id="home" />
              <AboutMe id="about" />
              <Inventory id="inventory" />
              <section id="contact">
                <h1>Contact</h1>
                <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, quis!</p>
              </section>
            </>
          } />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;