import { screen } from "@testing-library/react";
import apiContext from "../contexts/apiContext";
import { renderInBocata } from "../setupTests";
import RobotDetailsPage from "./RobotDetailsPage";
import * as redux from "react-redux";
import userEvent from "@testing-library/user-event";

const savedLocation = window.location;

describe("Given RobotDetailsPage", () => {
  describe("When it's instanciated and there is no foundRobot", () => {
    beforeEach(() => {
      delete window.location;
      window.location = Object.assign(new URL("https://example.org/robot/2"));
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
          <RobotDetailsPage />
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
      window.location = Object.assign(new URL("https://example.org/robot/1"));
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
          <RobotDetailsPage />
        </apiContext.Provider>
      );

      const foundLoading = screen.queryByRole("heading", { name: "404" });

      expect(foundLoading).not.toBeInTheDocument();
    });
  });

  describe("When it's instanciated and the delete button is clicked", () => {
    beforeEach(() => {
      delete window.location;
      window.location = Object.assign(new URL("https://example.org/robot/1"));
    });
    afterEach(() => {
      window.location = savedLocation;
    });
    test("Then it should render a pop-up with the text 'Are you sure you want to delete this robot?'", () => {
      const contextValue = {
        robotAPI: {
          getBody: () => {},
          deleteBody: jest.fn(),
          endpoints: {
            delete: "sadas",
          },
        },
        token: "sdasd",
      };

      const expectedText = "Are you sure you want to delete this robot?";

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
          <RobotDetailsPage />
        </apiContext.Provider>
      );
      const deleteButton = screen.getByRole("button", { name: "Delete Robot" });
      userEvent.click(deleteButton);
      const foundAlert = screen.getByText(expectedText);
      expect(foundAlert).toBeInTheDocument();

      const approveDeleteButton = screen.getByRole("button", {
        name: "Yes, delete Robot",
      });

      userEvent.click(approveDeleteButton);

      expect(contextValue.robotAPI.deleteBody).toHaveBeenCalledWith(
        `${contextValue.robotAPI.endpoints.delete}/1?token=${contextValue.token}`,
        expect.any(Function)
      );
    });
  });

  describe("When it's instanciated and the edit button is clicked", () => {
    const mockGet = jest.fn();
    beforeEach(() => {
      delete window.location;
      window.location = Object.assign(new URL("https://example.org/robot/1"));
      Object.defineProperty(window.location, "href", {
        set: mockGet,
      });
    });
    afterEach(() => {
      window.location = savedLocation;
    });
    test("Then it should chnage the window.location.href", () => {
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
          <RobotDetailsPage />
        </apiContext.Provider>
      );
      const editButton = screen.getByRole("button", { name: "Edit Robot" });
      userEvent.click(editButton);

      expect(mockGet).toHaveBeenCalledWith("/robot/edit/1");
    });
  });
});
