function Epic({ projectId }) {
  const { epics, loading, error } = useSelector((state) => state.epics);
  useEffect(() => {
    dispatch(getEpics(projectId));
  }, [dispatch, projectId]);
  return (
    <>
      {/*Filter and other options*/}
      <ul>
        {epics.map((epic) => (
          <Epic name={epic.name} />
        ))}
      </ul>
    </>
  );
}

function Epic({ name }) {
  return (
    <li>
      <p>{name}</p>
    </li>
  );
}

export default Epic;
