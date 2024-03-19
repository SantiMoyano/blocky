function HomeContent() {
  return (
    <div className="py-36 gradient-bg">
      <div className="home-content-title">
        <p>What is Blocky?</p>
      </div>

      <div className="flex flex-col justify-center items-center  gap-y-16 home-content">
        <div className="flex justify-center items-center gap-x-8 p-4 border-2 dark-red-bg">
          <figure>
            <img src="images/dev-focus.png" alt="dev-focus" />
          </figure>
          <div className="text-left image-text">
            <p>Intuitive app designed to assist individual developers.</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-8 p-4 border-2 dark-red-bg">
          <figure>
            <img src="images/progress.png" alt="progress.png" />
          </figure>
          <div className="text-left image-text">
            <p>
              Organize your app development tasks into manageable blocks and
              monitoring their progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeContent;
