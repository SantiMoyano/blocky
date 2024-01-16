import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../../redux/tasks/tasksSlice";
import BlockSection from "../blocks/BlockSection";

function Tasks({ epicId }) {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the action to get all epics for the specified epic
    dispatch(getAllTasks(epicId));
  }, [dispatch, epicId]);

  function handleTaskClick(taskId) {
    navigate(`/task/${taskId}`);
  }

  return (
    <section>
      <h2>Tasks</h2>
      <BlockSection list={tasks} handleElemClick={handleTaskClick} />
    </section>
  );
}

export default Tasks;
