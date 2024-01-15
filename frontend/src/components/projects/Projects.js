import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../../redux/projects/projectSlices";
import BlockSection from "../blocks/BlockSection";

function Projects() {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    // Redirige a la nueva ruta con el ID del proyecto
    navigate(`/project/${projectId}`);
  };

  useEffect(() => {
    // Dispatch the getAllProjects action when the component mounts
    const token = localStorage.getItem("authToken");
    dispatch(getAllProjects(token));
  }, [dispatch]);

  return (
    <div>
      <h1>Projects</h1>
      {loading && <p>Loading projects...</p>}
      {error && <p>Error: {error}</p>}
      <BlockSection list={projects} handleElemClick={handleProjectClick} />
    </div>
  );
}

export default Projects;
