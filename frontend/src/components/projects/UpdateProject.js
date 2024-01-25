import { useState } from "react";
import Form from "../form/Form";
import Notification from "../notification/Notification";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../../redux/projects/updateProjectSlice";

function UpdateProject({ project, loadProject }) {
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

  return (
    <div>
      <h1>Update Project</h1>
      <Form
        formData={projectData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Update project"
      />
      {success && (
        <Notification message="Project updated successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default UpdateProject;
