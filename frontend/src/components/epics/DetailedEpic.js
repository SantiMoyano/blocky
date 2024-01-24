import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEpicDetails } from "../../redux/epics/epicDetailSlice";
import { useParams } from "react-router-dom";
import Tasks from "../tasks/Tasks";

function DetailedEpic() {
  const dispatch = useDispatch();
  const { epicId } = useParams();
  const { epic, loading, error } = useSelector((state) => state.epic);

  useEffect(() => {
    if (epicId) {
      dispatch(getEpicDetails(epicId));
    }
  }, [dispatch, epicId]);

  if (loading) return <p>Loading epic details...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section>
        <h2>Detailed Epic {epicId}</h2>
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