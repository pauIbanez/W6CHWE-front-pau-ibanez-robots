import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";
import apiContext from "../contexts/apiContext";
import { getRobotApiHandler } from "../utils/apiResultsHandlers";
import NotFoundPage from "./NotFoundPage";

const RobotDetailsPage = () => {
  const { robotAPI } = useContext(apiContext);
  const { robots } = useSelector((state) => state);
  const dispatch = useDispatch();

  const robotId = window.location.pathname.split("/")[2];
  console.log(robots);
  const foundRobot = robots.find((robot) => robot.id === robotId);

  useEffect(() => {
    if (robotAPI.ready && !foundRobot) {
      robotAPI.getBody(
        `${robotAPI.endpoints.robot}/${robotId}`,
        getRobotApiHandler(dispatch)
      );
    }
  }, [dispatch, foundRobot, robotId, robotAPI]);

  const texts = {
    title: "Robot details",
    description: "Learn all about your favourite robot!",
  };

  if (foundRobot) {
    return (
      <>
        <Header current={4} texts={texts} />
      </>
    );
  } else {
    return <NotFoundPage />;
  }
};

export default RobotDetailsPage;
