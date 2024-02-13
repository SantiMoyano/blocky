import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../../services/redux/auth/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { DefaultHome } from "./DefaultHome";
import { UserLoggedHome } from "./UserLoggedHome";
import Loading from "../../utils/Loading";

function Home({ handleLogin, handleLogout, username }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forceLoading, setForceLoading] = useState(true);
  const { loggingIn, loginSuccess } = useSelector((state) => state.login);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate(`/`);
      handleLogout();
    }
    if (loginSuccess) {
      handleLogin();
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

  if (loggingIn) return <Loading />;

  return username === null ? (
    <DefaultHome
      handleQuickExample={loginWithExampleUser}
      handleCreateAccount={navigateToRegister}
    />
  ) : (
    <UserLoggedHome
      username={username}
      handleViewProjects={navigateToProjects}
    />
  );
}

export default Home;
