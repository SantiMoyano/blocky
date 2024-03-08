import "../blocks/blocky.css";

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
  const [featureList, setFeatureList] = useState(null);

  useEffect(() => {
    dispatch(reset());
    dispatch(getAllFeatures(epicId));
  }, [dispatch, epicId]);

  useEffect(() => {
    setFeatureList(features);
  }, [features]);

  function handleFeatureClick(featureId) {
    navigate(`/feature/${featureId}`);
  }

  function loadFeatures() {
    dispatch(getAllFeatures(epicId));
    if (features) setFeatureList([...features]);
  }

  function handleCategorySelection(e) {
    const categoryId = e;

    const filteredFeatures = features.filter(
      (feature) => feature.categoryId === categoryId
    );
    setFeatureList([...filteredFeatures]);
  }

  if (loading || error || featureList === null) {
    return <Loading />;
  }

  console.log(featureList);

  return (
    <section className="min-height-app">
      <div className="mt-2 border-8 border-x-0 py-4 border-b-0">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center select-actions features-flex">
            <div className="flex column-responsive items-center">
              <div className="flex ">
                <Subtitle subtitleName="FEATURES" />
                <PopoverInfo popoverInfo="Features represent specific functionalities or capabilities of the application, categorized into frontend and backend. For example, at the epic level of 'User Authentication', features could include 'Login Form', 'Login Endpoint', etc." />
              </div>
              <div className="feature-btn">
                <DialogWithForm
                  childComponent={
                    <CreateFeature
                      loadFeatures={loadFeatures}
                      epicId={epicId}
                    />
                  }
                  buttonInfo="New feature"
                />
              </div>
            </div>
            <div className="features-actions">
              <SelectCategory
                handleChange={handleCategorySelection}
                labelInfo="Category"
              />
            </div>
          </div>
        </div>

        <div className="py-4 list-content">
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
