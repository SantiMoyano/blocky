function Title({ titleName }) {
  return (
    <div className="dark-bg p-8 pt-8">
      <h1 className="font-bold text-white">
        {titleName ? titleName.toUpperCase() : titleName}
      </h1>
    </div>
  );
}

export default Title;
