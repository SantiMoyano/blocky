import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Categories() {
  const dispatch = useDispatch();
  const { categories, success, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getAllCategories());
  });

  return (
    <select>
      {categories.map((category) => (
        <option value={category}>{category.name}</option>
      ))}
    </select>
  );
}

export default Categories;
