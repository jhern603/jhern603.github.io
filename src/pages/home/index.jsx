import React from 'react';
import data from '../context.json';
import portrait from './images/portrait.png'
const Home = () => {
  return (
    <div className="page__container" id="home">
      <div className="background__image" />

      <div className="grid__container">
        <div className="left">
          <div className="portrait__container">
            <img src={portrait} className="portrait" alt="" />
          </div>
        </div>
        <div className="right">
          <p className="blurb">
            <header className="header">{data.name}</header>
            {data.blurb}
          </p>
          <ul className="buttons__container">
            <SocialButton href={data.social.Github} blurb="Github" />
            <SocialButton href={data.social.LinkedIn} blurb="LinkedIn" />
            <SocialButton href={data.social.Resume} blurb="Resume" />
            <SocialButton href={data.social.Photography} blurb="Photography" />
          </ul>
        </div>
      </div>
    </div>
  );
};

const SocialButton = (props) => {
  return (
    <li className="social__button">
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.blurb}
      </a>
    </li>
  );
};
export default Home;
