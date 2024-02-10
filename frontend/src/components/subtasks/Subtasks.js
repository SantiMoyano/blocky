import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSubtask } from "../../services/redux/subtasks/deleteSubtaskSlice";
import {
  getAllSubtasks,
  toggleIsDone,
} from "../../services/redux/subtasks/subtasksSlice";
import SubtasksList from "./SubtasksList";
import CreateSubtask from "../../features/create/CreateSubtask";
import UpdateSubtask from "../../features/update/UpdateSubtask";
import SwitchButton from "../../utils/SwitchButton";
import { Chip } from "@material-tailwind/react";
import Title from "../ui/Title";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

function Subtasks({ taskId }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [subtaskList, setSubtaskList] = useState([]);
  const [showDoneSubtask, setShowDoneSubtask] = useState(false);
  const [doneSubtaskList, setDoneSubtaskList] = useState([]);
  const [showSubtaskToUpdate, setShowSubtaskToUpdate] = useState(false);
  const [subtaskToUpdate, setSubtaskToUpdate] = useState(null);
  const [showSubtasks, setShowSubtasks] = useState(false);
  const { subtasks, loading, error } = useSelector((state) => state.subtasks);
  const { deleting } = useSelector((state) => state.deleteSubtask);

  useEffect(() => {
    dispatch(getAllSubtasks(taskId));
  }, [dispatch, taskId]);

  useEffect(() => {
    if (subtasks.length > 0) {
      setSubtaskList(subtasks.filter((subtask) => !subtask.isDone));
      setDoneSubtaskList(subtasks.filter((subtask) => subtask.isDone));
    }
  }, [subtasks]);

  function loadSubtasks() {
    dispatch(getAllSubtasks(taskId));
  }

  function handleToggleIsDone(subtaskId) {
    dispatch(toggleIsDone(subtaskId));
    setTimeout(() => {
      loadSubtasks();
    }, 200);
  }

  function handleEdit(subtaskToUpdate) {
    setSubtaskToUpdate(subtaskToUpdate);
    setShowSubtaskToUpdate(true);
  }

  function handleDelete(subtaskId) {
    dispatch(deleteSubtask(subtaskId));
    setTimeout(() => {
      loadSubtasks();
    }, 200);
  }

  function handleSwitchClick() {
    setShowForm(!showForm);
  }

  function handleCloseUpdate() {
    setSubtaskToUpdate(null);
    setShowSubtaskToUpdate(false);
  }

  return (
    <>
      <Title titleName="Subtasks" />
      <button onClick={() => setShowSubtasks(!showSubtasks)}>
        {!showSubtasks ? (
          <ChevronDownIcon className="w-8 h-8 text-white border-2 mt-2 rounded-md" />
        ) : (
          <ChevronUpIcon className="w-8 h-8 text-white border-2 mt-2 rounded-md" />
        )}
      </button>

      {showSubtasks && (
        <>
          <div className="flex items-center justify-between">
            <div className="flex justify-center items-center">
              <Chip
                value={!showDoneSubtask ? "Done" : "Todo"}
                onClick={() => setShowDoneSubtask(!showDoneSubtask)}
                className="w-20 dark-red-bg ml-8"
              />
            </div>
            <div className="pb-2 ml-6">
              <SwitchButton
                text="Add Subtask +"
                handleClick={handleSwitchClick}
              />
            </div>
          </div>
          {showForm && (
            <CreateSubtask loadSubtasks={loadSubtasks} taskId={taskId} />
          )}
          {showSubtaskToUpdate && (
            <UpdateSubtask
              subtaskToUpdate={subtaskToUpdate}
              loadSubtasks={() => dispatch(getAllSubtasks(taskId))}
              closeUpdateForm={handleCloseUpdate}
            />
          )}
          {showDoneSubtask ? (
            <SubtasksList
              list={doneSubtaskList}
              isDone={true}
              handleClick={() => console.log("click")}
              handleEdit={() => console.log("click")}
              handleDelete={handleDelete}
            />
          ) : (
            <SubtasksList
              list={subtaskList}
              handleClick={handleToggleIsDone}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}
        </>
      )}
    </>
  );
}

export default Subtasks;
