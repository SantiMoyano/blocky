import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEpics } from "../../redux/epics/epicsSlice";
import { useNavigate } from "react-router-dom";
import BlockSection from "../blocks/BlockSection";

function Epics({ projectId }) {
  const dispatch = useDispatch();
  const { epics, loading, error } = useSelector((state) => state.epics);
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch the action to get all epics for the specified project
    dispatch(getAllEpics(projectId));
  }, [dispatch, projectId]);

  function handleEpicClick(epicId) {
    navigate(`/epic/${epicId}`);
  }

  return (
    <>
      {/* Add any filtering or other options here if needed */}
      <BlockSection list={epics} handleElemClick={handleEpicClick} />
    </>
  );
}

export default Epics;
