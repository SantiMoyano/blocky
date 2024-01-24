import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../form/Form";
import Notification from "../notification/Notification";
import { updateSubtask } from "../../redux/subtasks/updateSubtaskSlice";

function UpdateSubtask({ subtaskToUpdate, loadSubtasks }) {
  const dispatch = useDispatch();
  const { updating, success, error } = useSelector(
    (state) => state.updateSubtask
  );

  const [subtaskRequest, setSubtaskRequest] = useState({
    description: subtaskToUpdate.description,
    taskId: subtaskToUpdate.taskId,
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
    dispatch(
      updateSubtask({
        subtaskId: subtaskToUpdate.subtaskId,
        request: subtaskRequest,
      })
    );
    setTimeout(() => {
      loadSubtasks();
    }, 50);
  }

  return (
    <div>
      <h1>Update Subtask</h1>
      <Form
        formData={subtaskData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Update subtask"
      />
      {success && (
        <Notification message="Subtask updated successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default UpdateSubtask;