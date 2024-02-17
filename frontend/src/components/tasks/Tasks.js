import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlockSection from "../blocks/BlockSection";
import CreateTask from "../../features/create/CreateTask";
import SelectCategory from "./SelectCategory";
import Subtitle from "../ui/Subtitle";
import SwitchButton from "../../utils/SwitchButton";
import { getAllTasks } from "../../services/redux/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";

function Tasks({ epicId }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  function handleTaskClick(taskId) {
    navigate(`/task/${taskId}`);
  }

  function loadTasks() {
    dispatch(getAllTasks(epicId));
    setTaskList(tasks);
  }

  function handleSwitchClick() {
    setShowForm(!showForm);
  }

  function handleCategorySelection(e) {
    const categoryId = e;

    const filteredTasks = tasks.filter(
      (task) => task.categoryId === categoryId
    );
    setTaskList(filteredTasks);
  }

  return (
    <section>
      <div className="mt-6">
        <Subtitle subtitleName="TASKS" />
        <SelectCategory handleChange={handleCategorySelection} />
        <SwitchButton text="New Task" handleClick={handleSwitchClick} />
        {showForm && <CreateTask loadTasks={loadTasks} epicId={epicId} />}
        <BlockSection list={taskList} handleElemClick={handleTaskClick} />
      </div>
    </section>
  );
}

export default Tasks;
