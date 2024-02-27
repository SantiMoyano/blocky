import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Chip } from "@material-tailwind/react";
import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { reset } from "../../services/redux/subtasks/updateSubtaskSlice";
import { updateSubtask } from "../../services/redux/subtasks/updateSubtaskSlice";

function UpdateSubtask({ subtaskToUpdate, loadSubtasks, closeUpdateForm }) {
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
  }

  useEffect(() => {
    if (success === true) {
      loadSubtasks();
      dispatch(reset());
      closeUpdateForm();
    }
  }, [success, loadSubtasks, closeUpdateForm]);

  return (
    <div className="pb-2 blue-bg rounded rounded-lg">
      <div className="flex items-end justify-end mr-8 mt-8">
        <Chip onClick={closeUpdateForm} value="x" className="dark-red-bg" />
      </div>
      <Form
        formData={subtaskData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Edit task"
      />
      {success && (
        <Notification message="Subtask updated successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default UpdateSubtask;
