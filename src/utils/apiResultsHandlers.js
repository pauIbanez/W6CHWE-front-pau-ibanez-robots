import { loadRobotsAction } from "../redux/actions/actionCreators";

export const getAllRobotsApiHandler = (dispatch) => (result) => {
  if (result.ok) {
    dispatch(loadRobotsAction(result.body.robots));
  }
};