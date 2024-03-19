import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { updateEpic } from "../../services/redux/epics/updateEpicSlice";

function UpdateEpic({ epic, loadEpic, toggleForm }) {
  const dispatch = useDispatch();
  const { updating, error } = useSelector((state) => state.updateEpic);

  const [formError, setFormError] = useState({
    message: "",
    formIsInvalid: false,
  });

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
    if (!formIsValid()) return;
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

  function formIsValid() {
    const emptyFields = Object.values(epicRequest).some(
      (value) => value === ""
    );
    const longFields = Object.values(epicRequest).some(
      (value) => typeof value === "string" && value.length > 200
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
        formInfo="Edit Epic"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo={updating ? "Updating..." : "Edit Epic"}
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

export default UpdateEpic;
