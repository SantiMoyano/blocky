import React, { useEffect, useState } from "react";
import {
  getAllFeatures,
  reset,
} from "../../services/redux/features/featuresSlice";
import { useDispatch, useSelector } from "react-redux";

import BlockSection from "../blocks/BlockSection";
import CreateFeature from "../../features/create/CreateFeature";
import DialogWithForm from "../../utils/FormDialog";
import Loading from "../../utils/Loading";
import { PopoverInfo } from "../../utils/PopoverInfo";
import SelectCategory from "./SelectCategory";
import Subtitle from "../ui/Subtitle";
import { useNavigate } from "react-router-dom";

function Features({ epicId }) {
  const dispatch = useDispatch();
  const { features, loading, error } = useSelector((state) => state.features);
  const navigate = useNavigate();
  const [featureList, setFeatureList] = useState([]);

  useEffect(() => {
    dispatch(reset());
    dispatch(getAllFeatures(epicId));
  }, []);

  useEffect(() => {
    setFeatureList(features);
  }, [features]);

  function handleFeatureClick(featureId) {
    navigate(`/feature/${featureId}`);
  }

  function loadFeatures() {
    dispatch(getAllFeatures(epicId));
    if (features) setFeatureList(features);
  }

  function handleCategorySelection(e) {
    const categoryId = e;

    const filteredFeatures = features.filter(
      (feature) => feature.categoryId === categoryId
    );
    setFeatureList(filteredFeatures);
  }

  if (loading || error) {
    return <Loading />;
  }

  return (
    <section className="min-height-app">
      <div className="mt-6 ">
        <div className="flex justify-center">
          <Subtitle subtitleName="FEATURES" />
          <PopoverInfo popoverInfo="Features represent specific functionalities or capabilities of the application, categorized into frontend and backend. For example, at the epic level of 'User Authentication', features could include 'Login Form', 'Login Endpoint', etc." />
        </div>

        <div className="py-4 px-6 list-content">
          <div className="select-actions features-actions">
            <SelectCategory
              handleChange={handleCategorySelection}
              labelInfo="Category"
            />
            <DialogWithForm
              childComponent={
                <CreateFeature loadFeatures={loadFeatures} epicId={epicId} />
              }
              buttonInfo="New feature"
            />
          </div>
          <BlockSection
            list={featureList}
            handleElemClick={handleFeatureClick}
          />
        </div>
      </div>
    </section>
  );
}

export default Features;
