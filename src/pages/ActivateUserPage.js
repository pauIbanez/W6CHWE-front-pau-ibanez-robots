import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header/Header";
import apiContext from "../contexts/apiContext";
import { getActivateUserApiHandler } from "../utils/apiResultsHandlers";
import LoadingPage from "./LoadingPage";
import NotFoundPage from "./NotFoundPage";

const ContentHolder = styled.div`
  padding: 100px;
`;

const ActivateUserPage = () => {
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const { robotAPI } = useContext(apiContext);

  const updateFound = (userFound) => {
    setLoading(false);
    setFound(userFound);
  };

  useEffect(() => {
    if (robotAPI.ready) {
      const activationToken = window.location.pathname.split("/")[3];
      robotAPI.getBody(
        `${robotAPI.endpoints.activate}${activationToken}`,
        getActivateUserApiHandler(updateFound)
      );
    }
  }, [robotAPI]);

  const getNotFoundContent = () => {
    if (loading) {
      return <LoadingPage />;
    }
    return <NotFoundPage />;
  };
  return (
    <>
      {found ? (
        <>
          <Header current={4} />
          <ContentHolder>
            <h1>User activated!</h1>
            <p>Your user has been activated!</p>
            <p>
              Now if you want to enjoy the user privileges please follow this
              link to <Link to="/users/login">Log in</Link>
            </p>
          </ContentHolder>
        </>
      ) : (
        getNotFoundContent()
      )}
    </>
  );
};

export default ActivateUserPage;
