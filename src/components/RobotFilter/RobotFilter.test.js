import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RobotFilter from "./RobotFilter";

describe("Given RobotFilter", () => {
  describe("When it is invoked", () => {
    test("Then it should render a textBox and a button", () => {
      const blankFilter = {
        query: "",
        tags: [],
      };

      render(
        <RobotFilter
          filterData={blankFilter}
          setFilterData={() => {}}
          applyFilters={() => {}}
        />
      );

      const foundInput = screen.getByLabelText("Search");
      const foundSearchButton = screen.getByRole("button", { name: "Search!" });

      expect(foundInput).toBeInTheDocument();
      expect(foundSearchButton).toBeInTheDocument();
    });
  });

  describe("When someone searches", () => {
    test("Then it should call applyFilter", () => {
      const blankFilter = {
        query: "",
        tags: [],
      };

      const applyFilter = jest.fn();

      render(
        <RobotFilter
          filterData={blankFilter}
          setFilterData={() => {}}
          applyFilters={applyFilter}
        />
      );

      const foundSearchButton = screen.getByRole("button", { name: "Search!" });

      userEvent.click(foundSearchButton);

      expect(applyFilter).toHaveBeenCalled();
    });
  });

  describe("When it is invoked and someone types and searches", () => {
    test("Then it should call setFormData and applyFilters", () => {
      let filterData = {
        query: "",
        tags: [],
      };
      const userInput = "cosetes";

      const applyFilter = jest.fn();
      const setFilterData = jest.fn().mockImplementation((newFilterData) => {
        filterData = { newFilterData };
      });

      render(
        <RobotFilter
          filterData={filterData}
          setFilterData={setFilterData}
          applyFilters={applyFilter}
        />
      );

      const foundInput = screen.getByLabelText("Search");
      const foundSearchButton = screen.getByRole("button", { name: "Search!" });

      userEvent.type(foundInput, userInput);
      userEvent.click(foundSearchButton);

      expect(setFilterData).toHaveBeenCalledTimes(userInput.length);
      expect(applyFilter).toHaveBeenCalled();
    });
  });
});
