import styled from "styled-components";

const Video = styled.video`
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
`;

const MainPage = () => {
  return (
    <>
      <header>
        <Video autoPlay muted loop>
          <source src="./videos/presentation.mp4" type="video/mp4" />
        </Video>
      </header>
      <h1>Main page</h1>
    </>
  );
};

export default MainPage;
