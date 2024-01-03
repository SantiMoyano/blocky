import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/registerSlice";
import Form from "../form/Form";

function Register() {
  const dispatch = useDispatch();
  const registering = useSelector((state) => state.auth.registering);
  const error = useSelector((state) => state.auth.error);
  const registrationSuccess = useSelector(
    (state) => state.auth.registrationSuccess
  );

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

  const handleChange = (e) => {
    setRegisterRequest({
      ...registerRequest,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validations, for example, ensure passwords match

    // Expected data on API register endpoint
    const registerReq = {
      firstname: registerRequest.firstname,
      username: registerRequest.username,
      password: registerRequest.password,
    };
    // Dispatch the action to register the user
    dispatch(registerUser(registerReq));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form formData={registerData} handleChange={handleChange} />
      <button type="submit" disabled={registering}>
        {registering ? "Registering..." : "Submit"}
      </button>
      {registrationSuccess ? (
        <p style={{ color: "green" }}>User created successfully!</p>
      ) : (
        error && <p style={{ color: "red" }}>User already exists!</p>
      )}
    </form>
  );
}

export default Register;
