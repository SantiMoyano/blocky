import React, { useEffect, useState } from "react";
import { getAllTasks, reset } from "../../services/redux/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

import BlockSection from "../blocks/BlockSection";
import CreateTask from "../../features/create/CreateTask";
import Loading from "../../utils/Loading";
import SelectCategory from "./SelectCategory";
import Subtitle from "../ui/Subtitle";
import SwitchButton from "../../utils/SwitchButton";
import { useNavigate } from "react-router-dom";

function Tasks({ epicId }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    dispatch(reset());
    dispatch(getAllTasks(epicId));
  }, []);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  function handleTaskClick(taskId) {
    navigate(`/task/${taskId}`);
  }

  function loadTasks() {
    dispatch(getAllTasks(epicId));
    if (tasks) setTaskList(tasks);
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

  if (loading || error) {
    return <Loading />;
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
