import { useDispatch, useSelector } from "react-redux";
import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { useState } from "react";
import { updateEpic } from "../../services/redux/epics/updateEpicSlice";

function UpdateEpic({ epic, loadEpic, toggleForm }) {
  const dispatch = useDispatch();
  const { updating, success, error } = useSelector((state) => state.updateEpic);

  const [epicRequest, setEpicRequest] = useState({
    name: epic.name,
    description: epic.description,
    projectId: epic.projectId,
  });

  const epicData = [
    {
      label: "Epic Name",
      type: "text",
      name: "name",
      value: epicRequest.name,
    },
    {
      label: "Description",
      type: "text",
      name: "description",
      value: epicRequest.description,
    },
  ];

  function handleChange(e) {
    setEpicRequest({
      ...epicRequest,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      updateEpic({
        epicId: epic.id,
        request: epicRequest,
      })
    );
    setTimeout(() => {
      toggleForm();
      loadEpic();
    }, 50);
  }

  return (
    <div>
      <Form
        formData={epicData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Edit epic"
      />
      {success && (
        <Notification message="Epic updated successfully" type="success" />
      )}
      {error && <Notification message="An error has occurred" type="error" />}
    </div>
  );
}

export default UpdateEpic;
