/* eslint-disable testing-library/no-node-access */
import { render, screen } from "@testing-library/react";
import ListRobot from "./ListRobot";

describe("Given ListRobot", () => {
  describe("When it's instanciated with a robot", () => {
    test("Then it should render the robot's name, universe and description", () => {
      const robot = {
        name: "testing bot",
        universe: "Jest",
        description: "This bot ensures my code is nisuuu",
        tags: [],
        createdAt: "2022-02-20T19:46:11.056+00:00",
      };

      render(<ListRobot robot={robot} />);

      const name = screen.getByText(robot.name);
      const universe = screen.getByText(robot.universe);
      const description = screen.getByText(robot.description);

      expect(name).toBeInTheDocument();
      expect(universe).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  describe("When it's instanciated with a robot and flip as false (default)", () => {
    test("Then it should render the robot's info after the picture", () => {
      const robot = {
        name: "testing bot",
        universe: "Jest",
        description: "This bot ensures my code is nisuuu",
        tags: [],
        createdAt: "2022-02-20T19:46:11.056+00:00",
      };

      render(<ListRobot robot={robot} />);

      const robotElement = screen.getByRole("listitem");
      const robotInfo = screen.getByTestId("robotinfo");
      const RobotImage = screen.getByRole("img");

      expect(robotElement.firstChild).toBe(RobotImage);
      expect(robotElement.lastChild).toBe(robotInfo);
    });
  });

  describe("When it's instanciated with a robot and flip as true", () => {
    test("Then it should render the robot's info before the picture", () => {
      const robot = {
        name: "testing bot",
        universe: "Jest",
        description: "This bot ensures my code is nisuuu",
        tags: [],
        createdAt: "2022-02-20T19:46:11.056+00:00",
      };

      render(<ListRobot robot={robot} flip={true} />);

      const robotElement = screen.getByRole("listitem");
      const robotInfo = screen.getByTestId("robotinfo");
      const RobotImage = screen.getByRole("img");

      expect(robotElement.firstChild).toBe(robotInfo);
      expect(robotElement.lastChild).toBe(RobotImage);
    });
  });

  describe("When it's instanciated with some tags", () => {
    test("Then it should render them", () => {
      const robot = {
        name: "testing bot",
        universe: "Jest",
        description: "This bot ensures my code is nisuuu",
        tags: ["real", "un tt de metal"],
        createdAt: "2022-02-20T19:46:11.056+00:00",
      };

      const expectedTags = ["Real", "Un tt de metal"];

      render(<ListRobot robot={robot} flip={true} />);

      const realTag = screen.getByText(expectedTags[0]);
      const ttTag = screen.getByText(expectedTags[1]);

      expect(realTag).toBeInTheDocument();
      expect(ttTag).toBeInTheDocument();
    });
  });

  describe("When it's instanciated with a created at date", () => {
    test("Then it should render it", () => {
      const robot = {
        name: "testing bot",
        universe: "Jest",
        description: "This bot ensures my code is nisuuu",
        tags: ["real", "un tt de metal"],
        createdAt: "2022-02-20T19:46:11.056+00:00",
      };

      const expectedTags = ["Real", "Un tt de metal"];

      render(<ListRobot robot={robot} flip={true} />);

      const realTag = screen.getByText(expectedTags[0]);
      const ttTag = screen.getByText(expectedTags[1]);

      expect(realTag).toBeInTheDocument();
      expect(ttTag).toBeInTheDocument();
    });
  });
});
