import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlockSection from "./blocks/BlockSection";
import CreateProject from "../features/create/CreateProject";
import DialogWithForm from "../utils/FormDialog";
import Loading from "../utils/Loading";
import SwitchButton from "../utils/SwitchButton";
import Title from "./ui/Title";
import { getAllProjects } from "../services/redux/projects/projectSlices";
import { useNavigate } from "react-router-dom";

function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    dispatch(getAllProjects(token));
    // No need to set projectList here
    setShowForm(false);
  }, [dispatch]);

  useEffect(() => {}, [projects]);

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
    return <Loading />;
  }

  return (
    <section>
      <Title titleName="PROJECTS" />
      <div className="mt-4 px-6">
        <DialogWithForm
          childComponent={<CreateProject loadProjects={loadProjects} />}
          buttonInfo="New project"
        />
        {projects && (
          <BlockSection list={projects} handleElemClick={handleProjectClick} />
        )}
      </div>
    </section>
  );
}

export default Projects;
