import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../services/redux/projects/projectSlices";
import BlockSection from "./blocks/BlockSection";
import CreateProject from "../features/create/CreateProject";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Title from "./ui/Title";

function Projects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [showForm, setShowForm] = useState(false);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  useEffect(() => {
    // Dispatch the getAllProjects action when the component mounts
    loadProjects();
  }, []);

  function loadProjects() {
    const token = localStorage.getItem("authToken");
    dispatch(getAllProjects(token));
    setShowForm(false);
  }

  return (
    <section>
      <Title titleName="PROJECTS" />
      <div className="flex justify-end pr-8 pl-8 pb-4 pt-4">
        <button onClick={() => setShowForm(!showForm)}>
          {!showForm ? (
            <div className="flex items-center justify-center">
              <p className=" pr-2 pl-2">New Project</p>
              <PlusIcon color="white" strokeWidth={4} className="h-6 w-6" />
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <XMarkIcon color="white" strokeWidth={4} className="h-6 w-6" />
            </div>
          )}
        </button>
      </div>

      {showForm && <CreateProject loadProjects={loadProjects} />}
      {loading && <p>Loading projects...</p>}
      {error && <p>Error: {error}</p>}
      <BlockSection list={projects} handleElemClick={handleProjectClick} />
    </section>
  );
}

export default Projects;
