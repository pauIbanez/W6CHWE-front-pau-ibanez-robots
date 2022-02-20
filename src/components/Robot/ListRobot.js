import styled from "styled-components";
import propTypes from "prop-types";

const RobotHolder = styled.li`
  position: relative;
  height: 400px;
  border-top: 1px solid #6e6e6e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  z-index: 0;
`;

const RobotImage = styled.img`
  height: 360px;
  max-width: 400px;
  object-fit: contain;
`;

const RobotInfo = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 80%;
  width: 50%;
  gap: 10px;
  padding: 10px 0;

  h4,
  p,
  h3 {
    margin: 0;
  }
  h3 {
    margin-bottom: 10px;
  }
`;

const TagHolder = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
`;

const Tag = styled.p`
  background-color: purple;
  color: white;
  border-radius: 10px;
  padding: 5px;
  width: fit-content;
`;

const InfoItem = styled.p`
  overflow-y: scroll;
  background-color: #ebebeb;
  border-radius: 10px;
  padding: 5px;
  width: fit-content;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListRobot = ({ robot, flip = false }) => {
  const tagsToRender = robot.tags.map((tag) => (
    <Tag>{tag[0].toUpperCase() + tag.substring(1)}</Tag>
  ));

  const RobotInfoComp = () => (
    <RobotInfo data-testid="robotinfo">
      <h3>{robot.name}</h3>
      <h4>Universe:</h4>
      <InfoItem>{robot.universe}</InfoItem>
      <h4>Description:</h4>
      <InfoItem>{robot.description}</InfoItem>
      <TagHolder>{tagsToRender}</TagHolder>
    </RobotInfo>
  );

  const RobotImageComp = () => (
    <RobotImage src={robot.image} alt="Robot Image" height="360" width="350" />
  );
  return (
    <RobotHolder>
      {flip ? (
        <>
          <RobotInfoComp />
          <RobotImageComp />
        </>
      ) : (
        <>
          <RobotImageComp />
          <RobotInfoComp />
        </>
      )}
    </RobotHolder>
  );
};

ListRobot.propTypes = {
  robot: propTypes.object.isRequired,
  flip: propTypes.bool,
};

export default ListRobot;
