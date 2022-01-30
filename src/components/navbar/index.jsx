import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import data from '../../pages/context.json';

const Navbar = () => {
  const [dropdown, setDropDown] = useState(false);
  const [hamburger, setHamburger] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropDown(!dropdown);
      }
    };

    if (dropdown) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [dropdown]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const menuHandler = (e) => {
    e.preventDefault();
    setHamburger(!hamburger);
    console.log(hamburger);
  };

  return (
    <nav
      className={`nav__container${scrollPosition >= 50 ? '__scrolled' : ''}`}
    >
      <div className="menu" onClick={menuHandler}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
      <ul className={`nav__links`}>
        <h1 className={`nav__header${hamburger ? '__burger' : ''}`}>
          <Link to="home" smooth={true} duration={500}>
            {data.name}
          </Link>
        </h1>

        {/* about */}
        <li className={`nav__item${hamburger ? '__burger' : ''}`}>
          <Link to="about" smooth={true} duration={500}>
            UWU
          </Link>
        </li>

        {/* projects */}
        <li className={`nav__item${hamburger ? '__burger' : ''}`}>
          <Link to="projects" smooth={true} duration={500}>
            UWU
          </Link>
        </li>

        {/* Social Media */}
        <li className={`nav__item__drop${hamburger ? '__burger' : ''}`}>
          <a
            className={`dropdown${dropdown ? '__active' : ''}`}
            ref={dropdownRef}
            onMouseEnter={() => setDropDown(true)}
            onClick={() => setDropDown(!dropdown)}
          >
            UWU
            <div
              className={`dropdown__decoration${dropdown ? '__active' : ''}`}
            />
          </a>

          <SocialDrop
            state={dropdown}
            href={data.social.Instagram}
            blurb="UWU"
          />
          <SocialDrop
            state={dropdown}
            href={data.social.LinkedIn}
            blurb="UWU"
          />
          <SocialDrop
            state={dropdown}
            href={data.social.Github}
            blurb="UWU"
          />
          <SocialDrop
            state={dropdown}
            href={data.social.Photography}
            blurb="UWU"
          />
        </li>

        {/* contact */}
        <li className={`nav__item${hamburger ? '__burger' : ''}`}>
          <a href={`mailto:${data.Contact.email}`}>UWU</a>
        </li>
      </ul>
    </nav>
  );
};

const SocialDrop = (props) => {
  return (
    <li className={`dropdown__item${props.state ? '__active' : ''}`}>
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.blurb}
      </a>
    </li>
  );
};
export default Navbar;
