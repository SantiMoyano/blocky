import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaskDetails,
  deleteTask,
} from "../services/redux/tasks/taskDetailSlice";
import { useParams } from "react-router-dom";
import Subtasks from "../components/subtasks/Subtasks";
import UpdateTask from "../features/update/UpdateTask";
import SwitchButton from "../utils/SwitchButton";
import Title from "../components/ui/Title";
import DialogDefault from "../utils/Dialog";
import { Chip } from "@material-tailwind/react";
import ChipDismissible from "../utils/ChipDismissible";
import { XMarkIcon } from "@heroicons/react/24/outline";

function DetailedTask() {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [showEditForm, setShowEditForm] = useState();
  const { task, loading, error } = useSelector((state) => state.task);
  const [actionClicked, setActionClicked] = useState(false);

  useEffect(() => {
    if (taskId) loadTask();
  }, [dispatch]);

  if (loading) return <p>Loading Task details...</p>;

  if (error) return <p>Error: {error}</p>;

  function loadTask() {
    dispatch(getTaskDetails(taskId));
  }

  function handleDelete() {
    dispatch(deleteTask(taskId));
  }

  function handleEdit() {
    setShowEditForm(!showEditForm);
    setActionClicked(!actionClicked);
  }

  return (
    <section>
      <Title titleName={task.name} />
      <Chip size="lg" value="Frontend" className="mt-1" />

      <div className="">
        <DialogDefault
          dialogName="Description"
          dialogDescription={task.description}
        />
      </div>

      {!actionClicked ? (
        <div className="actions mt-4">
          <Chip onClick={handleEdit} variant="ghost" value="Edit task" />
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

      <hr className="mt-8 border-2" />

      {showEditForm && (
        <UpdateTask task={task} loadTask={loadTask} toggleForm={handleEdit} />
      )}
      <Subtasks taskId={taskId} />
    </section>
  );
}

export default DetailedTask;
