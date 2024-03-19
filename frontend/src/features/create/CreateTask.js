import React, { useState } from "react";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { createTask } from "../../services/redux/tasks/createTaskSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function CreateTask({ loadTasks, featureId }) {
  const dispatch = useDispatch();
  const { creating, error } = useSelector((state) => state.createTask);

  const [formError, setFormError] = useState({
    message: "",
    formIsInvalid: false,
  });

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
    if (!formIsValid()) return;
    dispatch(createTask(taskRequest));
    setTimeout(() => loadTasks(), 50);
  }

  function formIsValid() {
    if (taskRequest.description.trim() === "") {
      setFormError({ message: "There are empty fields", formIsInvalid: true });
      return false;
    }
    if (taskRequest.description.length > 200) {
      setFormError({ message: "Too long fields!", formIsInvalid: true });
      return false;
    }
    return true;
  }

  return (
    <div className="pt-6 pb-2 blue-bg rounded rounded-lg">
      <Form
        formData={taskData}
        formInfo="Create Task"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo={creating ? "Creating..." : "Create task"}
      />
      <div className="flex justify-center items-center">
        {error && <Notification message="An error has occurred" type="error" />}
        {formError.formIsInvalid && (
          <Notification message={formError.message} type={"failure"} />
        )}
      </div>
    </div>
  );
}

export default CreateTask;
