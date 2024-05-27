import React from 'react';
import './App.css';
import HomeImage from './components/home/home-image';
import AboutMe from './components/about-me/about-me';
import Inventory from './components/inventory/inventory';


function App() {


  return (
    <div className="container">
      <nav className="navbar">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#inventory">Inventory</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <HomeImage />
      <AboutMe />
      <Inventory />
    
      <section id="contact">
        <h1>Contact</h1>
        <p className="lead">Lorem ipsum dolor si, amet consectetur adipisicing elit. Commodi, quis!</p>
      </section>
    </div>
  );
}

export default App;
