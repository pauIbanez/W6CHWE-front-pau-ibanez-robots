import styled from "styled-components";
import Navigation from "../Navigation/Navigation";
import PropTypes from "prop-types";

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
      ? "position: aboslute; margin-top: 700px;"
      : "margin-top: 50px;"}
  background-color: #252525;
  height: 400px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 100px;
  color: white;
`;

const Title = styled.h1`
  color: white;
`;

const Header = ({ current, texts = null, video = false }) => {
  return (
    <header>
      <Navigation current={current} />
      {video && (
        <Video autoPlay muted loop>
          <source src="https://imgur.com/rV8zNP8.mp4" type="video/mp4" />
        </Video>
      )}
      <HeaderInfo video={video}>
        <Title>{texts ? texts.title : "Robots!"}</Title>
        <p>
          {texts
            ? texts.description
            : "Yes, Robots, we have them! Lots of them!"}
        </p>
      </HeaderInfo>
    </header>
  );
};

Header.propTypes = {
  current: PropTypes.number.isRequired,
  video: PropTypes.bool,
  texts: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default Header;
