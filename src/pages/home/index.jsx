import React from 'react';
import data from '../context.json';
import Typewriter from 'typewriter-effect';

const Home = () => {
  return (
    <section className="home__container" id="home">
      <div className="hero">
        <h1 className="hero__header">{data.name}</h1>
        <Typewriter
          options={{ wrapperClassName:"hero__blurb" }}
          onInit={(typewriter) => {
            typewriter.changeDelay(30).typeString(data.hero).start();
            
          }}
        />
      </div>
    </section>
  );
};

export default Home;
