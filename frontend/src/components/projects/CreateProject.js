import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../redux/projects/createProjectSlice";
import Form from "../form/Form";
import Notification from "../notification/Notification";

function CreateProject({ loadProjects }) {
  const dispatch = useDispatch();
  const { creating, success, error } = useSelector(
    (state) => state.createProject
  );

  const [projectRequest, setProjectRequest] = useState({
    name: "",
    description: "",
    goal: "",
  });

  const projectData = [
    {
      label: "Project Name",
      type: "text",
      name: "name",
      value: projectRequest.name,
    },
    {
      label: "Description",
      type: "text",
      name: "description",
      value: projectRequest.description,
    },
    {
      label: "Goal",
      type: "text",
      name: "goal",
      value: projectRequest.goal,
    },
  ];

  function handleChange(e) {
    setProjectRequest({
      ...projectRequest,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    dispatch(createProject({ token, request: projectRequest }));
    setTimeout(() => loadProjects(), 50);
  }

  return (
    <div>
      <h1>Create new Project</h1>
      <Form
        formData={projectData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Create project"
      />

      {success && (
        <Notification message="Project created successfully" type="success" />
      )}
      {error && <Notification message="An error has ocurred" type="error" />}
    </div>
  );
}

export default CreateProject;