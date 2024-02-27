import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlockSection from "./blocks/BlockSection";
import CreateEpic from "../features/create/CreateEpic";
import DialogWithForm from "../utils/FormDialog";
import Subtitle from "./ui/Subtitle";
import SwitchButton from "../utils/SwitchButton";
import { getAllEpics } from "../services/redux/epics/epicsSlice";
import { useNavigate } from "react-router-dom";

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

      <div className="mt-6 px-6">
        <Subtitle subtitleName="EPICS/FUNCTIONALITIES" />
        <div className="py-6">
          <DialogWithForm
            childComponent={
              <CreateEpic loadEpics={loadEpics} projectId={projectId} />
            }
            buttonInfo="Add Epic"
          />
          <BlockSection list={epics} handleElemClick={handleEpicClick} />
        </div>
      </div>
    </>
  );
}

export default Epics;
