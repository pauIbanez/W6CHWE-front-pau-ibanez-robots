import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header/Header";
import apiContext from "../contexts/apiContext";
import {
  getDeleteRobotApiHandler,
  getRobotApiHandler,
} from "../utils/apiResultsHandlers";
import NotFoundPage from "./NotFoundPage";

const Details = styled.div`
  margin: 60px;
  padding: 40px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #252525;
  gap: 10px;
  color: white;

  h2 {
    margin: 0;
  }
  p {
    margin: 0;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

const RobotImage = styled.img`
  object-fit: contain;
  margin: 0 auto;
`;

const InfoTitle = styled.h3`
  font-size: 30px;
`;

const InfoInfo = styled.p`
  font-size: 20px;
`;

const TagHolder = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
  gap: 20px;
`;

const Tag = styled.p`
  background-color: purple;
  color: white;
  border-radius: 10px;
  height: 70px;
  padding: 5px;
  width: fit-content;
  display: flex;
  min-width: 150px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Controls = styled.section`
  display: flex;
  height: 100px;
  background-color: #252525;
  margin: 60px;
  padding: 40px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-around;
`;

const ControllButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: transparent;
  color: white;
  border: 1px solid gray;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.delete ? "red" : "purple")};
  }
`;

const PopUp = styled.div`
  box-shadow: 0 0 5px 0 rgba(255, 255, 255, 0.5);
  padding: 30px;
  border-radius: 10px;
  width: 600px;
  height: 300px;
  color: white;
  background-color: #252525;
  z-index: 2;
`;

const AlertContainer = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

const Alert = styled.p`
  font-size: 25px;
  font-weight: 600;
`;

const AlertControls = styled.section`
  display: flex;
  height: 100px;
  background-color: #252525;
  padding: 40px;
  margin-top: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-around;
`;

const RobotDetailsPage = () => {
  const { robotAPI, token } = useContext(apiContext);
  const { robots } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const robotId = window.location.pathname.split("/")[2];
  const foundRobot = robots.find((robot) => robot.id === robotId);
  const loading = useRef(true);
  const [activePopup, setActivePopup] = useState(false);

  useEffect(() => {
    if (robotAPI.ready && !foundRobot) {
      robotAPI.getBody(
        `${robotAPI.endpoints.robots}/${robotId}`,
        getRobotApiHandler(dispatch)
      );
    }
  }, [dispatch, foundRobot, robotId, robotAPI]);

  const texts = {
    title: "Robot details",
    description: "Learn all about your favourite robot!",
  };

  const togglePopup = () => {
    setActivePopup(!activePopup);
  };

  const deleteRobot = (event) => {
    event.stopPropagation();
    robotAPI.deleteBody(
      `${robotAPI.endpoints.delete}/${robotId}?token=${token}`,
      getDeleteRobotApiHandler(dispatch, robotId)
    );
    navigate("/home");
  };

  const gotoEdit = () => {
    window.location.href = "/robot/edit/" + robotId;
  };

  if (foundRobot) {
    loading.current = false;
    const tags = foundRobot.tags.map((tag) => (
      <Tag key={tag}>{tag[0].toUpperCase() + tag.substring(1)}</Tag>
    ));

    return (
      <>
        <Header current={4} texts={texts} />
        <Details>
          <h2>{foundRobot.name}</h2>
          <InfoTitle>Description</InfoTitle>
          <InfoInfo>{foundRobot.description}</InfoInfo>
          <ImageContainer>
            <RobotImage
              src={foundRobot.image}
              alt="RobotImage"
              height="500"
              width="600"
            />
          </ImageContainer>
          <InfoTitle>Universe</InfoTitle>
          <InfoInfo>{foundRobot.universe}</InfoInfo>

          <InfoTitle>Tags</InfoTitle>
          <TagHolder>{tags}</TagHolder>
        </Details>
        <Controls>
          <ControllButton onClick={gotoEdit}>Edit Robot</ControllButton>
          <ControllButton delete={true} onClick={togglePopup}>
            Delete Robot
          </ControllButton>
        </Controls>
        <AlertContainer active={activePopup} onClick={togglePopup}>
          <PopUp>
            <Alert>Are you sure you want to delete this robot?</Alert>
            <p> This action can not be undone</p>
            <AlertControls>
              <ControllButton onClick={togglePopup}>No, go back</ControllButton>
              <ControllButton delete={true} onClick={deleteRobot}>
                Yes, delete Robot
              </ControllButton>
            </AlertControls>
          </PopUp>
        </AlertContainer>
      </>
    );
  } else {
    return <NotFoundPage />;
  }
};

export default RobotDetailsPage;
