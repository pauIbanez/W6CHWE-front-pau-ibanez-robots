import { screen } from "@testing-library/react";
import { renderInBocata } from "../../setupTests";
import Navigation from "./Navigation";

describe("Given Navigation component", () => {
  describe("When it's invoked", () => {
    test("Then it should render 3 links with the names 'Home', 'All robots' and 'UIpload a robot!'", () => {
      const current = 2;
      const home = "Home";
      const allRobots = "All Robots";
      const uploadARobot = "Upload a Robot!";

      renderInBocata(<Navigation current={current} />);

      const homeLink = screen.getByRole("link", { name: home });
      const allRobotsLink = screen.getByRole("link", { name: allRobots });
      const uploadARobotLink = screen.getByRole("link", {
        name: uploadARobot,
      });

      expect(homeLink).toBeInTheDocument();
      expect(allRobotsLink).toBeInTheDocument();
      expect(uploadARobotLink).toBeInTheDocument();
    });
  });

  describe("When it's invoked with current as 2", () => {
    test("Then it should render the link 'All Robots' with font-weight: 600", () => {
      const current = 2;
      const allRobots = "All Robots";
      const expectedStyle = "font-weight: 600;";

      renderInBocata(<Navigation current={current} />);

      const allRobotsLink = screen.getByRole("link", { name: allRobots });

      expect(allRobotsLink).toHaveStyle(expectedStyle);
    });
  });
});
