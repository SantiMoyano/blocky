import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { updateEpic } from "../../services/redux/epics/updateEpicSlice";
import { useState } from "react";

function UpdateEpic({ epic, loadEpic, toggleForm }) {
  const dispatch = useDispatch();
  const { updating, success, error } = useSelector((state) => state.updateEpic);

  const [epicRequest, setEpicRequest] = useState({
    name: epic.name,
    description: epic.description,
    projectId: epic.projectId,
  });

  const epicData = [
    {
      label: "Epic Name",
      type: "text",
      name: "name",
      value: epicRequest.name,
    },
    {
      label: "Description",
      type: "textarea",
      name: "description",
      value: epicRequest.description,
    },
  ];

  function handleChange(e) {
    setEpicRequest({
      ...epicRequest,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateEpic({
        epicId: epic.id,
        request: epicRequest,
      })
    );
    setTimeout(() => {
      toggleForm();
      loadEpic();
    }, 50);
  }

  return (
    <div className="pt-6 pb-2 blue-bg rounded rounded-lg">
      <Form
        formData={epicData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Edit epic"
      />
      {success && (
        <Notification message="Epic updated successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default UpdateEpic;
