import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../../redux/projects/projectSlices";
import BlockSection from "../blocks/BlockSection";
import CreateProject from "./CreateProject";

function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [showForm, setShowForm] = useState(false);

  const handleProjectClick = (projectId) => {
    // Redirige a la nueva ruta con el ID del proyecto
    navigate(`/project/${projectId}`);
  };

  useEffect(() => {
    // Dispatch the getAllProjects action when the component mounts
    loadProjects();
  }, []);

  function loadProjects() {
    const token = localStorage.getItem("authToken");
    dispatch(getAllProjects(token));
  }

  return (
    <section>
      <h2>Projects</h2>
      <button onClick={() => setShowForm(!showForm)}>Add project +</button>
      {showForm && <CreateProject loadProjects={loadProjects} />}
      {loading && <p>Loading projects...</p>}
      {error && <p>Error: {error}</p>}
      <BlockSection list={projects} handleElemClick={handleProjectClick} />
    </section>
  );
}

export default Projects;
