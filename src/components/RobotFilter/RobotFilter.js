const RobotFilter = ({ filterData, setFilterData, applyFilters }) => {
  const changedata = (event) => {
    setFilterData({ ...filterData, [event.target.id]: event.target.value });
  };
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        applyFilters();
      }}
    >
      <label htmlFor="query">Search: </label>
      <input
        type="text"
        name="query"
        id="query"
        value={filterData.query}
        onChange={changedata}
      />
      <button type="submit"> Search! </button>
    </form>
  );
};

export default RobotFilter;
