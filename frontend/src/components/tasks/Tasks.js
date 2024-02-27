import React, { useEffect, useState } from "react";
import { getAllTasks, reset } from "../../services/redux/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

import BlockSection from "../blocks/BlockSection";
import CreateTask from "../../features/create/CreateTask";
import DialogWithForm from "../../utils/FormDialog";
import Loading from "../../utils/Loading";
import { PopoverInfo } from "../../utils/PopoverInfo";
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
      <div className="mt-6 ">
        <div className="flex justify-center">
          <Subtitle subtitleName="FEATURES" />
          <PopoverInfo popoverInfo="Features represent specific functionalities or capabilities of the application, categorized into frontend and backend. For example, at the epic level of 'User Authentication', features could include 'Login Form', 'Login Endpoint', etc." />
        </div>
        <SelectCategory
          handleChange={handleCategorySelection}
          labelInfo="Category"
        />
        <div className="py-4 px-6">
          <DialogWithForm
            childComponent={
              <CreateTask loadTasks={loadTasks} epicId={epicId} />
            }
            buttonInfo="New feature"
          />
          <BlockSection list={taskList} handleElemClick={handleTaskClick} />
        </div>
      </div>
    </section>
  );
}

export default Tasks;
