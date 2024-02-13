import { Spinner } from "@material-tailwind/react";

function Loading() {
  return (
    <div className="loading-container">
      <section className="flex items-center justify-center">
        <Spinner />
      </section>
    </div>
  );
}

export default Loading;
