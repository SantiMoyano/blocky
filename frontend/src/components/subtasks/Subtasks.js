import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSubtasks } from "../../redux/subtasks/subtasksSlice";
import SubtasksList from "./SubtasksList";
import CreateSubtask from "./CreateSubtask";

function Subtasks({ taskId }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [subtasksList, setSubtasksList] = useState([]);
  const [doneSubtasks, setDoneSubtasks] = useState([]);
  const [toDoSubtasks, setToDoSubtasks] = useState([]);
  const { subtasks, loading, error } = useSelector((state) => state.subtasks);

  useEffect(() => {
    dispatch(getAllSubtasks(taskId));
  }, [dispatch, taskId]);

  useEffect(() => {
    if (subtasks) {
      setSubtasksList(subtasks);
      loadSubtasks();
    }
  }, [subtasks]);

  function loadSubtasks() {
    dispatch(getAllSubtasks(taskId));
    setDoneSubtasks(subtasksList.filter((subtask) => subtask.isDone));
    setToDoSubtasks(subtasksList.filter((subtask) => !subtask.isDone));
  }

  return (
    <>
      <button onClick={() => setShowForm(!showForm)}>Add Subtask +</button>
      {showForm && (
        <CreateSubtask loadSubtasks={loadSubtasks} taskId={taskId} />
      )}
      <SubtasksList list={toDoSubtasks} isDone={false} />
      <SubtasksList list={doneSubtasks} isDone={true} />
    </>
  );
}

export default Subtasks;
