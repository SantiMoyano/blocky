import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Chip } from "@material-tailwind/react";
import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { reset } from "../../services/redux/tasks/updateTaskSlice";
import { updateTask } from "../../services/redux/tasks/updateTaskSlice";

function UpdateTask({ taskToUpdate, loadTasks, closeUpdateForm }) {
  const dispatch = useDispatch();
  const { updating, success, error } = useSelector((state) => state.updateTask);

  const [taskRequest, setTaskRequest] = useState({
    description: taskToUpdate.description,
    featureId: taskToUpdate.featureId,
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
    dispatch(
      updateTask({
        taskId: taskToUpdate.taskId,
        request: taskRequest,
      })
    );
  }

  useEffect(() => {
    if (success === true) {
      loadTasks();
      dispatch(reset());
      closeUpdateForm();
    }
  }, [success, loadTasks, closeUpdateForm]);

  return (
    <div className="pb-2 blue-bg rounded rounded-lg">
      <div className="flex items-end justify-end mr-8 mt-8">
        <Chip onClick={closeUpdateForm} value="x" className="dark-red-bg" />
      </div>
      <Form
        formData={taskData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Edit task"
      />
      {success && (
        <Notification message="Task updated successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default UpdateTask;
