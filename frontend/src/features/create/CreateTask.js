import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoriesList from "../../components/Categories";
import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { createTask } from "../../services/redux/tasks/createTaskSlice";

function CreateTask({ loadTasks, epicId }) {
  const dispatch = useDispatch();
  const { creating, success, error } = useSelector((state) => state.createTask);
  const [categoryId, setCategoryId] = useState(0);

  const [taskRequest, setTaskRequest] = useState({
    name: "",
    description: "",
    categoryId: categoryId,
    epicId: epicId,
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
      type: "textarea",
      name: "description",
      value: taskRequest.description,
    },
  ];

  function handleSetCategory(e) {
    setCategoryId(e.target.value);
  }

  function handleChange(e) {
    setTaskRequest({
      ...taskRequest,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    taskRequest.categoryId = categoryId;
    dispatch(createTask(taskRequest));
    setTimeout(() => loadTasks(), 50);
  }

  return (
    <div>
      <h1>Create new Task</h1>
      <CategoriesList handleSetCategory={handleSetCategory} />
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
