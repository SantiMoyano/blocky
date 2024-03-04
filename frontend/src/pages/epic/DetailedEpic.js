import React, { useEffect, useState } from "react";
import {
  deleteEpic,
  getEpicDetails,
} from "../../services/redux/epics/epicDetailSlice";
import { useDispatch, useSelector } from "react-redux";

import { Chip } from "@material-tailwind/react";
import ChipDismissible from "../../utils/ChipDismissible";
import DialogDefault from "../../utils/Dialog";
import DialogWithForm from "../../utils/FormDialog";
import Features from "../../components/features/Features";
import Loading from "../../utils/Loading";
import Title from "../../components/ui/Title";
import UpdateEpic from "../../features/update/UpdateEpic";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";

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

  function handleEdit() {}

  return (
    <>
      <section className="min-height-app">
        <Title titleName={epic.name} />
        {!actionClicked ? (
          <div className="my-4 actions">
            <DialogWithForm
              childComponent={
                <UpdateEpic
                  epic={epic}
                  loadEpic={loadEpic}
                  toggleForm={handleEdit}
                />
              }
              buttonInfo="Edit Epic"
              isEdit={true}
            />
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
        <div className="">
          <DialogDefault
            dialogName="Description"
            dialogDescription={epic.description}
          />
        </div>

        <Features epicId={epicId} />
      </section>
    </>
  );
}

export default DetailedEpic;
