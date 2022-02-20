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

const InfoHolder = styled.main`
  display: flex;
  flex-direction: column;
`;

const ErrorCode = styled.h2`
  font-size: 100px;
  margin: 0;
`;

const ErrorInfo = styled.h1`
  margin: 0;
`;

const NotFoundPage = () => {
  return (
    <PageHolder>
      <InfoHolder>
        <ErrorCode>404</ErrorCode>
        <ErrorInfo>Page not found</ErrorInfo>
      </InfoHolder>
      <img
        width="582"
        height="479"
        src="./img/notFound.png"
        alt="sad robot, page not found"
      />
    </PageHolder>
  );
};

export default NotFoundPage;
