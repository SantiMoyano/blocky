import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { updateSubtask } from "../../services/redux/subtasks/updateSubtaskSlice";

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
