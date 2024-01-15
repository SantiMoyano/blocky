import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEpics } from "../../redux/epics/epicsSlice";
import BlockSection from "../blocks/BlockSection";

function Epics({ projectId }) {
  const dispatch = useDispatch();
  const { epics, loading, error } = useSelector((state) => state.epics);

  useEffect(() => {
    // Dispatch the action to get all epics for the specified project
    dispatch(getAllEpics(projectId));
  }, [dispatch, projectId]);

  return (
    <>
      {/* Add any filtering or other options here if needed */}
      <BlockSection list={epics} />
    </>
  );
}

export default Epics;
