import "../blocks/blocky.css";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import {
  getAllTasks,
  toggleIsDone,
} from "../../services/redux/tasks/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

import { Chip } from "@material-tailwind/react";
import CreateTask from "../../features/create/CreateTask";
import DialogWithForm from "../../utils/FormDialog";
import TasksList from "./TasksList";
import UpdateTask from "../../features/update/UpdateTask";
import { deleteTask } from "../../services/redux/tasks/deleteTaskSlice";

function Tasks({ featureId }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [showDoneTask, setShowDoneTask] = useState(false);
  const [doneTaskList, setDoneTaskList] = useState([]);
  const [showTaskToUpdate, setShowTaskToUpdate] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [showTasks, setShowTasks] = useState(true);
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { deleting } = useSelector((state) => state.deleteTask);

  useEffect(() => {
    dispatch(getAllTasks(featureId));
  }, [dispatch, featureId]);

  useEffect(() => {
    if (tasks.length > 0) {
      setTaskList(tasks.filter((task) => !task.isDone));
      setDoneTaskList(tasks.filter((task) => task.isDone));
    }
  }, [tasks]);

  function loadTasks() {
    dispatch(getAllTasks(featureId));
  }

  function handleToggleIsDone(taskId) {
    dispatch(toggleIsDone(taskId));
    setTimeout(() => {
      loadTasks();
    }, 200);
  }

  function handleEdit(taskToUpdate) {
    setTaskToUpdate(taskToUpdate);
    setShowTaskToUpdate(true);
  }

  function handleDelete(taskId) {
    dispatch(deleteTask(taskId));
    setTimeout(() => {
      loadTasks();
    }, 200);
  }

  function handleSwitchClick() {
    setShowForm(!showForm);
  }

  function handleCloseUpdate() {
    setTaskToUpdate(null);
    setShowTaskToUpdate(false);
  }

  return (
    <>
      <div className="flex items-center justify-center gap-2 mt-2 py-4">
        <h3 className="font-bold text-white word-break-blocky">TASKS</h3>
        <button onClick={() => setShowTasks(!showTasks)}>
          {!showTasks ? (
            <ChevronDownIcon className="w-6 h-6 text-white border-2 rounded-md" />
          ) : (
            <ChevronUpIcon className="w-6 h-6 text-white border-2 rounded-md" />
          )}
        </button>
      </div>

      {showTasks && (
        <div className=" taskactions-parent">
          <div className="flex justify-between gap-1 px-2 taskactions">
            <div className="flex justify-center items-center">
              <Chip
                value={!showDoneTask ? "Done" : "Todo"}
                onClick={() => setShowDoneTask(!showDoneTask)}
                className="dark-red-bg done-btn px-2 py-2 edit-btn"
              />
            </div>
            <div className="mb-1">
              <DialogWithForm
                childComponent={
                  <CreateTask loadTasks={loadTasks} featureId={featureId} />
                }
                buttonInfo="New task"
                isEdit={true}
              />
            </div>
          </div>
          {showTaskToUpdate && (
            <UpdateTask
              taskToUpdate={taskToUpdate}
              loadTasks={() => dispatch(getAllTasks(featureId))}
              closeUpdateForm={handleCloseUpdate}
            />
          )}
          {showDoneTask ? (
            <TasksList
              list={doneTaskList}
              isDone={true}
              handleClick={() => console.log("click")}
              handleEdit={() => console.log("click")}
              handleDelete={handleDelete}
            />
          ) : (
            <TasksList
              list={taskList}
              handleClick={handleToggleIsDone}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Tasks;
