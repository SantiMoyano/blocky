import { useState } from "react";
import Form from "../form/Form";

function CreateProject() {
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
    console.log(projectRequest);
  }

  return (
    <div>
      <h1>CREATE EL PROJECT</h1>
      <form onSubmit={handleSubmit}>
        <Form formData={projectData} handleChange={handleChange} />
        <button type="submit">Create project</button>
      </form>
    </div>
  );
}

export default CreateProject;
