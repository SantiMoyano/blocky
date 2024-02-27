import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { createEpic } from "../../services/redux/epics/createEpicSlice";

function CreateEpic({ loadEpics, projectId }) {
  const dispatch = useDispatch();
  const { creating, success, error } = useSelector((state) => state.createEpic);

  const [epicRequest, setEpicRequest] = useState({
    name: "",
    description: "",
    projectId: projectId,
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
    dispatch(createEpic(epicRequest));
    setTimeout(() => loadEpics(), 50);
  }

  return (
    <div className="pt-6 pb-2 blue-bg rounded rounded-lg">
      <Form
        formData={epicData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Create epic"
      />

      {success && (
        <Notification message="Epic created successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default CreateEpic;
