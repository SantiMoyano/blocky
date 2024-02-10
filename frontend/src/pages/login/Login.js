import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/redux/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (!error) navigateToProjects();
  }

  function navigateToProjects() {
    setTimeout(() => {
      navigate(`/projects`);
    }, 300);
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
    <div className="h-screen blue-bg">
      <Form
        formData={loginData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo="Login"
      />
      {loginSuccess ? (
        <>
          <Notification message={"Login successful!"} type={"success"} />
          {navigateToProjects()}
        </>
      ) : (
        error && <Notification message={error.message} type={"failure"} />
      )}
      {formError.formIsInvalid && (
        <Notification message={formError.message} type={"failure"} />
      )}
    </div>
  );
}

export default Login;
