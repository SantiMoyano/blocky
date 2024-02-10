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
  const [projectList, setProjectList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    dispatch(getAllProjects(token));
    // No need to set projectList here
    setShowForm(false);
  }, [dispatch]);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  async function loadProjects() {
    const token = localStorage.getItem("authToken");
    dispatch(getAllProjects(token));
    // No need to set projectList here
    setShowForm(false);
  }

  function handleSwitchClick() {
    setShowForm(!showForm);
  }

  // Check if loading is true or error exists
  if (loading || error) {
    return <h1>Loading</h1>;
  }

  return (
    <section>
      <Title titleName="PROJECTS" />
      <SwitchButton text="New Project" handleClick={handleSwitchClick} />
      {showForm && <CreateProject loadProjects={loadProjects} />}
      {/* Render only if projects exists */}
      {projects && (
        <BlockSection list={projects} handleElemClick={handleProjectClick} />
      )}
    </section>
  );
}

export default Projects;
