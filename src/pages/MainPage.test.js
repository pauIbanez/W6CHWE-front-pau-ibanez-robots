import { screen } from "@testing-library/react";
import apiContext from "../contexts/apiContext";
import { renderInBocata } from "../setupTests";
import MainPage from "./MainPage";

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
});
