import React from 'react';
import '../styles/projects.css'
import ProjectsData from '../components/experience';
export default function Projects() {
  return (
    <div className="page_section" id="projects">
      <div className="page_seperator"></div>
      <div className="page_seperator"></div>
      <h1 className="page_header rotated" >Experience</h1>
      <div className="experience_container">
        <ProjectsData />
      </div>
    </div>
  )
}
