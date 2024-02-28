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
    featureRequest.categoryId = categoryId;
    dispatch(createFeature(featureRequest));
    setTimeout(() => loadFeatures(), 50);
  }

  return (
    <div className="pt-6 pb-2 blue-bg rounded rounded-lg">
      <h3 className="flex justify-center text-white font-bold mt-4 text-center">
        CREATE FEATURE
      </h3>
      <SelectCategory
        handleChange={handleSetCategory}
        labelInfo="Select category"
      />
      <Form
        formData={featureData}
        formInfo=" "
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Create feature"
      />
      {success && (
        <Notification message="Feature created successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default CreateFeature;
