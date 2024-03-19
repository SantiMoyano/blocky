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

  const [formError, setFormError] = useState({
    message: "",
    formIsInvalid: false,
  });

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
    if (!formIsValid()) return;
    dispatch(
      updateTask({
        taskId: taskToUpdate.taskId,
        request: taskRequest,
      })
    );
  }

  function formIsValid() {
    if (taskRequest.description.trim() === "") {
      setFormError({
        message: "Description cannot be empty",
        formIsInvalid: true,
      });
      return false;
    }
    if (taskRequest.description.length > 65) {
      setFormError({ message: "Too long fields!", formIsInvalid: true });
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (success === true) {
      loadTasks();
      dispatch(reset());
    }
  }, [success, loadTasks, closeUpdateForm]);

  return (
    <div className="pb-2 blue-bg rounded rounded-lg">
      <div className="flex items-end justify-end mr-8 mt-8">
        <Chip onClick={closeUpdateForm} value="x" className="dark-red-bg" />
      </div>
      <Form
        formData={taskData}
        formInfo="Edit task"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo={updating ? "Updating..." : "Edit task"}
      />
      <div className="flex justify-center items-center">
        {error && (
          <Notification message="An error has occurred" type={"failure"} />
        )}
        {formError.formIsInvalid && (
          <Notification message={formError.message} type={"failure"} />
        )}
      </div>
    </div>
  );
}

export default UpdateTask;
