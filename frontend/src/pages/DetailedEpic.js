import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEpicDetails,
  deleteEpic,
} from "../services/redux/epics/epicDetailSlice";
import { useParams } from "react-router-dom";
import Tasks from "../components/Tasks";
import UpdateEpic from "../features/update/UpdateEpic";
import Title from "../components/ui/Title";
import DialogDefault from "../utils/Dialog";
import { Chip } from "@material-tailwind/react";
import ChipDismissible from "../utils/ChipDismissible";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Loading from "../utils/Loading";

function DetailedEpic() {
  const dispatch = useDispatch();
  const { epicId } = useParams();
  const [showEditForm, setShowEditForm] = useState();
  const { epic, loading, error } = useSelector((state) => state.epic);
  const [actionClicked, setActionClicked] = useState(false);

  useEffect(() => {
    if (epicId) {
      loadEpic();
    }
  }, [dispatch, epicId]);

  if (loading) return <Loading />;

  if (error) return <p>Error: {error}</p>;

  function loadEpic() {
    dispatch(getEpicDetails(epicId));
  }

  function handleDelete() {
    dispatch(deleteEpic(epicId));
  }

  function handleEdit() {
    setShowEditForm(!showEditForm);
    setActionClicked(!actionClicked);
  }

  return (
    <>
      <section>
        <Title titleName={epic.name} />
        <div className="">
          <DialogDefault
            dialogName="Description"
            dialogDescription={epic.description}
          />
        </div>
        {!actionClicked ? (
          <div className="mt-4 actions">
            <Chip onClick={handleEdit} variant="ghost" value="Edit epic" />
            <ChipDismissible
              handleAction={handleDelete}
              actionText="delete epic"
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
          <UpdateEpic epic={epic} loadEpic={loadEpic} toggleForm={handleEdit} />
        )}
        <Tasks epicId={epicId} />
      </section>
    </>
  );
}

export default DetailedEpic;
