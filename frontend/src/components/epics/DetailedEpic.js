import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEpicDetails, deleteEpic } from "../../redux/epics/epicDetailSlice";
import { useParams } from "react-router-dom";
import Tasks from "../tasks/Tasks";
import UpdateEpic from "./UpdateEpic";

function DetailedEpic() {
  const dispatch = useDispatch();
  const { epicId } = useParams();
  const [showEditForm, setShowEditForm] = useState();
  const { epic, loading, error } = useSelector((state) => state.epic);

  useEffect(() => {
    if (epicId) {
      loadEpic();
    }
  }, [dispatch, epicId]);

  if (loading) return <p>Loading epic details...</p>;

  if (error) return <p>Error: {error}</p>;

  function handleEdit() {
    setShowEditForm(!showEditForm);
  }

  function loadEpic() {
    dispatch(getEpicDetails(epicId));
  }

  function handleDelete() {
    dispatch(deleteEpic(epicId));
  }

  return (
    <>
      <section>
        <h2>Detailed Epic {epicId}</h2>
        <button onClick={handleEdit}>Edit epic</button>
        <button onClick={handleDelete}>Delete epic</button>
        {showEditForm && <UpdateEpic epic={epic} loadEpic={loadEpic} />}
        <div className="epic-info">
          <p>{epic.name}</p>
          <p>{epic.description}</p>
          <p>{epic.progress}</p>
        </div>
      </section>
      <Tasks epicId={epicId} />
    </>
  );
}

export default DetailedEpic;
