import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEpicDetails } from "../../redux/epics/epicDetailSlice";
import { useParams } from "react-router-dom";
import Tasks from "../tasks/Tasks";

function DetailedEpic() {
  const dispatch = useDispatch();
  const { epicId } = useParams();
  const [showEditForm, setShowEditForm] = useState();
  const { epic, loading, error } = useSelector((state) => state.epic);

  useEffect(() => {
    if (epicId) {
      dispatch(getEpicDetails(epicId));
    }
  }, [dispatch, epicId]);

  if (loading) return <p>Loading epic details...</p>;

  if (error) return <p>Error: {error}</p>;

  function handleEdit() {
    setShowEditForm(!showEditForm);
  }

  function loadEpic() {
    console.log("reload");
  }

  return (
    <>
      <section>
        <h2>Detailed Epic {epicId}</h2>
        <button onClick={handleEdit}>Edit task</button>
        {showEditForm && <UpdateEpic epic={epic} loadEpic={loadEpic} />}
        <div className="epic-info">
          <p>{epic.name}</p>
          <p>{epic.progress}</p>
        </div>
      </section>
      <Tasks epicId={epicId} />
    </>
  );
}

export default DetailedEpic;
