import styles from "./Home.module.css";
import ButtonWithArrow from "../../components/ui/buttons/ButtonWithArrow";

export function DefaultHome({ handleQuickExample, handleCreateAccount }) {
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
            handleClick={handleQuickExample}
          />
          <p className="p-2">or</p>
          <ButtonWithArrow
            buttonText="Create account"
            handleClick={handleCreateAccount}
          />
        </div>
      </div>
    </section>
  );
}
