import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "../../components/ui/form/Form";
import { Link } from "react-router-dom";
import Loading from "../../utils/Loading";
import Notification from "../../utils/Notification";
import { Typography } from "@material-tailwind/react";
import { registerUser } from "../../services/redux/auth/registerSlice";

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

  if (registering) return <Loading />;

  return (
    <div className="gradient-bg auth-form min-height-app py-8">
      <Form
        formData={registerData}
        formInfo="Create Account"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonInfo={registering ? "Creating account..." : "Sing in"}
      />
      <div className="gap-2">
        <Typography color="white" className="font-custom">
          Already have an account?
        </Typography>
        <Typography
          as={Link}
          to="/login"
          color="white"
          className="text-center font-bold underline font-custom"
        >
          Login
        </Typography>
      </div>
      <div className="flex justify-center items-center py-2">
        {error && (
          <Notification message={"User already exists!"} type={"failure"} />
        )}
        {formError.formIsInvalid && (
          <Notification message={formError.message} type={"failure"} />
        )}
      </div>
    </div>
  );
}

export default Register;
