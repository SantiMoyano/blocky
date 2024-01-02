import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth/registerSlice";

function Register() {
  const dispatch = useDispatch();
  const registering = useSelector((state) => state.auth.registering);
  const error = useSelector((state) => state.auth.error);
  const registrationSuccess = useSelector(
    (state) => state.auth.registrationSuccess
  );

  const [formData, setFormData] = useState({
    firstname: "",
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Realizar validaciones, por ejemplo, asegurarse de que las contraseñas coincidan
    const registerData = {
      firstname: formData.firstname,
      username: formData.username,
      password: formData.password,
    };
    // Despachar la acción para registrar al usuario
    dispatch(registerUser(registerData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Firstname</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={registering}>
        {registering ? "Registering..." : "Submit"}
      </button>
      {registrationSuccess && (
        <p style={{ color: "green" }}>User created successfully!</p>
      )}
      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>
          <p>
            Hubo un error durante el registro. Por favor, intenta nuevamente.
          </p>
        </div>
      )}
    </form>
  );
}

export default Register;
