import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/redux/auth/registerSlice";
import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";

function Register() {
  const dispatch = useDispatch();
  const registering = useSelector((state) => state.register.registering);
  const error = useSelector((state) => state.register.error);
  const registrationSuccess = useSelector(
    (state) => state.register.registrationSuccess
  );
  const [formError, setFormError] = useState({
    message: "",
    formIsInvalid: false,
  });

  // Request data for registration
  const [registerRequest, setRegisterRequest] = useState({
    firstname: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  // Inputs for registration form
  const registerData = [
    {
      label: "Firstname",
      type: "text",
      name: "firstname",
      value: registerRequest.firstname,
    },
    {
      label: "Username",
      type: "text",
      name: "username",
      value: registerRequest.username,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: registerRequest.password,
    },
    {
      label: "Repeat Password",
      type: "password",
      name: "repeatPassword",
      value: registerRequest.repeatPassword,
    },
  ];

  function handleChange(e) {
    setRegisterRequest({
      ...registerRequest,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Perform validations, for example, ensure passwords match
    if (formIsEmpty() || passwordNotMatch()) return;
    setFormError({ message: "", formIsInvalid: false });
    // Expected data on API register endpoint
    const registerReq = {
      firstname: registerRequest.firstname,
      username: registerRequest.username,
      password: registerRequest.password,
    };
    // Dispatch the action to register the user
    dispatch(registerUser(registerReq));
  }

  function formIsEmpty() {
    const emptyFields = Object.values(registerRequest).some(
      (value) => value === ""
    );
    if (emptyFields) {
      setFormError({ message: "There are empty fields", formIsInvalid: true });
      return true;
    }
    return false;
  }

  function passwordNotMatch() {
    if (registerRequest.password !== registerRequest.repeatPassword) {
      setFormError({ message: "Passwords do not match", formIsInvalid: true });
      return true;
    }
    return false;
  }

  return (
    <div className="h-screen blue-bg">
      <Form
        formData={registerData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Register"
      />
      {registrationSuccess ? (
        <Notification message={"User created successfully!"} type={"success"} />
      ) : (
        error && (
          <Notification message={"User already exists!"} type={"failure"} />
        )
      )}
      {formError.formIsInvalid && (
        <Notification message={formError.message} type={"failure"} />
      )}
    </div>
  );
}

export default Register;
