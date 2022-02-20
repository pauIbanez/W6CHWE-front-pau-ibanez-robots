import { screen } from "@testing-library/react";
import apiContext from "../contexts/apiContext";
import { renderInBocata } from "../setupTests";
import NewRobotPage from "./NewRobotPage";
import userEvent from "@testing-library/user-event";

describe("Given NewRobotPage", () => {
  describe("When it's instanciated", () => {
    test("Then it should render a header with the text 'Upload a Robot!' and the text 'Fill the form bellow to upload your own robot!'", () => {
      const expectedHeading = "Upload a Robot!";
      const expectedText = "Fill the form bellow to upload your own robot!";

      const contextValue = {
        robotAPI: {
          postBody: () => {},
        },
      };

      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <NewRobotPage />
        </apiContext.Provider>
      );

      const foundHeading = screen.getByRole("heading", {
        name: expectedHeading,
      });
      const foundText = screen.getByText(expectedText);

      expect(foundHeading).toBeInTheDocument();
      expect(foundText).toBeInTheDocument();
    });
  });

  describe("When it's instanciated and the form is submited", () => {
    test("Then it should call postBody passing the resulting robot", () => {
      const expectedRobot = {
        name: "Robot",
        description: "Robot description",
        universe: "Testing universe",
        image: "https://someurl.com/image.png",
        tags: ["real", "humanoid"],
      };

      const contextValue = {
        robotAPI: {
          endpoints: {
            create: "createendpoint",
          },
          postBody: jest.fn(),
        },
        token: "token",
      };

      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <NewRobotPage />
        </apiContext.Provider>
      );

      const foundNameInput = screen.getByLabelText("Name");
      const foundDescriptionInput = screen.getByLabelText("Description");
      const foundImageInput = screen.getByLabelText("Image");
      const foundUniverseInput = screen.getByLabelText("Universe");
      const foundSelectInput = screen.getByRole("combobox", { name: "Tags" });
      const sublitButton = screen.getByRole("button", { name: "Create!" });

      userEvent.type(foundNameInput, expectedRobot.name);
      userEvent.type(foundDescriptionInput, expectedRobot.description);
      userEvent.type(foundImageInput, expectedRobot.image);
      userEvent.type(foundUniverseInput, expectedRobot.universe);
      userEvent.selectOptions(foundSelectInput, expectedRobot.tags[0]);
      userEvent.selectOptions(foundSelectInput, expectedRobot.tags[1]);
      userEvent.click(sublitButton);

      expect(contextValue.robotAPI.postBody).toHaveBeenCalledWith(
        `${contextValue.robotAPI.endpoints.create}?token=${contextValue.token}`,
        expect.any(Function),
        { body: expectedRobot }
      );
    });
  });
});
