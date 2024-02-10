import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEpics } from "../services/redux/epics/epicsSlice";
import { useNavigate } from "react-router-dom";
import BlockSection from "./blocks/BlockSection";
import CreateEpic from "../features/create/CreateEpic";
import SwitchButton from "../utils/SwitchButton";

function Epics({ projectId }) {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const { epics, loading, error } = useSelector((state) => state.epics);
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the action to get all epics for the specified project
    loadEpics();
  }, []);

  function handleEpicClick(epicId) {
    navigate(`/epic/${epicId}`);
  }

  function loadEpics() {
    dispatch(getAllEpics(projectId));
  }

  function handleSwitchClick() {
    setShowForm(!showForm);
  }

  return (
    <>
      {/* Add any filtering or other options here if needed */}
      <div className="mt-4">
        <SwitchButton text="Add Epic" handleClick={handleSwitchClick} />
        {showForm && <CreateEpic loadEpics={loadEpics} projectId={projectId} />}
        <BlockSection list={epics} handleElemClick={handleEpicClick} />
      </div>
    </>
  );
}

export default Epics;
