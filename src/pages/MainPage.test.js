import { screen } from "@testing-library/react";
import apiContext from "../contexts/apiContext";
import { renderInBocata } from "../setupTests";
import MainPage from "./MainPage";
import * as redux from "react-redux";

describe("Given MainPage", () => {
  describe("When it is invoked", () => {
    test("Then it should render a heading with the text 'Robots!', another with the text 'Popular robots' and a list", () => {
      const expectedHeadingOne = "Robots!";
      const expectedHeadingTwo = "Popular robots";

      const contextValue = {
        robotAPI: {
          getBody: () => {},
        },
      };

      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <MainPage />
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
  });

  describe("When it is invoked and api is ready", () => {
    test("Then it should call getBody", () => {
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
          <MainPage />
        </apiContext.Provider>
      );
      expect(contextValue.robotAPI.getBody).toHaveBeenCalled();
    });
  });

  describe("When it is invoked and api is not ready", () => {
    test("Then it should not call getBody", () => {
      const contextValue = {
        robotAPI: {
          ready: false,
          endpoints: {
            robots: "robots",
          },
          getBody: jest.fn(),
        },
      };

      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <MainPage />
        </apiContext.Provider>
      );
      expect(contextValue.robotAPI.getBody).not.toHaveBeenCalled();
    });
  });

  describe("When it is invoked and we have some robots", () => {
    test("Then it should filter out the ones that are not popular", () => {
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
          <MainPage />
        </apiContext.Provider>
      );

      const items = screen.getAllByRole("listitem");
      const popularRobot = screen.getByText(robots[0].name);
      const notPopularRobot = screen.queryByText(robots[1].name);

      expect(items.length).toBe(2);
      expect(popularRobot).toBeInTheDocument();
      expect(notPopularRobot).not.toBeInTheDocument();
    });
  });
});
