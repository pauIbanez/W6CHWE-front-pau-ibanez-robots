import actionTypes from "../actions/actionTypes";

const robotsReducer = (currentRobots = [], action = {}) => {
  let newRrobots;

  switch (action.type) {
    case actionTypes.loadRobots:
      newRrobots = [...action.robots];
      break;

    case actionTypes.updateRobot:
      newRrobots = currentRobots.map((robot) =>
        robot.id === action.robot.id ? action.robot : robot
      );
      break;

    case actionTypes.addRobot:
      newRrobots = [...currentRobots, action.robot];
      break;

    case actionTypes.replaceRobot:
      newRrobots = currentRobots.map((robot) =>
        robot.id === action.robot.id ? action.robot : robot
      );
      break;

    case actionTypes.deleteRobot:
      newRrobots = currentRobots.filter(({ id }) => id !== action.id);
      break;
    default:
      newRrobots = [...currentRobots];
  }

  return newRrobots;
};

export default robotsReducer;
