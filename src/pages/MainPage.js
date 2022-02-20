import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header/Header";
import ListRobot from "../components/Robot/ListRobot";
import apiContext from "../contexts/apiContext";
import { getAllRobotsApiHandler } from "../utils/apiResultsHandlers";

const MainSection = styled.main`
  width: 100%;
`;

const PopularRobots = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 100px;
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  gap: 10px;

  h2 {
    margin: 0;
  }
  p {
    margin: 0;
  }
`;

const SectionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Footer = styled.footer`
  height: 300px;
  background-color: #252525;
`;

const MainPage = () => {
  const dispatch = useDispatch();
  const { robotAPI } = useContext(apiContext);
  const { robots } = useSelector((state) => state);

  useEffect(() => {
    if (robotAPI.ready) {
      robotAPI.getBody(
        robotAPI.endpoints.robots,
        getAllRobotsApiHandler(dispatch)
      );
    }
  }, [dispatch, robotAPI]);

  const popularRobots = robots.filter(({ popular }) => popular);

  const robotsToRender = popularRobots.map((robot, index) => (
    <ListRobot key={robot.id} robot={robot} flip={index % 2 === 0}></ListRobot>
  ));

  return (
    <>
      <Header video current={1} />
      <MainSection>
        <PopularRobots>
          <SectionTitle>
            <h2>Popular robots</h2>
            <p>
              Explore the most popular robots of the world! Some real, some
              fiction, all impressive pices of technology
            </p>
          </SectionTitle>
          <SectionList>{robotsToRender}</SectionList>
        </PopularRobots>
      </MainSection>
      <Footer>
        <h2>Footer here</h2>
      </Footer>
    </>
  );
};

export default MainPage;
