import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetails } from "../../redux/tasks/taskDetailSlice";
import { useParams } from "react-router-dom";

function DetailedTask() {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const { taskDetail, loading, error } = useSelector((state) => state.task);

  useEffect(() => {
    if (taskId) dispatch(getTaskDetails(taskId));
  }, [dispatch, taskId]);

  if (loading) return <p>Loading Task details...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h2>Detailed Task {taskId}</h2>
      <p>{taskDetail.name}</p>
      <p>{taskDetail.progress}</p>
      <p>ShortDesc</p>
    </section>
  );
}

export default DetailedTask;
