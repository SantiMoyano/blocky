import ButtonWithArrow from "../../components/ui/buttons/ButtonWithArrow";

export function DefaultHome({ handleQuickExample, handleCreateAccount }) {
  return (
    <section className={`section pt-14`}>
      <div className="top">
        <h2>BLOCKY</h2>
      </div>
      <div className="bottom">
        <p className="p-4">App for project management</p>
        <div className={`buttonsInfo flex flex-col items-center`}>
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
