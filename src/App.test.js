import { screen } from "@testing-library/react";
import App from "./App";
import apiContext from "./contexts/apiContext";
import { renderInBocata } from "./setupTests";

describe("Given App", () => {
  describe("When it's instanciated", () => {
    test("Then it should redirect to /home hence rendering Robots!", () => {
      const expectedText = "Robots!";
      const contextValue = {
        robotAPI: {
          getBody: () => {},
          put: () => {},
          postBody: () => {},
          deleteBody: () => {},
          endpoints: {
            robots: "robots",
            create: "robots/create",
            delete: "robots/delete",
            update: "robots/update",
            token: "token",
          },
        },
        token: "sadasd",
      };
      renderInBocata(
        <apiContext.Provider value={contextValue}>
          <App />
        </apiContext.Provider>
      );

      const expectedHeader = screen.getByRole("heading", {
        name: expectedText,
      });

      expect(expectedHeader).toBeInTheDocument();
    });
  });
});
