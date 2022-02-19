import actionTypes from "./actionTypes";

export const loadRobotsAction = (robots) => ({
  type: actionTypes.loadRobots,
  robots,
});

export const updateRobotAction = (robot) => ({
  type: actionTypes.updateRobot,
  robot,
});

export const addRobotAction = (robot) => ({
  type: actionTypes.addRobot,
  robot,
});

export const replaceRobotAction = (robot) => ({
  type: actionTypes.replaceRobot,
  robot,
});

export const deleteRobotAction = (id) => ({
  type: actionTypes.deleteRobot,
  id,
});
