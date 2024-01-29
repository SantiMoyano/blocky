import styles from "./Home.module.css";
import "./Home.module.css";
import ButtonWithArrow from "../utils/buttons/ButtonWithArrow";

function Home() {
  return (
    <section className={styles.section}>
      <div className={styles.top}>
        <h2>BLOCKY</h2>
      </div>
      <div className={styles.bottom}>
        <p className="p-4">App for project management</p>
        <div className={`${styles.buttonsInfo} flex flex-col items-center`}>
          <ButtonWithArrow buttonText="Quick example" />
          <p className="p-2">or</p>
          <ButtonWithArrow buttonText="Create account" />
        </div>
      </div>
    </section>
  );
}

export default Home;
