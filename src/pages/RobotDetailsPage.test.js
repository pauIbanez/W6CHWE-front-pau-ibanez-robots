import apiContext from "../contexts/apiContext";
import * as redux from "react-redux";
import EditRobotPage from "./EditRobotPage";
import { screen } from "@testing-library/react";
import { renderInBocata } from "../setupTests";
import userEvent from "@testing-library/user-event";

const savedLocation = window.location;

describe("Given RobotDetailsPage", () => {
  describe("When it's instanciated and there is no foundRobot", () => {
    beforeEach(() => {
      delete window.location;
      window.location = Object.assign(
        new URL("https://example.org/robot/edit/2")
      );
    });
    afterEach(() => {
      window.location = savedLocation;
    });
    test("Then it should render a heading with '404' and call the getBody method of the api", () => {
      const contextValue = {
        robotAPI: {
          getBody: jest.fn(),
          ready: true,
          endpoints: {
            robots: "sadasdsda",
          },
        },
      };

      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <EditRobotPage />
        </apiContext.Provider>
      );

      const foundLoading = screen.getByRole("heading", { name: "404" });

      expect(foundLoading).toBeInTheDocument();
      expect(contextValue.robotAPI.getBody).toHaveBeenCalledWith(
        `${contextValue.robotAPI.endpoints.robots}/2`,
        expect.any(Function)
      );
    });
  });

  describe("When it's instanciated and there is a foundRobot", () => {
    beforeEach(() => {
      delete window.location;
      window.location = Object.assign(
        new URL("https://example.org/robot/edit/1")
      );
    });
    afterEach(() => {
      window.location = savedLocation;
    });
    test("Then it should not render a heading with '404'", () => {
      const contextValue = {
        robotAPI: {
          getBody: () => {},
        },
      };

      const robots = [
        {
          id: "1",
          name: "asdas",
          description: "",
          universe: "",
          tags: ["real", "humanoid", "popular"],
        },
      ];

      const spySelector = jest.spyOn(redux, "useSelector");
      spySelector.mockReturnValue({ robots });

      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <EditRobotPage />
        </apiContext.Provider>
      );

      const foundLoading = screen.queryByRole("heading", { name: "404" });

      expect(foundLoading).not.toBeInTheDocument();
    });
  });

  describe("When it's instanciated and the form is submitted", () => {
    beforeEach(() => {
      delete window.location;
      window.location = Object.assign(
        new URL("https://example.org/robot/edit/1")
      );
    });
    afterEach(() => {
      window.location = savedLocation;
    });
    test("Then it should call the put method", () => {
      const contextValue = {
        robotAPI: {
          getBody: () => {},
          put: jest.fn(),
          endpoints: {
            update: "sadasdsda",
          },
        },
        token: "sad",
      };

      const robots = [
        {
          id: "1",
          name: "asdas",
          description: "asd",
          universe: "asd",
          image: "sadasd",
          tags: ["real", "humanoid", "popular"],
        },
      ];

      const spySelector = jest.spyOn(redux, "useSelector");
      spySelector.mockReturnValue({ robots });

      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <EditRobotPage />
        </apiContext.Provider>
      );

      const submitButton = screen.getByRole("button", { name: "Update!" });
      userEvent.click(submitButton);

      expect(contextValue.robotAPI.put).toHaveBeenCalledWith(
        `${contextValue.robotAPI.endpoints.update}?token=${contextValue.token}`,
        expect.any(Function),
        {
          body: robots[0],
        }
      );
    });
  });
});
