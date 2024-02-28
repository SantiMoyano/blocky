import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import SelectCategory from "../../components/features/SelectCategory";
import { updateFeature } from "../../services/redux/features/updateFeatureSlice";
import { useState } from "react";

function UpdateFeature({ feature, loadFeature, toggleForm }) {
  const dispatch = useDispatch();
  const { updating, success, error } = useSelector(
    (state) => state.updateSubtask
  );
  const [categoryId, setCategoryId] = useState(0);

  const [featureRequest, setFeatureRequest] = useState({
    name: feature.name,
    description: feature.description,
    categoryId: feature.categoryId,
    epicId: feature.epicId,
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
    if (categoryId !== 0) featureRequest.categoryId = categoryId;
    dispatch(updateFeature({ featureId: feature.id, request: featureRequest }));
    setTimeout(() => {
      toggleForm();
      loadFeature();
    }, 100);
  }

  return (
    <div className="pt-6 pb-2 blue-bg rounded rounded-lg">
      <h3 className="flex justify-center text-white font-bold mt-4 text-center">
        UPDATE FEATURE
      </h3>
      <SelectCategory handleChange={handleSetCategory} />
      <Form
        formData={featureData}
        formInfo=" "
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Update feature"
      />
      {success && (
        <Notification message="Feature updated successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default UpdateFeature;
