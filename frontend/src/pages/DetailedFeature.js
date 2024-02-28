import {
  deleteFeature,
  getFeatureDetails,
} from "../services/redux/features/featureDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Chip } from "@material-tailwind/react";
import ChipDismissible from "../utils/ChipDismissible";
import DialogDefault from "../utils/Dialog";
import DialogWithForm from "../utils/FormDialog";
import Loading from "../utils/Loading";
import Tasks from "../components/tasks/Tasks";
import Title from "../components/ui/Title";
import UpdateFeature from "../features/update/UpdateFeature";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getAllCategories } from "../services/redux/categories/categoriesSlice";
import { useParams } from "react-router-dom";

function DetailedFeature() {
  const dispatch = useDispatch();
  const { featureId } = useParams();
  const [showEditForm, setShowEditForm] = useState();
  const { feature, loading, error } = useSelector((state) => state.feature);
  const { categories } = useSelector((state) => state.categories);
  const [actionClicked, setActionClicked] = useState(false);
  const [featureCategory, setFeatureCategory] = useState(null);

  useEffect(() => {
    if (featureId) loadFeature();
    dispatch(getAllCategories());
    if (categories && feature) {
      const category = categories.find((c) => c.id === feature.categoryId);
      if (category) setFeatureCategory(category.name);
    }
  }, [dispatch]);

  if (loading) return <Loading />;

  if (error) return <p>Error: {error}</p>;

  function loadFeature() {
    dispatch(getFeatureDetails(featureId));
  }

  function handleDelete() {
    dispatch(deleteFeature(featureId));
  }

  function handleEdit() {}

  return (
    <section>
      <Title titleName={feature.name} />
      <Chip size="lg" value={featureCategory} className="mt-1" />

      {!actionClicked ? (
        <div className="actions my-4">
          <DialogWithForm
            childComponent={
              <UpdateFeature
                feature={feature}
                loadFeature={loadFeature}
                toggleForm={handleEdit}
              />
            }
            buttonInfo="Edit Feature"
            isEdit={true}
          />
          <ChipDismissible
            handleAction={handleDelete}
            actionText="delete feature"
          />
        </div>
      ) : (
        <div className="flex justify-end mt-4 mr-8">
          <button onClick={handleEdit} className="focus:outline-none">
            <XMarkIcon color="white" strokeWidth={4} className="h-6 w-6" />
          </button>
        </div>
      )}

      <div className="">
        <DialogDefault
          dialogName="Description"
          dialogDescription={feature.description}
        />
      </div>

      <Tasks featureId={featureId} />
    </section>
  );
}

export default DetailedFeature;
