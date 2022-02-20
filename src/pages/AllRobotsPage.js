import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header/Header";
import ListRobot from "../components/Robot/ListRobot";
import RobotFilter from "../components/RobotFilter/RobotFilter";
import apiContext from "../contexts/apiContext";
import { getAllRobotsApiHandler } from "../utils/apiResultsHandlers";

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
  height: 300px;
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
  display: flex;
  flex-direction: column;
  gap: 20px;
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
  };

  const [filterData, setFilterData] = useState(blankFilter);
  const [robotsToRender, setRobotsToRender] = useState([]);
  const [filteredRobots, setFilteredRobots] = useState([]);

  const applyFilters = useCallback(() => {
    if (filterData.query) {
      setFilteredRobots(
        robots.filter((robot) => {
          let match = false;
          const queries = filterData.query.toLowerCase().split(" ");

          const words = [];
          Object.entries(robot).forEach((entry) => {
            if (typeof entry[1] === "string") {
              words.push(...entry[1].toLowerCase().split(" "));
            }
          });
          const massiveWordArray = [...words, ...robot.tags];

          queries.forEach((queryWord) => {
            if (massiveWordArray.includes(queryWord)) {
              match = true;
            }
          });
          return match;
        })
      );
    } else {
      setFilteredRobots([...robots]);
    }
  }, [filterData.query, robots]);

  useEffect(() => {
    setFilteredRobots([...robots]);
  }, [robots]);

  useEffect(() => {
    if (filterData.query === "") {
      applyFilters();
    }
  }, [applyFilters, filterData.query]);

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
      <Header current={2} />
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
