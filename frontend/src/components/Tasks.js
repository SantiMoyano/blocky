import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllTasks } from "../services/redux/tasks/tasksSlice";
import BlockSection from "./blocks/BlockSection";
import CreateTask from "../features/create/CreateTask";
import SwitchButton from "../utils/SwitchButton";
import Title from "./ui/Title";

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

  function handleSwitchClick() {
    setShowForm(!showForm);
  }

  return (
    <section>
      <SwitchButton text="New Task" handleClick={handleSwitchClick} />
      {showForm && <CreateTask loadTasks={loadTasks} epicId={epicId} />}
      <BlockSection list={tasks} handleElemClick={handleTaskClick} />
    </section>
  );
}

export default Tasks;
