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

function Subtasks({ taskId }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [subtasksList, setSubtasksList] = useState([]);
  const [doneSubtasks, setDoneSubtasks] = useState([]);
  const [toDoSubtasks, setToDoSubtasks] = useState([]);
  const { subtasks, loading, error } = useSelector((state) => state.subtasks);
  const { deleting } = useSelector((state) => state.deleteSubtask);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [subtaskToUpdate, setSubtaskToUpdate] = useState({
    subtaskId: 0,
    description: "",
  });

  useEffect(() => {
    dispatch(getAllSubtasks(taskId));
  }, [dispatch, taskId]);

  useEffect(() => {
    if (subtasks) {
      setSubtasksList(subtasks);
      loadSubtasks();
    }
  }, []);

  async function loadSubtasks() {
    dispatch(getAllSubtasks(taskId));
    setSubtasksList(subtasks);
    if (subtasksList.length > 0) {
      setDoneSubtasks(subtasksList.filter((subtask) => subtask.isDone));
      setToDoSubtasks(subtasksList.filter((subtask) => !subtask.isDone));
    }
  }

  function handleClick(subtaskId) {
    dispatch(toggleIsDone(subtaskId));
    loadSubtasks();
  }

  function toggleUpdateForm() {
    setShowUpdateForm(!showUpdateForm);
  }

  function handleEdit({ subtaskId, description, taskId }) {
    toggleUpdateForm();
    setSubtaskToUpdate({
      subtaskId,
      description,
      taskId,
    });
  }

  function handleDelete(subtaskId) {
    dispatch(deleteSubtask(subtaskId));
    loadSubtasks();
  }

  function handleSwitchClick() {
    setShowForm(!showForm);
  }

  return (
    <>
      <SwitchButton text="Add Subtask" handleClick={handleSwitchClick} />
      {showForm && (
        <CreateSubtask loadSubtasks={loadSubtasks} taskId={taskId} />
      )}
      {showUpdateForm && (
        <UpdateSubtask
          subtaskToUpdate={subtaskToUpdate}
          loadSubtasks={loadSubtasks}
        />
      )}
      <SubtasksList
        list={toDoSubtasks}
        isDone={false}
        handleClick={handleClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <SubtasksList
        list={doneSubtasks}
        isDone={true}
        handleClick={handleClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default Subtasks;
