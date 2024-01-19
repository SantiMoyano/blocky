import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/loginSlice";
import Form from "../form/Form";
import Notification from "../notification/Notification";

function Login() {
  const dispatch = useDispatch();
  const loggingIn = useSelector((state) => state.login.loggingIn);
  const error = useSelector((state) => state.login.error);
  const loginSuccess = useSelector((state) => state.login.loginSuccess);
  const [formError, setFormError] = useState({
    message: "",
    formIsInvalid: false,
  });

  // Request data for login
  const [loginRequest, setLoginRequest] = useState({
    username: "",
    password: "",
  });

  // Inputs for login form
  const loginData = [
    {
      label: "Username",
      type: "text",
      name: "username",
      value: loginRequest.username,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: loginRequest.password,
    },
  ];

  function handleChange(e) {
    setLoginRequest({
      ...loginRequest,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Perform validations or additional logic if needed
    if (formIsEmpty()) return;
    setFormError({ message: "", formIsInvalid: false });
    // Expected data on API login endpoint
    const loginReq = {
      username: loginRequest.username,
      password: loginRequest.password,
    };
    // Dispatch the action to log in the user
    dispatch(loginUser(loginReq));
  }

  function formIsEmpty() {
    const emptyFields = Object.values(loginRequest).some(
      (value) => value === ""
    );
    if (emptyFields) {
      setFormError({ message: "There are empty fields", formIsInvalid: true });
      return true;
    }
    return false;
  }

  return (
    <>
      <Form
        formData={loginData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Login"
      />
      {loginSuccess ? (
        <Notification message={"Login successful!"} type={"success"} />
      ) : (
        error && <Notification message={error.message} type={"failure"} />
      )}
      {formError.formIsInvalid && (
        <Notification message={formError.message} type={"failure"} />
      )}
    </>
  );
}

export default Login;
