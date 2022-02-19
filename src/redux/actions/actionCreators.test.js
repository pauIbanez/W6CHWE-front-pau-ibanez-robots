import {
  addRobotAction,
  deleteRobotAction,
  loadRobotsAction,
  replaceRobotAction,
  updateRobotAction,
} from "./actionCreators";
import actionTypes from "./actionTypes";

describe("Given loadRobotsAction", () => {
  describe("When it is called passing an array of robots", () => {
    test("Then it should return an action with type loadRobots and the robots", () => {
      const robots = [
        {
          id: 1,
          something: "asdasdasdasdad",
        },
        {
          id: 2,
          something: "asdasdasdasdsfsdfsdfsdgfdad",
        },
      ];

      const expectedAction = {
        type: actionTypes.loadRobots,
        robots,
      };

      const action = loadRobotsAction(robots);

      expect(action).toEqual(expectedAction);
    });
  });
});

describe("Given updateRobotAction", () => {
  describe("When it is called passing a robot", () => {
    test("Then it should return an action with type updateRobot and the robot", () => {
      const robot = {
        id: 1,
        equisde: "testing is fun",
      };

      const expectedAction = {
        type: actionTypes.updateRobot,
        robot,
      };

      const action = updateRobotAction(robot);

      expect(action).toEqual(expectedAction);
    });
  });
});

describe("Given addRobotAction", () => {
  describe("When it is called passing a robot", () => {
    test("Then it should return an action with type addRobot and the robot", () => {
      const robot = {
        id: 1,
        equisde: "testing is fun",
      };

      const expectedAction = {
        type: actionTypes.addRobot,
        robot,
      };

      const action = addRobotAction(robot);

      expect(action).toEqual(expectedAction);
    });
  });
});

describe("Given replaceRobotAction", () => {
  describe("When it is called passing a robot", () => {
    test("Then it should return an action with type replaceRobot and the robot", () => {
      const robot = {
        id: 1,
        equisde: "testing is fun",
      };

      const expectedAction = {
        type: actionTypes.replaceRobot,
        robot,
      };

      const action = replaceRobotAction(robot);

      expect(action).toEqual(expectedAction);
    });
  });
});

describe("Given deleteRobotAction", () => {
  describe("When it is called passing an id", () => {
    test("Then it should return an action with type deleteRobot and the id", () => {
      const id = "sdfjuyhogdsfyudsgfijuhdsuygfidsgh";

      const expectedAction = {
        type: actionTypes.deleteRobot,
        id,
      };

      const action = deleteRobotAction(id);

      expect(action).toEqual(expectedAction);
    });
  });
});
