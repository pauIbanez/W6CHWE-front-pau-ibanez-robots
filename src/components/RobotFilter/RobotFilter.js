import styled from "styled-components";

const HiddenLabel = styled.label`
  // visibility: hidden;
  display: none;
`;

const SearchBox = styled.input`
  height: 50px;
  outline: none;
  border-radius: 50px;
  border: 1px solid gray;
  padding-left: 30px;
  width: 300px;
`;

const SearchButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: #f8f9fb;
  border: 1px solid gray;
  border-radius: 50px;
`;

const FilterForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RobotFilter = ({ filterData, setFilterData, applyFilters }) => {
  const changedata = (event) => {
    if (event.target.value === "") {
      applyFilters();
    }

    setFilterData({ ...filterData, [event.target.id]: event.target.value });
  };
  return (
    <FilterForm
      onSubmit={(event) => {
        event.preventDefault();
        applyFilters();
      }}
    >
      <HiddenLabel htmlFor="query">Search </HiddenLabel>
      <SearchBox
        type="text"
        name="query"
        id="query"
        placeholder="Search!"
        value={filterData.query}
        onChange={changedata}
      />
      <SearchButton type="submit"> Search! </SearchButton>
    </FilterForm>
  );
};

export default RobotFilter;
