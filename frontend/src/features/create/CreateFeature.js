import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import SelectCategory from "../../components/features/SelectCategory";
import { createFeature } from "../../services/redux/features/createFeatureSlice";

function CreateFeature({ loadFeatures, epicId }) {
  const dispatch = useDispatch();
  const { creating, success, error } = useSelector(
    (state) => state.createFeature
  );
  const [categoryId, setCategoryId] = useState(0);

  const [formError, setFormError] = useState({
    message: "",
    formIsInvalid: false,
  });

  const [featureRequest, setFeatureRequest] = useState({
    name: "",
    description: "",
    categoryId: categoryId,
    epicId: epicId,
  });

  const featureData = [
    {
      label: "Feature Name",
      type: "text",
      name: "name",
      value: featureRequest.name,
    },
    {
      label: "Description",
      type: "textarea",
      name: "description",
      value: featureRequest.description,
    },
  ];

  function handleSetCategory(e) {
    setCategoryId(e);
  }

  function handleChange(e) {
    setFeatureRequest({
      ...featureRequest,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formIsValid()) return;
    featureRequest.categoryId = categoryId;
    dispatch(createFeature(featureRequest));
    setTimeout(() => loadFeatures(), 50);
  }

  function formIsValid() {
    const emptyFields = Object.values(featureRequest).some(
      (value) => value === ""
    );
    const longFields = Object.values(featureRequest).some(
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
      <h3 className="flex justify-center text-white font-bold mt-4 text-center">
        CREATE FEATURE
      </h3>
      <div className="px-8 pt-4">
        <SelectCategory
          handleChange={handleSetCategory}
          labelInfo="Select category"
        />
      </div>
      <Form
        formData={featureData}
        formInfo=" "
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo={creating ? "Creating..." : "Create feature"}
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

export default CreateFeature;
