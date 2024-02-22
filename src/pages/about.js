import React from 'react';
import portrait from '../images/portrait.jpg'
import about from '../context.json'
import '../styles/about.css'
export default function About() {
  return (
    <div className="page_section" id="about">
      <div className='grid_container'>
        <div className="grid_left">
          <img className='portrait' src={portrait} alt="Portrait of Jose Hernandez" />
          <h1>{about.name}</h1>
          <h3>{about.headline}</h3>
          <p>{about.blurb}</p>
        </div>
        <div className="grid_right">
          <p dangerouslySetInnerHTML={{ __html: about.bio }} />
        </div>
      </div>
    </div>

  )
}
