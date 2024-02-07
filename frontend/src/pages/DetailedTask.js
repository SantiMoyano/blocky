import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaskDetails,
  deleteTask,
} from "../services/redux/tasks/taskDetailSlice";
import { useParams } from "react-router-dom";
import Subtasks from "../components/subtasks/Subtasks";
import UpdateTask from "../features/update/UpdateTask";
import SwitchButton from "../utils/SwitchButton";
import Title from "../components/ui/Title";

function DetailedTask() {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [showEditForm, setShowEditForm] = useState();
  const { task, loading, error } = useSelector((state) => state.task);

  useEffect(() => {
    if (taskId) loadTask();
  }, []);

  if (loading) return <p>Loading Task details...</p>;

  if (error) return <p>Error: {error}</p>;

  function handleEdit() {
    setShowEditForm(!showEditForm);
  }

  function loadTask() {
    dispatch(getTaskDetails(taskId));
  }

  function handleDelete() {
    dispatch(deleteTask(taskId));
  }

  return (
    <section>
      <Title titleName={task.name} />
      <button onClick={handleEdit}>Edit task</button>
      <button onClick={handleDelete}>Delete task</button>
      <p>{task.name}</p>
      <p>{task.categoryId}</p>
      <p>{task.progress}</p>
      <p>{task.description}</p>

      {showEditForm && <UpdateTask task={task} loadTask={loadTask} />}
      <Subtasks taskId={taskId} />
    </section>
  );
}

export default DetailedTask;
