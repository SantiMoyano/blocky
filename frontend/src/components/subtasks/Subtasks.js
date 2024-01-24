import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSubtasks,
  toggleIsDone,
} from "../../redux/subtasks/subtasksSlice";
import SubtasksList from "./SubtasksList";
import CreateSubtask from "./CreateSubtask";
import UpdateSubtask from "./UpdateSubtask";

function Subtasks({ taskId }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [subtasksList, setSubtasksList] = useState([]);
  const [doneSubtasks, setDoneSubtasks] = useState([]);
  const [toDoSubtasks, setToDoSubtasks] = useState([]);
  const { subtasks, loading, error } = useSelector((state) => state.subtasks);

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
  }, [subtasks]);

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

  return (
    <>
      <button onClick={() => setShowForm(!showForm)}>Add Subtask +</button>
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
      />
      <SubtasksList
        list={doneSubtasks}
        isDone={true}
        handleClick={handleClick}
        handleEdit={handleEdit}
      />
    </>
  );
}

export default Subtasks;
