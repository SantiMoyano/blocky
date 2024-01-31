import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../services/redux/projects/projectSlices";
import BlockSection from "./blocks/BlockSection";
import CreateProject from "../features/create/CreateProject";
import Title from "./ui/Title";
import SwitchButton from "../utils/SwitchButton";

function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Dispatch the getAllProjects action when the component mounts
    loadProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  function loadProjects() {
    const token = localStorage.getItem("authToken");
    dispatch(getAllProjects(token));
    setShowForm(false);
  }

  function handleSwitchClick() {
    setShowForm(!showForm);
  }

  return (
    <section>
      <Title titleName="PROJECTS" />
      <SwitchButton text="New Project" handleClick={handleSwitchClick} />
      {showForm && <CreateProject loadProjects={loadProjects} />}
      {loading && <p>Loading projects...</p>}
      {error && <p>Error: {error}</p>}
      <BlockSection list={projects} handleElemClick={handleProjectClick} />
    </section>
  );
}

export default Projects;
