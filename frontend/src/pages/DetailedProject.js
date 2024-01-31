import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  deleteProject,
} from "../services/redux/projects/projectSlice";
import { useParams } from "react-router-dom";
import Epics from "../components/Epics";
import UpdateProject from "../features/update/UpdateProject";
import Title from "../components/ui/Title";

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
    <section>
      <Title titleName={project.name} />
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
      <Epics projectId={projectId} />
    </section>
  );
}

export default DetailedProject;
