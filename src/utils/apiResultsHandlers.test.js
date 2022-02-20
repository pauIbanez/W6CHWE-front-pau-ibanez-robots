import actionTypes from "../redux/actions/actionTypes";
import {
  getAllRobotsApiHandler,
  getCreateRobotApiHandler,
  getRobotApiHandler,
} from "./apiResultsHandlers";

describe("Given getAllRobotsApiHandler", () => {
  describe("When it's invoked with a dispatch and a result", () => {
    test("Then it should call dispatch with a loadRobotsAction with the robots", () => {
      const mockDispatch = jest.fn();
      const robots = [
        {
          id: 1,
          name: "Robot 1",
          desctiption: "This a robot",
        },
        {
          id: 2,
          name: "Robot 2",
          desctiption: "This a robot",
        },
        {
          id: 3,
          name: "Robot 3",
          desctiption: "This a robot",
        },
      ];

      const result = {
        ok: true,
        body: {
          robots,
        },
      };

      const expectedAction = {
        type: actionTypes.loadRobots,
        robots,
      };

      const resultHandler = getAllRobotsApiHandler(mockDispatch);
      resultHandler(result);

      expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe("When it's invoked with a dispatch and a result as not ok", () => {
    test("Then it should not call dispatch", () => {
      const mockDispatch = jest.fn();

      const result = {
        ok: false,
      };

      const resultHandler = getAllRobotsApiHandler(mockDispatch);
      resultHandler(result);

      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});

describe("Given getCreateRobotApiHandler", () => {
  describe("When it's invoked with a dispatch and a result", () => {
    test("Then it should call dispatch with a addRobotAction with the robot", () => {
      const mockDispatch = jest.fn();
      const robot = {
        id: 1,
        name: "Robot 1",
        desctiption: "This a robot",
      };

      const result = {
        ok: true,
        body: robot,
      };

      const expectedAction = {
        type: actionTypes.addRobot,
        robot,
      };

      const resultHandler = getCreateRobotApiHandler(mockDispatch);
      resultHandler(result);

      expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe("When it's invoked with a dispatch and a result as not ok", () => {
    test("Then it should not call dispatch", () => {
      const mockDispatch = jest.fn();

      const result = {
        ok: false,
      };

      const resultHandler = getCreateRobotApiHandler(mockDispatch);
      resultHandler(result);

      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});

describe("Given getRobotApiHandler", () => {
  describe("When it's invoked with a dispatch and a result", () => {
    test("Then it should call dispatch with a replaceRobotAction with the robot", () => {
      const mockDispatch = jest.fn();
      const robot = {
        id: 1,
        name: "Robot 1",
        desctiption: "This a robot",
      };

      const result = {
        ok: true,
        body: robot,
      };

      const expectedAction = {
        type: actionTypes.replaceRobot,
        robot,
      };

      const resultHandler = getRobotApiHandler(mockDispatch);
      resultHandler(result);

      expect(mockDispatch).toHaveBeenCalledWith(expectedAction);
    });
  });

  describe("When it's invoked with a dispatch and a result as not ok", () => {
    test("Then it should not call dispatch", () => {
      const mockDispatch = jest.fn();

      const result = {
        ok: false,
      };

      const resultHandler = getRobotApiHandler(mockDispatch);
      resultHandler(result);

      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
