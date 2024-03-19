import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { updateProject } from "../../services/redux/projects/updateProjectSlice";

function UpdateProject({ project, loadProject, toggleForm }) {
  const dispatch = useDispatch();
  const { updating, error } = useSelector((state) => state.updateProject);

  const [formError, setFormError] = useState({
    message: "",
    formIsInvalid: false,
  });

  const [projectRequest, setProjectRequest] = useState({
    name: project.name,
    description: project.description,
    goal: project.goal,
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
    dispatch(
      updateProject({
        projectId: project.id,
        request: projectRequest,
      })
    );
    setTimeout(() => {
      loadProject();
    }, 50);
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
        formInfo="Edit Project"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo={updating ? "Updating..." : "Edit Project"}
      />
      <div className="flex justify-center items-center">
        {error && (
          <Notification message="An error has occurred" type={"failure"} />
        )}
        {formError.formIsInvalid && (
          <Notification message={formError.message} type={"failure"} />
        )}
      </div>
    </div>
  );
}

export default UpdateProject;
