import React from 'react';
import data from '../context.json'

const Home = () => {
  return (
    <section className="home__container" id="home">
      <div className="hero">
        <h1 className="hero__header">{data.name}</h1>
        <p className="hero__blurb">{data.hero}</p>
      </div>
    </section>
  );
};

export default Home;