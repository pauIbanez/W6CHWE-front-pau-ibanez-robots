import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header/Header";
import RobotForm from "../components/RobotForm/RobotForm";
import apiContext from "../contexts/apiContext";
import {
  getRobotApiHandler,
  getReplaceRobotApiHandler,
} from "../utils/apiResultsHandlers";
import NotFoundPage from "./NotFoundPage";

const FormHolder = styled.div`
  padding: 100px;
`;
const EditRobotPage = () => {
  const headerTexts = {
    title: "Update your favourite robot!",
    description: "Fill the form bellow to upload and update the robot!",
  };

  const robotId = window.location.pathname.split("/")[3];
  const { robotAPI, token } = useContext(apiContext);
  const { robots } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useRef(true);
  const timeOutInRenders = useRef(0);

  timeOutInRenders.current += 1;

  const foundRobot = robots.find((robot) => robot.id === robotId);

  const initialFormData = {
    name: "",
    description: "",
    image: "",
    universe: "",
    tags: [],
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (robotAPI.ready && !foundRobot) {
      robotAPI.getBody(
        `${robotAPI.endpoints.robots}/${robotId}`,
        getRobotApiHandler(dispatch)
      );
    }
  }, [dispatch, foundRobot, robotId, robotAPI]);

  useEffect(() => {
    if (foundRobot) {
      setFormData(foundRobot);
    }
  }, [foundRobot]);

  const submit = (event) => {
    event.preventDefault();
    robotAPI.put(
      `${robotAPI.endpoints.update}?token=${token}`,
      getReplaceRobotApiHandler(dispatch),
      {
        body: formData,
      }
    );

    navigate("/home");
  };

  if (loading.current && timeOutInRenders.current === 4) {
    loading.current = false;
  }

  if (foundRobot) {
    loading.current = false;

    return (
      <>
        <Header current={4} texts={headerTexts} />
        <FormHolder>
          <RobotForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={submit}
            editing={true}
          />
        </FormHolder>
      </>
    );
  } else if (loading.current) {
    return <h1>LOADING</h1>;
  } else {
    return <NotFoundPage />;
  }
};

export default EditRobotPage;
