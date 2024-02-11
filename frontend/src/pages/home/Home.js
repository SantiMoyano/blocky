import "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../../services/redux/auth/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DefaultHome } from "./DefaultHome";
import { UserLoggedHome } from "./UserLoggedHome";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { loginSuccess } = useSelector((state) => state.login);

  useEffect(() => {
    // Check if the username exists in localStorage
    const username = localStorage.getItem("username");
    if (username) {
      setUser(username);
    }
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      navigate(`/projects`);
      dispatch(reset());
    }
  }, [loginSuccess, navigate]);

  function loginWithExampleUser() {
    const quickExampleUser = {
      username: "ExampleUser",
      password: 123456,
    };
    // Dispatch the action to log in the user
    dispatch(loginUser(quickExampleUser));
  }

  function navigateToRegister() {
    navigate(`/register`);
  }

  function navigateToProjects() {
    navigate(`/projects`);
  }

  return !user ? (
    <DefaultHome
      handleQuickExample={loginWithExampleUser}
      handleCreateAccount={navigateToRegister}
    />
  ) : (
    <UserLoggedHome username={user} handleViewProjects={navigateToProjects} />
  );
}

export default Home;
