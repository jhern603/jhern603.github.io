import React, { useState, useEffect } from 'react'
import "../styles/navbar.css"
import favico from '../images/favicon.ico'

export default function Navbar() {
  const [change, setChange] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setChange((window.innerWidth <= 1024) && change === true);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setChange(!change);
  }

  return (
    <header className="navbar_container">
      <div className={change ? "menu_bars change" : "menu_bars"} onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <ul className="navbar">
        <li className={change ? "navbar_item_active" : "navbar_item"}><a href="#home"><img src={favico} alt="Shortcut to home" className="home" /></a></li>
        <li className={change ? "navbar_item_active" : "navbar_item"}><a href="#about">ABOUT</a></li>
        <li className={change ? "navbar_item_active" : "navbar_item"}><a href="#projects">PROJECTS</a></li>
        <li className={change ? "navbar_item_active" : "navbar_item"}><a href="#photography">PHOTOGRAPHY</a></li>
        <li className={change ? "navbar_item_active" : "navbar_item"}><a href="https://linkedin.com/in/jhern603" >LINKEDIN</a></li>
        <li className={change ? "navbar_item_active" : "navbar_item"}><a href="mailto:contact@josehernandez.dev">CONTACT</a></li>
      </ul>

    </header>
  );
}