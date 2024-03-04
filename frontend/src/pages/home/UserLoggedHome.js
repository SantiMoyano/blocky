import ButtonWithArrow from "../../components/ui/buttons/ButtonWithArrow";

export function UserLoggedHome({ username, handleViewProjects }) {
  return (
    <section className={`section min-height-app`}>
      <div className={`top`}>
        <h2>BLOCKY</h2>
      </div>
      <div className="bottom">
        <p className="p-4">{`Welcome back! ${username}`}</p>
        <div className={`buttonsInfo flex flex-col items-center`}>
          <ButtonWithArrow
            buttonText="My projects"
            handleClick={handleViewProjects}
          />
        </div>
      </div>
    </section>
  );
}
