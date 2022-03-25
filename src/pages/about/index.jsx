import React from 'react';
import data from '../context.json';
import portrait from './images/portrait.jpg';



const About = () => {
  return (
    <section className="about__container" id="about">
      <div className="background__image" />

      <div className="grid__container">
        <div className="left">
          <div className="portrait__container">
            <img src={portrait} className="portrait" alt="" />
          </div>
        </div>
        <div className="right">
          <p className="blurb">{data.blurb}</p>
          <br />
          <a
            href={data.social.Resume}
            className="view__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
