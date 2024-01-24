import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../form/Form";
import Notification from "../notification/Notification";
import CategoriesList from "../category/Categories";

function UpdateTask({ task }) {
  const dispatch = useDispatch();
  const { updating, success, error } = useSelector(
    (state) => state.updateSubtask
  );
  const [categoryId, setCategoryId] = useState(0);

  const [taskRequest, setTaskRequest] = useState({
    name: "",
    description: "",
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
      type: "text",
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
    //dispatch(updateTask(task));
    setTimeout(() => {
      //loadSubtasks();
    }, 50);
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
