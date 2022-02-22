import styled from "styled-components";

const PageHolder = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  background-color: #252525;
  color: white;
`;

const Title = styled.h1`
  margin: 0;
`;

const LoadingPage = () => {
  return (
    <PageHolder>
      <Title>Loading</Title>
    </PageHolder>
  );
};

export default LoadingPage;
