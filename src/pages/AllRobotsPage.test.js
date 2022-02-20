import { screen } from "@testing-library/react";
import apiContext from "../contexts/apiContext";
import { renderInBocata } from "../setupTests";
import AllRobotsPage from "./AllRobotsPage";
import * as redux from "react-redux";
import userEvent from "@testing-library/user-event";

describe("Given AllRobotsPage", () => {
  describe("When it is invoked", () => {
    test("Then it should render  a heading with the text 'Robots!', another with the text 'All of our robots' and a list", () => {
      const expectedHeadingOne = "Robots!";
      const expectedHeadingTwo = "All of our robots";

      const contextValue = {
        robotAPI: {
          getBody: () => {},
        },
      };

      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <AllRobotsPage />
        </apiContext.Provider>
      );

      const foundHeadingOne = screen.getByRole("heading", {
        name: expectedHeadingOne,
      });
      const foundHeadingTwo = screen.getByRole("heading", {
        name: expectedHeadingTwo,
      });
      const foundList = screen.getByRole("list");

      expect(foundHeadingOne).toBeInTheDocument();
      expect(foundHeadingTwo).toBeInTheDocument();
      expect(foundList).toBeInTheDocument();
    });

    test("Then it should render an imput and a button", () => {
      const contextValue = {
        robotAPI: {
          getBody: () => {},
        },
      };

      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <AllRobotsPage />
        </apiContext.Provider>
      );

      const foundLabel = screen.getByLabelText("Search");
      const foundSearchButton = screen.getByRole("button", { name: "Search!" });

      expect(foundLabel).toBeInTheDocument();
      expect(foundSearchButton).toBeInTheDocument();
    });
  });

  describe("When it is invoked and we have some robots", () => {
    test("Then it should show all robots", () => {
      const robots = [
        {
          id: 1,
          name: "Robot 1",
          popular: true,
          tags: [],
        },
        {
          id: 2,
          name: "Robot 2",
          tags: [],
        },
        {
          id: 3,
          name: "Robot 3",
          tags: [],
        },
        {
          id: 4,
          name: "Robot 4",
          popular: true,
          tags: [],
        },
      ];

      const spySelector = jest.spyOn(redux, "useSelector");
      spySelector.mockReturnValue({ robots });

      const contextValue = {
        robotAPI: {
          ready: true,
          endpoints: {
            robots: "robots",
          },
          getBody: jest.fn(),
        },
      };

      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <AllRobotsPage />
        </apiContext.Provider>
      );

      const items = screen.getAllByRole("listitem");
      const popularRobot = screen.getByText(robots[0].name);
      const notPopularRobot = screen.queryByText(robots[1].name);

      expect(items.length).toBe(4);
      expect(popularRobot).toBeInTheDocument();
      expect(notPopularRobot).toBeInTheDocument();
    });
  });

  describe("When it is invoked and we have some robots and someone filters with 1 match", () => {
    test("Then it should show all robots", () => {
      const robots = [
        {
          id: 1,
          name: "Robot 1",
          popular: true,
          tags: [],
        },
        {
          id: 2,
          name: "Robot 2",
          tags: [],
        },
        {
          id: 3,
          name: "Pice and 3",
          sentient: true,
          tags: [],
        },
        {
          id: 4,
          name: "Robot 4",
          popular: true,
          tags: [],
        },
      ];

      const spySelector = jest.spyOn(redux, "useSelector");
      spySelector.mockReturnValue({ robots });

      const contextValue = {
        robotAPI: {
          ready: true,
          endpoints: {
            robots: "robots",
          },
          getBody: jest.fn(),
        },
      };

      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <AllRobotsPage />
        </apiContext.Provider>
      );

      const foundInput = screen.getByLabelText("Search");
      const foundSearchButton = screen.getByRole("button", { name: "Search!" });

      userEvent.click(foundSearchButton);
      userEvent.type(foundInput, "sentient pice");
      userEvent.click(foundSearchButton);

      const renderedRobots = screen.getAllByRole("listitem");
      const expectedRobot = screen.getByText("Pice and 3");
      const notExpectedRobot = screen.queryByText("Robot 4");

      expect(renderedRobots.length).toBe(1);
      expect(expectedRobot).toBeInTheDocument();
      expect(notExpectedRobot).not.toBeInTheDocument();
    });
  });
});
