import { Option, Select } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCategories } from "../../services/redux/categories/categoriesSlice";
import { useEffect } from "react";

function SelectCategory({ handleChange }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="flex justify-center w-full px-12 py-2">
      <Select
        label="Sort by Category"
        onChange={handleChange}
        className="text-white font-semibold label-select"
      >
        {categories.map((category) => (
          <Option value={category.id} className="font-semibold">
            {category.name.toUpperCase()}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectCategory;
