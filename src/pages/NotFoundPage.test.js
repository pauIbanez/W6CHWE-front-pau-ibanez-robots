import { render, screen } from "@testing-library/react";
import NotFoundPage from "./NotFoundPage";

describe("Given NotFoundPage", () => {
  describe("When it's invoked", () => {
    test("Then it should render 2 headings '404' and 'page not found' and an image", () => {
      render(<NotFoundPage />);

      const found404 = screen.getByRole("heading", { name: "404" });
      const foundMessage = screen.getByRole("heading", {
        name: "Page not found",
      });
      const foundImage = screen.getByRole("img");

      expect(found404).toBeInTheDocument();
      expect(foundMessage).toBeInTheDocument();
      expect(foundImage).toBeInTheDocument();
    });
  });
});
