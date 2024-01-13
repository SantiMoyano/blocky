import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/projects/projectSlice";
import { useParams } from "react-router-dom";

function DetailedProject() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { project, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    if (projectId) {
      dispatch(getProjects(projectId));
    }
  }, [dispatch, projectId]);

  if (loading) return <p>Loading project details...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section>
        <h2>Detailed Project {projectId}</h2>
        <div className="project-info">
          <p>Name: {project.name}</p>
          <p>Description: {project.description}</p>
          <p>Goal: {project.goal}</p>
        </div>
      </section>
      <BlockSection />
    </>
  );
}

function BlockSection() {
  return (
    <div>
      <h1>HI!</h1>
    </div>
  );
}

export default DetailedProject;
