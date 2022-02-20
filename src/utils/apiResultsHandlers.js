import {
  addRobotAction,
  loadRobotsAction,
  replaceRobotAction,
} from "../redux/actions/actionCreators";

export const getAllRobotsApiHandler = (dispatch) => (result) => {
  if (result.ok) {
    dispatch(loadRobotsAction(result.body.robots));
  }
};

export const getCreateRobotApiHandler = (dispatch) => (result) => {
  if (result.ok) {
    dispatch(addRobotAction(result.body));
  }
};

export const getRobotApiHandler = (dispatch) => (result) => {
  if (result.ok) {
    dispatch(replaceRobotAction(result.body));
  }
};
