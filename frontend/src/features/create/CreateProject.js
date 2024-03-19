import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { createProject } from "../../services/redux/projects/createProjectSlice";

function CreateProject({ loadProjects }) {
  const dispatch = useDispatch();
  const { creating, success, error } = useSelector(
    (state) => state.createProject
  );
  const [formError, setFormError] = useState({
    message: "",
    formIsInvalid: false,
  });

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
      type: "textarea",
      name: "description",
      value: projectRequest.description,
    },
    {
      label: "Goal",
      type: "textarea",
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
    if (!formIsValid()) return;
    const token = localStorage.getItem("authToken");
    dispatch(createProject({ token, request: projectRequest }));
    setTimeout(() => loadProjects(), 50);
  }

  function formIsValid() {
    const emptyFields = Object.values(projectRequest).some(
      (value) => value === ""
    );
    const longFields = Object.values(projectRequest).some(
      (value) => value.length > 200
    );
    if (emptyFields) {
      setFormError({ message: "There are empty fields", formIsInvalid: true });
      return false;
    }
    if (longFields) {
      setFormError({ message: "Too long fields!", formIsInvalid: true });
      return false;
    }
    return true;
  }

  return (
    <div className="pt-6 pb-2 blue-bg rounded rounded-lg">
      <Form
        formData={projectData}
        formInfo="Create Project"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo={creating ? "Creating..." : "Create Project"}
      />
      <div className="flex justify-center items-center">
        {error && (
          <Notification message="An error has ocurred" type={"failure"} />
        )}
        {formError.formIsInvalid && (
          <Notification message={formError.message} type={"failure"} />
        )}
      </div>
    </div>
  );
}

export default CreateProject;
