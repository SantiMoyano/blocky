import ButtonWithArrow from "../../../components/ui/buttons/ButtonWithArrow";
import HomeContent from "../content/HomeContent";
import Logo from "./Logo";

export function UserLoggedHome({ username, handleViewProjects }) {
  return (
    <section className={`section min-height-app`}>
      <div className="home-container gradient-bg">
        <div className="flex justify-center flex-col items-center">
          <Logo />
          <p className="pt-1 pb-16 bottom-info logo-text">{`Welcome back! ${username}`}</p>
        </div>
        <div className="bottom">
          <div className={`buttonsInfo flex flex-col items-center`}>
            <ButtonWithArrow
              buttonText="My projects"
              handleClick={handleViewProjects}
            />
          </div>
        </div>
      </div>
      <HomeContent />
    </section>
  );
}
