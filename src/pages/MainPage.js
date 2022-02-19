import styled from "styled-components";

const Video = styled.video`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const NavMenu = styled.nav`
  width: 100%;
  height: 100px;
  position: fixed;
  top: 0;
  background-color: gray;
`;

const HeaderInfo = styled.div`
  position: aboslute;
  background-color: gray;
  height: 400px;
  margin-top: 600px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 100px;
`;

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

const RobotStyle = styled.li`
  height: 300px;
  border-top: 1px solid gray;
`;

const Footer = styled.footer`
  height: 300px;
  background-color: gray;
`;

const MainPage = () => {
  return (
    <>
      <header>
        <NavMenu></NavMenu>
        <Video autoPlay muted loop>
          <source src="./videos/presentation.mp4" type="video/mp4" />
        </Video>
        <HeaderInfo>
          <h1>Robots!</h1>
          <p>Yes, Robots, we have them! Lots of them!</p>
        </HeaderInfo>
      </header>
      <MainSection>
        <PopularRobots>
          <SectionTitle>
            <h2>Popular robots</h2>
            <p>
              Explore the most popular robots of the world! Some real, some
              fiction, all impressive pices of technology
            </p>
          </SectionTitle>
          <SectionList>
            <RobotStyle></RobotStyle>
            <RobotStyle></RobotStyle>
            <RobotStyle></RobotStyle>
            <RobotStyle></RobotStyle>
          </SectionList>
        </PopularRobots>
      </MainSection>
      <Footer>
        <h2>Footer here</h2>
      </Footer>
    </>
  );
};

export default MainPage;
