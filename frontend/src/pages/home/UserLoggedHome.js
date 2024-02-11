import styles from "./Home.module.css";
import ButtonWithArrow from "../../components/ui/buttons/ButtonWithArrow";

export function UserLoggedHome({ username, handleViewProjects }) {
  return (
    <section className={`${styles.section} pt-10`}>
      <div className={styles.top}>
        <h2>BLOCKY</h2>
      </div>
      <div className={styles.bottom}>
        <p className="p-4">{`Welcome back! ${username}`}</p>
        <div className={`${styles.buttonsInfo} flex flex-col items-center`}>
          <ButtonWithArrow
            buttonText="My projects"
            handleClick={handleViewProjects}
          />
        </div>
      </div>
    </section>
  );
}
