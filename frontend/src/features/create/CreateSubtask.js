import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { createSubtask } from "../../services/redux/subtasks/createSubtaskSlice";

function CreateSubtask({ loadSubtasks, taskId }) {
  const dispatch = useDispatch();
  const { creating, success, error } = useSelector(
    (state) => state.createSubtask
  );

  const [subtaskRequest, setSubtaskRequest] = useState({
    description: "",
    taskId: taskId,
  });

  const subtaskData = [
    {
      label: "Description",
      type: "text",
      name: "description",
      value: subtaskRequest.description,
    },
  ];

  function handleChange(e) {
    setSubtaskRequest({
      ...subtaskRequest,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createSubtask(subtaskRequest));
    setTimeout(() => loadSubtasks(), 50);
  }

  return (
    <div className="pt-6 pb-2 blue-bg rounded rounded-lg">
      <Form
        formData={subtaskData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Create subtask"
      />
      {success && (
        <Notification message="Subtask created successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default CreateSubtask;
