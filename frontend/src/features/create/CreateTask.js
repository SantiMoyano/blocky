import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { createTask } from "../../services/redux/tasks/createTaskSlice";

function CreateTask({ loadTasks, featureId }) {
  const dispatch = useDispatch();
  const { creating, success, error } = useSelector((state) => state.createTask);

  const [taskRequest, setTaskRequest] = useState({
    description: "",
    featureId: featureId,
  });

  const taskData = [
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
    <div className="pt-6 pb-2 blue-bg rounded rounded-lg">
      <Form
        formData={taskData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Create Task"
      />
      {success && (
        <Notification message="Task created successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default CreateTask;
