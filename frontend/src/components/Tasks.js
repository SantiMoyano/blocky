import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../services/redux/tasks/tasksSlice";
import BlockSection from "./blocks/BlockSection";
import CreateTask from "../features/create/CreateTask";

function Tasks({ epicId }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  function handleTaskClick(taskId) {
    navigate(`/task/${taskId}`);
  }

  function loadTasks() {
    dispatch(getAllTasks(epicId));
  }

  return (
    <section>
      <h2>Tasks</h2>
      <button onClick={() => setShowForm(!showForm)}>Add Task +</button>
      {showForm && <CreateTask loadTasks={loadTasks} epicId={epicId} />}
      <BlockSection list={tasks} handleElemClick={handleTaskClick} />
    </section>
  );
}

export default Tasks;
