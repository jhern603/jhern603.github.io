import React from 'react';
import data from '../../pages/context.json'

const ProjectsData = () => {
  return data.Projects.map((project) => {
    return (
      <li
        className={`test ${
          project.id % 2 === 1 ? 'project__item__even' : 'project__item '
        }`}
      >
        <img src={project.image} alt="" className="project__image" />
        <div className="right">
          <header className="project__header">{project.name}</header>
          <span className="project__description">{project.description}</span>
        </div>
      </li>
    );
  });
};
export default ProjectsData;
