import React from 'react';
import data from '../context.json';
import portrait from './images/portrait.jpg';
import foundations_badge from './images/infrastructure_badge.png';
import dev_badge from './images/dev_badge.png';

const About = () => {
  return (
    <section className="about__container" id="about">
      <div className="background__image" />
      <div className="grid__container">
        <div className="left">
          <div className="portrait__container">
            <img src={portrait} className="portrait" alt="" />
            <div className="badge__container">
              <a
                className="badge__container"
                href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=4FCDC324F5F59B1923A58A7512DE95D8418DC01CF7FBD4447911D6C336183A8C"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={foundations_badge} className="badge" />
              </a>
              <a
                className="badge__container"
                href="https://catalog-education.oracle.com/pls/certview/sharebadge?id=7B6BF26ED1A29B37C740942642FB7180BCA7A79B18CC8F1507AF5CDE41B3451C"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={dev_badge} className="badge" />
              </a>
            </div>
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
