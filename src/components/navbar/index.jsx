import React, { useState } from 'react';
import { Link } from 'react-scroll';
import data from '../../pages/context.json'
const Navbar = () => {
  const [menu, setMenu] = useState(false);

  const menuHandler = (e) => {
    e.preventDefault();
    setMenu(!menu);
  };
  return (
    <nav className="nav__container">
      <div className="menu" onClick={menuHandler}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={`nav__links ${menu ? 'nav__links__active' : ''}`}>
        <li className="nav__item">
          <Link to="home" smooth={true} duration={500}>
            Home
          </Link>
        </li>
        <li className="nav__item">
          <Link to="projects" smooth={true} duration={500}>
            Projects
          </Link>
        </li>
        <li className="nav__item">
          <a href={`mailto:${data.Contact.email}`}>Contact</a>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
