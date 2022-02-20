import styled from "styled-components";
import Navigation from "../Navigation/Navigation";

const Video = styled.video`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const HeaderInfo = styled.div`
  ${(props) =>
    props.video
      ? `position: aboslute; 
      margin-top: 600px;`
      : "margin-top: 50px;"}
  background-color: #252525;
  height: 400px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 100px;
  color: white;
`;

const Header = ({ video = false, current }) => {
  return (
    <header>
      <Navigation current={current} />
      {video && (
        <Video autoPlay muted loop>
          <source src="https://imgur.com/rV8zNP8.mp4" type="video/mp4" />
        </Video>
      )}
      <HeaderInfo video={video}>
        <h1>Robots!</h1>
        <p>Yes, Robots, we have them! Lots of them!</p>
      </HeaderInfo>
    </header>
  );
};

export default Header;
