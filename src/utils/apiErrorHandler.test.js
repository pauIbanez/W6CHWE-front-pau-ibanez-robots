import apiErrorHandler from "./apiErrorHandler";

describe("Given apiErrorHandler", () => {
  describe("When it's called with an error and a log", () => {
    test("Then it should store the error in the log", () => {
      const log = [];
      const error = {
        method: "GET",
        endpoint: "/test",
        error: new Error("dsfsd"),
      };

      const expectedLog = [
        {
          method: "GET",
          endpoint: "/test",
          error: new Error("dsfsd"),
        },
      ];

      const errorHandler = apiErrorHandler(log);
      errorHandler(error);

      expect(log).toEqual(expectedLog);
    });
  });
});
