import styled from "styled-components";
import PropTypes from "prop-types";

const HiddenLabel = styled.label`
  display: none;
`;

const SearchBox = styled.input`
  height: 50px;
  outline: none;
  border-radius: 50px;
  border: 1px solid gray;
  padding-left: 30px;
  width: 300px;

  &:focus {
    border: 2px solid gray;
  }
`;

const SearchButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: #f8f9fb;
  border: 1px solid gray;
  border-radius: 50px;

  &:hover {
    cursor: pointer;
    background-color: purple;
    color: white;
  }
`;

const FilterForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RobotFilter = ({ filterData, setFilterData, applyFilters }) => {
  const changedata = (event) => {
    setFilterData({ ...filterData, [event.target.id]: event.target.value });
  };
  return (
    <FilterForm
      onSubmit={(event) => {
        event.preventDefault();
        applyFilters();
      }}
    >
      <HiddenLabel htmlFor="query">Search</HiddenLabel>
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

RobotFilter.propTypes = {
  filterData: PropTypes.shape({
    query: PropTypes.string.isRequired,
  }),
  setFilterData: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
};

export default RobotFilter;
