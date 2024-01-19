import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../redux/tasks/createTaskSlice";
import Form from "../form/Form";
import Notification from "../notification/Notification";
import Categories from "../category/Categories";

function CreateTask({ loadTasks, projectId }) {
  const dispatch = useDispatch();
  const { creating, success, error } = useSelector((state) => state.createTask);

  const [taskRequest, setTaskRequest] = useState({
    name: "",
    description: "",
    projectId: projectId,
  });

  const taskData = [
    {
      label: "Task Name",
      type: "text",
      name: "name",
      value: taskRequest.name,
    },
    {
      label: "Description",
      type: "text",
      name: "description",
      value: taskRequest.description,
    },
  ];

  function handleChange(e) {
    setTaskRequest({
      ...taskRequest,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createTask(taskRequest));
    setTimeout(() => loadTasks(), 50);
  }

  return (
    <div>
      <h1>Create new Task</h1>
      <Categories />
      <Form
        formData={taskData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Create task"
      />
      {success && (
        <Notification message="Task created successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default CreateTask;
