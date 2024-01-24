import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../redux/tasks/taskDetailSlice";
import { useParams } from "react-router-dom";
import Subtasks from "../subtasks/Subtasks";
import UpdateTask from "./UpdateTask";

function DetailedTask() {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [showEditForm, setShowEditForm] = useState();
  const { task, loading, error } = useSelector((state) => state.task);

  useEffect(() => {
    if (taskId) dispatch(getTaskDetails(taskId));
  }, [dispatch, taskId]);

  if (loading) return <p>Loading Task details...</p>;

  if (error) return <p>Error: {error}</p>;

  function handleEdit() {
    setShowEditForm(!showEditForm);
  }

  return (
    <section>
      <h2>Detailed Task {taskId}</h2>
      <button onClick={handleEdit}>Edit task</button>
      {showEditForm && <UpdateTask task={task} />}
      <p>{task.name}</p>
      <p>{task.categoryId}</p>
      <p>{task.progress}</p>
      <p>{task.description}</p>
      <Subtasks taskId={taskId} />
    </section>
  );
}

export default DetailedTask;
