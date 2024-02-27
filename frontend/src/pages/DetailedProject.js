import React, { useEffect, useState } from "react";
import {
  deleteProject,
  getProjects,
} from "../services/redux/projects/projectSlice";
import { useDispatch, useSelector } from "react-redux";

import { Chip } from "@material-tailwind/react";
import ChipDismissible from "../utils/ChipDismissible";
import DialogDefault from "../utils/Dialog";
import DialogWithForm from "../utils/FormDialog";
import Epics from "../components/Epics";
import Loading from "../utils/Loading";
import Title from "../components/ui/Title";
import UpdateProject from "../features/update/UpdateProject";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";

function DetailedProject() {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { project, loading, error } = useSelector((state) => state.project);
  const [actionClicked, setActionClicked] = useState(false);

  useEffect(() => {
    if (projectId) {
      dispatch(getProjects(projectId));
    }
  }, [dispatch, projectId]);

  if (loading) return <Loading />;

  if (error) return <p>Error: {error}</p>;

  function loadProject() {
    dispatch(getProjects(projectId));
  }

  function handleEdit() {}

  function handleDelete() {
    dispatch(deleteProject(projectId));
  }

  return (
    <section>
      <Title titleName={project.name} />

      <div className="actions my-4">
        <DialogWithForm
          childComponent={
            <UpdateProject project={project} loadProject={loadProject} />
          }
          buttonInfo="Edit Project"
          isEdit={true}
        />
        <ChipDismissible
          handleAction={handleDelete}
          actionText="delete project"
        />
      </div>

      <div>
        <DialogDefault
          dialogName="Description"
          dialogDescription={project.description}
        />
        <DialogDefault dialogName="Goal" dialogDescription={project.goal} />
      </div>

      <Epics projectId={projectId} />
    </section>
  );
}

export default DetailedProject;
