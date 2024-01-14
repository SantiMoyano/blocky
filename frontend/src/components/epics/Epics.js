import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEpics } from "../../redux/epics/epicsSlice";

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
      <ul>
        {epics.map((epic) => (
          // Pass the epic details to the Epic component
          <Epic key={epic.id} name={epic.name} />
        ))}
      </ul>
    </>
  );
}

function Epic({ name }) {
  return (
    <li>
      <p>{name}</p>
    </li>
  );
}

export default Epics;
