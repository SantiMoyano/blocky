import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import {
  getAllSubtasks,
  toggleIsDone,
} from "../../services/redux/subtasks/subtasksSlice";
import { useDispatch, useSelector } from "react-redux";

import { Chip } from "@material-tailwind/react";
import CreateSubtask from "../../features/create/CreateSubtask";
import DialogWithForm from "../../utils/FormDialog";
import SubtasksList from "./SubtasksList";
import Subtitle from "../ui/Subtitle";
import SwitchButton from "../../utils/SwitchButton";
import Title from "../ui/Title";
import UpdateSubtask from "../../features/update/UpdateSubtask";
import { deleteSubtask } from "../../services/redux/subtasks/deleteSubtaskSlice";

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
      <div className="flex items-center justify-center gap-2 mt-8 mb-2">
        <h3 className="font-bold text-white word-break-blocky">Subtasks</h3>
        <button onClick={() => setShowSubtasks(!showSubtasks)}>
          {!showSubtasks ? (
            <ChevronDownIcon className="w-6 h-6 text-white border-2 rounded-md" />
          ) : (
            <ChevronUpIcon className="w-6 h-6 text-white border-2 rounded-md" />
          )}
        </button>
      </div>

      {showSubtasks && (
        <div className="pt-2">
          <div className="actions flex items-center justify-between">
            <div className="flex justify-center items-center">
              <Chip
                value={!showDoneSubtask ? "Done" : "Todo"}
                onClick={() => setShowDoneSubtask(!showDoneSubtask)}
                className=" dark-red-bg ml-8 done-btn px-2 py-2"
              />
            </div>
            <div className="pb-2 add-subtask-btn">
              <DialogWithForm
                childComponent={
                  <CreateSubtask loadSubtasks={loadSubtasks} taskId={taskId} />
                }
                buttonInfo="New subtask"
              />
            </div>
          </div>
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
        </div>
      )}
    </>
  );
}

export default Subtasks;
