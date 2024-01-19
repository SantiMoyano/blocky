import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../redux/projects/createProjectSlice";
import Form from "../form/Form";
import Notification from "../notification/Notification";

function CreateProject() {
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
  }

  return (
    <div>
      <h1>CREATE EL PROJECT</h1>
      <form onSubmit={handleSubmit}>
        <Form formData={projectData} handleChange={handleChange} />
        <button type="submit" disabled={creating}>
          {creating ? "Creating..." : "Create project"}
        </button>
      </form>

      {success && (
        <Notification message="Project created successfully" type="success" />
      )}
      {error && <Notification message="An error has ocurred" type="error" />}
    </div>
  );
}

export default CreateProject;
