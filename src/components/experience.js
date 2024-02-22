import React from 'react';
import data from '../context.json';

const ProjectsData = () => {
  return data.experience.map((experience) => {
    return (
      <div className="experience">
        <h3 className="experience_dates">{experience.dates}</h3>
        <div className="right">
          <h3 className="experience_header">{experience.job_title} - {experience.company}</h3>
          <p className="experience_text">{experience.description}</p>
          <a className="experience_link" href={experience.link} target="_blank">View Site</a>
          <ul className="skills_container">
            {experience.tags.map((item) => {
              return <li className="skill">{item}</li>
            })}
          </ul>
        </div>
      </div>
    );
  });
};
export default ProjectsData;