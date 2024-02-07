import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  deleteProject,
} from "../services/redux/projects/projectSlice";
import { useParams } from "react-router-dom";
import Epics from "../components/Epics";
import UpdateProject from "../features/update/UpdateProject";
import Title from "../components/ui/Title";
import DialogDefault from "../utils/Dialog";
import { Chip } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ChipDismissible from "../utils/ChipDismissible";

function DetailedProject() {
  const dispatch = useDispatch();
  const [showEditForm, setShowEditForm] = useState();
  const { projectId } = useParams();
  const { project, loading, error } = useSelector((state) => state.project);
  const [actionClicked, setActionClicked] = useState(false);

  useEffect(() => {
    if (projectId) {
      dispatch(getProjects(projectId));
    }
  }, [dispatch, projectId]);

  if (loading) return <p>Loading project details...</p>;

  if (error) return <p>Error: {error}</p>;

  function loadProject() {
    dispatch(getProjects(projectId));
  }

  function handleEdit() {
    toggleForm();
    setActionClicked(!actionClicked);
  }

  function handleDelete() {
    dispatch(deleteProject(projectId));
  }

  function toggleForm() {
    setShowEditForm(!showEditForm);
    setActionClicked(!actionClicked);
  }

  return (
    <section>
      <Title titleName={project.name} />

      <div className="">
        <DialogDefault
          dialogName="Description"
          dialogDescription={project.description}
        />
        <DialogDefault dialogName="Goal" dialogDescription={project.goal} />
      </div>

      {!actionClicked ? (
        <div className="flex justify-evenly mt-4">
          <Chip onClick={handleEdit} variant="ghost" value="Edit project" />
          <ChipDismissible
            handleAction={handleDelete}
            actionText="delete project"
          />
        </div>
      ) : (
        <div className="flex justify-end mt-4 mr-8">
          <button onClick={handleEdit} className="focus:outline-none">
            <XMarkIcon color="white" strokeWidth={4} className="h-6 w-6" />
          </button>
        </div>
      )}

      {showEditForm && (
        <UpdateProject
          project={project}
          loadProject={loadProject}
          toggleForm={toggleForm}
        />
      )}
      <Epics projectId={projectId} />
    </section>
  );
}

export default DetailedProject;
