import React from 'react';
import data from '../../pages/context.json';

const ProjectsData = () => {
  return data.Projects.map((project) => {
    return (
      <li className={`project__item${project.id % 2 === 0 ? '__even' : ''}`}>
        <img src={project.image} alt="" className="project__image" />
        <div className="right">
          <header className="project__header">{project.name}</header>
          <p className="project__description">{project.description}</p>
          <br />
          <a
            href={project.link}
            className="view__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </li>
    );
  });
};
export default ProjectsData;