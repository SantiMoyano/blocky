import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects, getAllProjectsRequest, getAllProjectsSuccess, getAllProjectsFailure } from "../../redux/projects/projectSlices";

function Projects() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const loading = useSelector((state) => state.projects.loading);
  const error = useSelector((state) => state.projects.error);

  useEffect(() => {
    // Dispatch the getAllProjects action when the component mounts
    
    const token = localStorage.getItem("authToken");
    console.log(token);
    dispatch(getAllProjects(token));
  }, [dispatch]);

  return (
    <div>
      <h1>Projects</h1>
      {loading && <p>Loading projects...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;

