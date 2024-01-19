import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEpics } from "../../redux/epics/epicsSlice";
import { useNavigate } from "react-router-dom";
import BlockSection from "../blocks/BlockSection";
import CreateEpic from "./CreateEpic";

function Epics({ projectId }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const { epics, loading, error } = useSelector((state) => state.epics);
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the action to get all epics for the specified project
    loadEpics(projectId);
  }, []);

  function handleEpicClick(epicId) {
    navigate(`/epic/${epicId}`);
  }

  function loadEpics(projectId) {
    dispatch(getAllEpics(projectId));
  }

  return (
    <>
      {/* Add any filtering or other options here if needed */}
      <button onClick={() => setShowForm(!showForm)}>Add epic +</button>
      {showForm && <CreateEpic loadEpics={loadEpics} />}
      <BlockSection list={epics} handleElemClick={handleEpicClick} />
    </>
  );
}

export default Epics;
