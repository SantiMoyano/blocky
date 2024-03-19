import {
  deleteFeature,
  getFeatureDetails,
} from "../services/redux/features/featureDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Chevron from "../utils/Chevron";
import { Chip } from "@material-tailwind/react";
import ChipDismissible from "../utils/ChipDismissible";
import DialogDefault from "../utils/Dialog";
import DialogWithForm from "../utils/FormDialog";
import Loading from "../utils/Loading";
import Tasks from "../components/tasks/Tasks";
import Title from "../components/ui/Title";
import UpdateFeature from "../features/update/UpdateFeature";
import { getAllCategories } from "../services/redux/categories/categoriesSlice";
import { useParams } from "react-router-dom";

function DetailedFeature() {
  const dispatch = useDispatch();
  const { featureId } = useParams();
  const { feature, loading, error } = useSelector((state) => state.feature);
  const { categories } = useSelector((state) => state.categories);
  const [featureCategory, setFeatureCategory] = useState(null);
  const [showManageActions, setShowManageActions] = useState(false);

  useEffect(() => {
    if (featureId) loadFeature();
    dispatch(getAllCategories());
    if (categories && feature) {
      const category = categories.find((c) => c.id === feature.categoryId);
      if (category) setFeatureCategory(category.name);
    }
  }, [dispatch, featureCategory]);

  useEffect(() => {}, [featureCategory]);

  if (loading) return <Loading />;

  if (error) return <p>Error: {error}</p>;

  function loadFeature() {
    dispatch(getFeatureDetails(featureId));
  }

  function handleDelete() {
    dispatch(deleteFeature(featureId));
  }

  return (
    <section className="min-height-app gradient-bg">
      <Title titleName={feature.name} />

      <Chevron
        toggleChevron={() => setShowManageActions(!showManageActions)}
        text="MANAGE"
      />

      {showManageActions && (
        <div className="actions my-4">
          <DialogWithForm
            childComponent={
              <UpdateFeature feature={feature} loadFeature={loadFeature} />
            }
            buttonInfo="Edit Feature"
            isEdit={true}
          />
          <ChipDismissible
            handleAction={handleDelete}
            actionText="delete feature"
          />
        </div>
      )}
      <div className="descriptions-container">
        <DialogDefault
          dialogName="description"
          dialogDescription={feature.description}
        />
      </div>
      <Tasks featureId={featureId} />
    </section>
  );
}

export default DetailedFeature;
