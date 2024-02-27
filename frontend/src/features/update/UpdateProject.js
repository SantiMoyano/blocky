import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { updateProject } from "../../services/redux/projects/updateProjectSlice";
import { useState } from "react";

function UpdateProject({ project, loadProject, toggleForm }) {
  const dispatch = useDispatch();
  const { updating, success, error } = useSelector(
    (state) => state.updateProject
  );

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
    dispatch(
      updateProject({
        projectId: project.id,
        request: projectRequest,
      })
    );
    toggleForm();
    setTimeout(() => {
      loadProject();
    }, 50);
  }

  return (
    <div className="pt-6 pb-2 blue-bg rounded rounded-lg">
      <Form
        formData={projectData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Edit project"
      />
      {success && (
        <Notification message="Project updated successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default UpdateProject;
