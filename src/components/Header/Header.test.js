import { screen } from "@testing-library/react";
import { renderInBocata } from "../../setupTests";
import Header from "./Header";

describe("Given Header", () => {
  describe("When it's invoked without texts", () => {
    test("Then it should render the heading 'Robots!' and the text 'Yes, Robots, we have them! Lots of them!'", () => {
      const expectedHeading = "Robots!";
      const expectedDescription = "Yes, Robots, we have them! Lots of them!";

      renderInBocata(<Header current={1} />);

      const foundTitle = screen.getByRole("heading", { name: expectedHeading });
      const foundDescription = screen.getByText(expectedDescription);

      expect(foundDescription).toBeInTheDocument();
      expect(foundTitle).toBeInTheDocument();
    });
  });

  describe("When it's invoked with texts", () => {
    test("Then it should render the heading texts.title and the text texts.description", () => {
      const texts = {
        title: "Thi title",
        description: "sadjuhyasgfydasuyfgsdiuyouf",
      };

      renderInBocata(<Header current={1} texts={texts} />);

      const foundTitle = screen.getByRole("heading", { name: texts.title });
      const foundDescription = screen.getByText(texts.description);

      expect(foundDescription).toBeInTheDocument();
      expect(foundTitle).toBeInTheDocument();
    });
  });
});
