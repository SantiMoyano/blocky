import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlockSection from "./blocks/BlockSection";
import { Chip } from "@material-tailwind/react";
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

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    dispatch(getAllProjects(token));
  }, [dispatch]);

  useEffect(() => {}, [projects]);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  async function loadProjects() {
    const token = localStorage.getItem("authToken");
    dispatch(getAllProjects(token));
  }

  // Check if loading is true or error exists
  if (loading || error) {
    return <Loading />;
  }

  return (
    <section className="min-height-app gradient-bg">
      <Title titleName="PROJECTS" />
      <div className="mt-4 px-6 list-content py-4">
        <div className="flex justify-center items-center select-actions">
          <div className="pb-2">
            <DialogWithForm
              childComponent={<CreateProject loadProjects={loadProjects} />}
              buttonInfo="New project"
            />
          </div>
        </div>
        {projects && (
          <BlockSection list={projects} handleElemClick={handleProjectClick} />
        )}
      </div>
    </section>
  );
}

export default Projects;
