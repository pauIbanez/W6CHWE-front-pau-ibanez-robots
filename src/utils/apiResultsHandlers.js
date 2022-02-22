import {
  addRobotAction,
  deleteRobotAction,
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

export const getDeleteRobotApiHandler = (dispatch, id) => (result) => {
  if (result.ok) {
    dispatch(deleteRobotAction(id));
  }
};

export const getReplaceRobotApiHandler = (dispatch) => (result) => {
  if (result.response.ok) {
    dispatch(replaceRobotAction(result.body));
  }
};

export const getRegisterUserApiHandler =
  (setInvalidField, allGood, email) => (result) => {
    if (result.response.ok) {
      allGood(email);
    } else if (result.body.code === 409) {
      setInvalidField(result.body.message);
    }
  };
