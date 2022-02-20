import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Navigation from "../components/Navigation/Navigation";
import ListRobot from "../components/Robot/ListRobot";
import RobotFilter from "../components/RobotFilter/RobotFilter";
import apiContext from "../contexts/apiContext";
import { getAllRobotsApiHandler } from "../utils/apiResultsHandlers";

const HeaderInfo = styled.div`
  background-color: #252525;
  margin-top: 50px;
  height: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 100px;
  color: white;
`;

const MainSection = styled.main`
  width: 100%;
`;

const AllRobots = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 100px;
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 200px;
  gap: 50px;

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

const AllRobotsPage = () => {
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

  const blankFilter = {
    query: "",
    tags: "",
  };

  const [filterData, setFilterData] = useState(blankFilter);
  const [robotsToRender, setRobotsToRender] = useState([]);
  const [filteredRobots, setFilteredRobots] = useState([]);

  const applyFilters = () => {
    if (filterData.query) {
      setFilteredRobots(
        robots.filter((robot) => {
          let match = false;
          let queries = filterData.query.toLowerCase().split(" ");

          Object.entries(robot).forEach((entry) => {
            if (typeof entry[1] === "boolean") {
              if (queries.includes(entry[0].toLowerCase())) {
                match = true;
              }
            } else if (typeof entry[1] === "string") {
              const words = entry[1].toLowerCase().split(" ");
              queries.forEach((queryWord) => {
                if (words.includes(queryWord)) {
                  match = true;
                }
              });
            }
          });
          return match;
        })
      );
    } else {
      setFilteredRobots([...robots]);
    }
  };
  useEffect(() => {
    setFilteredRobots([...robots]);
  }, [robots]);

  useEffect(() => {
    setRobotsToRender(
      filteredRobots.map((robot, index) => (
        <ListRobot
          key={robot.id}
          robot={robot}
          flip={index % 2 === 0}
        ></ListRobot>
      ))
    );
  }, [filteredRobots]);

  return (
    <>
      <header>
        <Navigation current={2} />
        <HeaderInfo>
          <h1>Robots!</h1>
          <p>Yes, Robots, we have them! Lots of them!</p>
        </HeaderInfo>
      </header>
      <MainSection>
        <AllRobots>
          <SectionInfo>
            <SectionTitle>
              <h2>All of our robots</h2>
              <p>
                Explore the all the robots we have at our collection. Some real,
                some fiction, all impressive pices of technology.
              </p>
            </SectionTitle>
            <RobotFilter
              filterData={filterData}
              setFilterData={setFilterData}
              applyFilters={applyFilters}
            />
          </SectionInfo>
          <SectionList>{robotsToRender}</SectionList>
        </AllRobots>
      </MainSection>
      <Footer>
        <h2>Footer here</h2>
      </Footer>
    </>
  );
};

export default AllRobotsPage;
