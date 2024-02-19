import { useDispatch, useSelector } from "react-redux";

import CategoriesList from "../../components/Categories";
import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { updateTask } from "../../services/redux/tasks/updateTaskSlice";
import { useState } from "react";

function UpdateTask({ task, loadTask, toggleForm }) {
  const dispatch = useDispatch();
  const { updating, success, error } = useSelector(
    (state) => state.updateSubtask
  );
  const [categoryId, setCategoryId] = useState(0);

  const [taskRequest, setTaskRequest] = useState({
    name: task.name,
    description: task.description,
    categoryId: task.categoryId,
    epicId: task.epicId,
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
    if (categoryId !== 0) taskRequest.categoryId = categoryId;
    dispatch(updateTask({ taskId: task.id, request: taskRequest }));
    setTimeout(() => {
      toggleForm();
      loadTask();
    }, 100);
  }

  return (
    <div>
      <h1>Update Task</h1>
      <CategoriesList handleSetCategory={handleSetCategory} />
      <Form
        formData={taskData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Update task"
      />
      {success && (
        <Notification message="Task updated successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default UpdateTask;
