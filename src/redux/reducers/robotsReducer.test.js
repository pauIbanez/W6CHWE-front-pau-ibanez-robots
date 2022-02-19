import actionTypes from "../actions/actionTypes";
import robotsReducer from "./robotsReducer";

describe("Given robotsReducer", () => {
  describe("When it's invoked passing 3 robots and a loadRobots action with 2 robots", () => {
    test("Then it should return the 3 action robots", () => {
      const currentRobots = [
        {
          id: 1,
          ssadasdas: "SDFasdsa",
        },
        {
          id: 2,
          ssadasdas: "dfagfdgagFDAGDF",
        },
        {
          id: 3,
          ssadasdas: "FDSFSDFGDSGFDGH",
        },
      ];

      const expectedRobots = [
        {
          id: 4,
          ssadasdas: "sdfgdfgs",
        },
        {
          id: 5,
          ssadasdas: "hfgtrxghfdeertwaggfde",
        },
      ];

      const action = {
        type: actionTypes.loadRobots,
        robots: expectedRobots,
      };

      const newRobots = robotsReducer(currentRobots, action);

      expect(newRobots).toEqual(expectedRobots);
    });
  });

  describe("When it's invoked passing 3 robots and a updateRobot action with a new robot", () => {
    test("Then it should return the robots with the action one updated", () => {
      const currentRobots = [
        {
          id: 1,
          ssadasdas: "Robot 1",
        },
        {
          id: 2,
          ssadasdas: "Robot 2",
        },
        {
          id: 3,
          ssadasdas: "Robot 3",
        },
      ];

      const updatedRobot = {
        id: 2,
        ssadasdas: "new Robot 2",
      };

      const expectedRobots = [
        {
          id: 1,
          ssadasdas: "Robot 1",
        },
        {
          id: 2,
          ssadasdas: "new Robot 2",
        },
        {
          id: 3,
          ssadasdas: "Robot 3",
        },
      ];

      const action = {
        type: actionTypes.updateRobot,
        robot: updatedRobot,
      };

      const newRobots = robotsReducer(currentRobots, action);

      expect(newRobots).toEqual(expectedRobots);
    });
  });

  describe("When it's invoked passing 3 robots and a addRobot action with a new robot", () => {
    test("Then it should return the 4 robots", () => {
      const currentRobots = [
        {
          id: 1,
          ssadasdas: "Robot 1",
        },
        {
          id: 2,
          ssadasdas: "Robot 2",
        },
        {
          id: 3,
          ssadasdas: "Robot 3",
        },
      ];

      const newRobot = {
        id: 4,
        ssadasdas: "Robot 4",
      };

      const expectedRobots = [
        {
          id: 1,
          ssadasdas: "Robot 1",
        },
        {
          id: 2,
          ssadasdas: "Robot 2",
        },
        {
          id: 3,
          ssadasdas: "Robot 3",
        },
        {
          id: 4,
          ssadasdas: "Robot 4",
        },
      ];

      const action = {
        type: actionTypes.addRobot,
        robot: newRobot,
      };

      const newRobots = robotsReducer(currentRobots, action);

      expect(newRobots).toEqual(expectedRobots);
    });
  });

  describe("When it's invoked passing 3 robots and a replaceRobot action with a new robot", () => {
    test("Then it should return the robots with the new Robot", () => {
      const currentRobots = [
        {
          id: 1,
          ssadasdas: "Robot 1",
        },
        {
          id: 2,
          ssadasdas: "Robot 2",
        },
        {
          id: 3,
          ssadasdas: "Robot 3",
        },
      ];

      const updatedRobot = {
        id: 2,
        ssadasdas: "new Robot 2",
      };

      const expectedRobots = [
        {
          id: 1,
          ssadasdas: "Robot 1",
        },
        {
          id: 2,
          ssadasdas: "new Robot 2",
        },
        {
          id: 3,
          ssadasdas: "Robot 3",
        },
      ];

      const action = {
        type: actionTypes.replaceRobot,
        robot: updatedRobot,
      };

      const newRobots = robotsReducer(currentRobots, action);

      expect(newRobots).toEqual(expectedRobots);
    });
  });

  describe("When it's invoked passing 3 robots and a deleteRobot action with id 3", () => {
    test("Then it should return the robots withoput the robot with id 3", () => {
      const currentRobots = [
        {
          id: 1,
          ssadasdas: "Robot 1",
        },
        {
          id: 2,
          ssadasdas: "Robot 2",
        },
        {
          id: 3,
          ssadasdas: "Robot 3",
        },
      ];

      const id = 3;

      const expectedRobots = [
        {
          id: 1,
          ssadasdas: "Robot 1",
        },
        {
          id: 2,
          ssadasdas: "Robot 2",
        },
      ];

      const action = {
        type: actionTypes.deleteRobot,
        id,
      };

      const newRobots = robotsReducer(currentRobots, action);

      expect(newRobots).toEqual(expectedRobots);
    });
  });

  describe("When it's invoked", () => {
    test("Then it should return an empty array", () => {
      const expectedRobots = [];

      const newRobots = robotsReducer();

      expect(newRobots).toEqual(expectedRobots);
    });
  });
});
