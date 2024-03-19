import "./home.css";

import ButtonWithArrow from "../../components/ui/buttons/ButtonWithArrow";
import HomeContent from "./HomeContent";
import Logo from "./Logo";

export function DefaultHome({ handleQuickExample, handleCreateAccount }) {
  return (
    <section className={`section min-height-app`}>
      <div className="home-container gradient-bg">
        <div className="flex justify-center flex-col items-center">
          <Logo />
          <p className="pt-1 pb-16 bottom-info logo-text">
            Organize your app development.
          </p>
        </div>

        <div className="bottom">
          <div className="buttonsInfo flex flex-col items-center">
            <ButtonWithArrow
              buttonText="Quick example"
              handleClick={handleQuickExample}
            />
            <p className="p-2 ">or</p>
            <ButtonWithArrow
              buttonText="Create account"
              handleClick={handleCreateAccount}
            />
          </div>
        </div>
      </div>
      <HomeContent />
    </section>
  );
}
