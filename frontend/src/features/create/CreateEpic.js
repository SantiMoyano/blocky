import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { createEpic } from "../../services/redux/epics/createEpicSlice";

function CreateEpic({ loadEpics, projectId }) {
  const dispatch = useDispatch();
  const { creating, success, error } = useSelector((state) => state.createEpic);

  const [formError, setFormError] = useState({
    message: "",
    formIsInvalid: false,
  });

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
    if (!formIsValid()) return;
    dispatch(createEpic(epicRequest));
    setTimeout(() => loadEpics(), 50);
  }

  function formIsValid() {
    const emptyFields = Object.values(epicRequest).some(
      (value) => value === ""
    );
    const longFields = Object.values(epicRequest).some(
      (value) => value.length > 200
    );
    if (emptyFields) {
      setFormError({ message: "There are empty fields", formIsInvalid: true });
      return false;
    }
    if (longFields) {
      setFormError({ message: "Too long fields!", formIsInvalid: true });
      return false;
    }
    return true;
  }

  return (
    <div className="pt-6 pb-2 blue-bg rounded rounded-lg">
      <Form
        formData={epicData}
        formInfo="Create Epic"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo={creating ? "Creating..." : "Create Epic"}
      />
      <div className="flex justify-center items-center">
        {error && (
          <Notification message="An error has occurred" type={"failure"} />
        )}
        {formError.formIsInvalid && (
          <Notification message={formError.message} type={"failure"} />
        )}
      </div>
    </div>
  );
}

export default CreateEpic;
