import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlockSection from "./blocks/BlockSection";
import { Chip } from "@material-tailwind/react";
import CreateEpic from "../features/create/CreateEpic";
import DialogWithForm from "../utils/FormDialog";
import { PopoverInfo } from "../utils/PopoverInfo";
import Subtitle from "./ui/Subtitle";
import SwitchButton from "../utils/SwitchButton";
import { getAllEpics } from "../services/redux/epics/epicsSlice";
import { useNavigate } from "react-router-dom";

function Epics({ projectId }) {
  const dispatch = useDispatch();
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

  return (
    <>
      {/* Add any filtering or other options here if needed */}

      <div className="mt-2 min-height-app py-4">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center select-actions column-responsive">
            <div className="flex">
              <Subtitle subtitleName="EPICS" />
              <PopoverInfo popoverInfo="Container for features, such as user authentication functionality" />
            </div>
            <div className="">
              <DialogWithForm
                childComponent={
                  <CreateEpic loadEpics={loadEpics} projectId={projectId} />
                }
                buttonInfo="Add Epic"
              />
            </div>
          </div>
        </div>

        <div className="py-2 list-content">
          <BlockSection list={epics} handleElemClick={handleEpicClick} />
        </div>
      </div>
    </>
  );
}

export default Epics;
