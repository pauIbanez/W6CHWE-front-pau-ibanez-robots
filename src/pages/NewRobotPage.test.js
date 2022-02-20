import { fireEvent, screen } from "@testing-library/react";
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

  describe("When it's instanciated and the form tags are selected and unselected", () => {
    test("Then it should disable the expected options", () => {
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

      const foundSelectInput = screen.getByRole("combobox", { name: "Tags" });
      const foundOptions = screen.getAllByRole("option");

      userEvent.selectOptions(foundSelectInput, foundOptions[1]);

      expect(foundOptions[1]).toBeDisabled();
      expect(foundOptions[2]).toBeDisabled();
      userEvent.selectOptions(foundSelectInput, foundOptions[5]);

      expect(foundOptions[3]).toBeDisabled();
      expect(foundOptions[4]).toBeDisabled();
      expect(foundOptions[5]).toBeDisabled();

      const realTagDelButton = screen.getByTestId("real-tag-button");

      userEvent.click(realTagDelButton);

      expect(foundOptions[1]).not.toBeDisabled();
      expect(foundOptions[2]).not.toBeDisabled();

      userEvent.selectOptions(foundSelectInput, foundOptions[2]);
      const spaceCraftTagDelButton = screen.getByTestId(
        "spaceCraft-tag-button"
      );
      userEvent.click(spaceCraftTagDelButton);

      expect(foundOptions[4]).not.toBeDisabled();

      userEvent.selectOptions(foundSelectInput, foundOptions[4]);
      const lifeLikeTagDelButton = screen.getByTestId("life-like-tag-button");
      userEvent.click(lifeLikeTagDelButton);

      userEvent.selectOptions(foundSelectInput, foundOptions[0]);
    });
  });

  describe("When it's instanciated and the image is broken", () => {
    test("Then it should not display the image", () => {
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

      const foundImage = screen.getByRole("img", { name: "Robot" });
      fireEvent.error(foundImage);

      expect(foundImage).toHaveStyle("display: none;");
    });
  });

  describe("When it's instanciated and the image is okee", () => {
    test("Then it should display the image", () => {
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

      const foundImage = screen.getByRole("img", { name: "Robot" });
      fireEvent.load(foundImage);

      expect(foundImage).toHaveStyle("display: block;");
    });
  });
});
