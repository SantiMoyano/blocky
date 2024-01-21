import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../redux/tasks/taskDetailSlice";
import { useParams } from "react-router-dom";
import Subtasks from "../subtasks/Subtasks";

function DetailedTask() {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const { task, loading, error } = useSelector((state) => state.task);

  useEffect(() => {
    if (taskId) dispatch(getTaskDetails(taskId));
  }, [dispatch, taskId]);

  if (loading) return <p>Loading Task details...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h2>Detailed Task {taskId}</h2>
      <p>{task.name}</p>
      <p>{task.categoryId}</p>
      <p>{task.progress}</p>
      <p>{task.description}</p>
      <Subtasks taskId={taskId} />
    </section>
  );
}

export default DetailedTask;
