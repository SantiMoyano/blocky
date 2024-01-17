import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSubtasks } from "../../redux/subtasks/subtasksSlice";

function Subtasks({ taskId }) {
  const dispatch = useDispatch();
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
      updateSubtasks();
    }
  }, [subtasks]);

  function updateSubtasks() {
    setDoneSubtasks(subtasksList.filter((subtask) => subtask.isDone));
    setToDoSubtasks(subtasksList.filter((subtask) => !subtask.isDone));
  }

  return (
    <>
      <SubtasksList list={toDoSubtasks} isDone={false} />
      <SubtasksList list={doneSubtasks} isDone={true} />
    </>
  );
}

function SubtasksList({ list, isDone }) {
  return (
    <>
      {!isDone ? <h2>To Do</h2> : <h2>Done tasks</h2>}
      <ul>
        {list.map((elem) => (
          <Subtask key={elem.id} name={elem.name} color={elem.color} />
        ))}
      </ul>
    </>
  );
}

function Subtask({ name, color }) {
  return <li style={{ backgroundColor: color }}>{name}</li>;
}

export default Subtasks;
