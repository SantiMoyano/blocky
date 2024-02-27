import {
  deleteTask,
  getTaskDetails,
} from "../services/redux/tasks/taskDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Chip } from "@material-tailwind/react";
import ChipDismissible from "../utils/ChipDismissible";
import DialogDefault from "../utils/Dialog";
import DialogWithForm from "../utils/FormDialog";
import Loading from "../utils/Loading";
import Subtasks from "../components/subtasks/Subtasks";
import Title from "../components/ui/Title";
import UpdateTask from "../features/update/UpdateTask";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getAllCategories } from "../services/redux/categories/categoriesSlice";
import { useParams } from "react-router-dom";

function DetailedTask() {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [showEditForm, setShowEditForm] = useState();
  const { task, loading, error } = useSelector((state) => state.task);
  const { categories } = useSelector((state) => state.categories);
  const [actionClicked, setActionClicked] = useState(false);
  const [taskCategory, setTaskCategory] = useState(null);

  useEffect(() => {
    if (taskId) loadTask();
    dispatch(getAllCategories());
    if (categories && task) {
      const category = categories.find((c) => c.id === task.categoryId);
      if (category) setTaskCategory(category.name);
    }
  }, [dispatch]);

  if (loading) return <Loading />;

  if (error) return <p>Error: {error}</p>;

  function loadTask() {
    dispatch(getTaskDetails(taskId));
  }

  function handleDelete() {
    dispatch(deleteTask(taskId));
  }

  function handleEdit() {}

  return (
    <section>
      <Title titleName={task.name} />
      <Chip size="lg" value={taskCategory} className="mt-1" />

      {!actionClicked ? (
        <div className="actions my-4">
          <DialogWithForm
            childComponent={
              <UpdateTask
                task={task}
                loadTask={loadTask}
                toggleForm={handleEdit}
              />
            }
            buttonInfo="Edit Feature"
            isEdit={true}
          />
          <ChipDismissible
            handleAction={handleDelete}
            actionText="delete task"
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
          dialogDescription={task.description}
        />
      </div>

      <Subtasks taskId={taskId} />
    </section>
  );
}

export default DetailedTask;
