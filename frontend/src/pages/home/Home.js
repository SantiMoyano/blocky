import styles from "./Home.module.css";
import "./Home.module.css";
import ButtonWithArrow from "../../components/ui/buttons/ButtonWithArrow";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/redux/auth/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggingIn, error, loginSuccess } = useSelector(
    (state) => state.login
  );

  useEffect(() => {
    if (loginSuccess) {
      navigate(`/projects`);
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

  return (
    <section className={`${styles.section} pt-14`}>
      <div className={styles.top}>
        <h2>BLOCKY</h2>
      </div>
      <div className={styles.bottom}>
        <p className="p-4">App for project management</p>
        <div className={`${styles.buttonsInfo} flex flex-col items-center`}>
          <ButtonWithArrow
            buttonText="Quick example"
            handleClick={loginWithExampleUser}
          />
          <p className="p-2">or</p>
          <ButtonWithArrow
            buttonText="Create account"
            handleClick={navigateToRegister}
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
