import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../services/redux/categories/categoriesSlice";

function CategoriesList({ handleSetCategory }) {
  const dispatch = useDispatch();
  const { categories, success, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  if (error) return "error";

  return (
    <select onChange={handleSetCategory}>
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default CategoriesList;
