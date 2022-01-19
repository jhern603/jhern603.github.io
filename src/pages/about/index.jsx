import React from 'react';
import data from '../context.json';
import portrait from './images/portrait.png';
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
        </div>
      </div>
    </section>
  );
};

export default About;
