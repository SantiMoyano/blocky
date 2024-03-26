import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import Notification from "../../utils/Notification";
import { Typography } from "@material-tailwind/react";
import { loginUser } from "../../services/redux/auth/loginSlice";

function Login({ handleLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggingIn = useSelector((state) => state.login.loggingIn);
  const error = useSelector((state) => state.login.error);
  const loginSuccess = useSelector((state) => state.login.loginSuccess);
  const [formError, setFormError] = useState({
    message: "",
    formIsInvalid: false,
  });

  useEffect(() => {
    if (loginSuccess) {
      navigateToProjects();
      handleLogin();
    }
  }, [loginSuccess]);

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
    <div className="gradient-bg auth-form min-height-app py-8">
      <Form
        formData={loginData}
        formInfo="Login"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo={loggingIn ? "Login in..." : "Login"}
      />
      <div className="gap-2">
        <Typography color="white" className="font-custom">
          Don't have an account?
        </Typography>
        <Typography
          as={Link}
          to="/register"
          color="white"
          className="text-center font-bold underline font-custom"
        >
          Sing in
        </Typography>
      </div>
      <div className="flex justify-center items-center py-2">
        {error && <Notification message={error.message} type={"failure"} />}
        {formError.formIsInvalid && (
          <Notification message={formError.message} type={"failure"} />
        )}
      </div>
    </div>
  );
}

export default Login;
