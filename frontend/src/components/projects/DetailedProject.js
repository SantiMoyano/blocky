import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, deleteProject } from "../../redux/projects/projectSlice";
import { useParams } from "react-router-dom";
import Epics from "../epics/Epics";
import UpdateProject from "./UpdateProject";

function DetailedProject() {
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState();
  const { projectId } = useParams();
  const { project, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    if (projectId) {
      dispatch(getProjects(projectId));
    }
  }, [dispatch, projectId]);

  if (loading) return <p>Loading project details...</p>;

  if (error) return <p>Error: {error}</p>;

  function handleEdit() {
    setShowEditForm(!showEditForm);
  }

  function loadProject() {
    dispatch(getProjects(projectId));
  }

  function handleDelete() {
    dispatch(deleteProject(projectId));
  }

  return (
    <>
      <section>
        <h2>Detailed Project {projectId}</h2>
        <button onClick={handleEdit}>Edit project</button>
        <button onClick={handleDelete}>Delete project</button>
        {showEditForm && (
          <UpdateProject project={project} loadProject={loadProject} />
        )}
        <div className="project-info">
          <p>Name: {project.name}</p>
          <p>Description: {project.description}</p>
          <p>Goal: {project.goal}</p>
        </div>
      </section>
      <Epics projectId={projectId} />
    </>
  );
}

export default DetailedProject;
