import { Link } from "react-router-dom";
import styled from "styled-components";

const ContentHolder = styled.div`
  padding: 100px;
`;

const LoginRequired = () => {
  return (
    <ContentHolder>
      <h1>Oops! Looks like you are not logged in</h1>
      <p>You can't create or edit robots without being logged in!</p>
      <p>
        Please <Link to="/users/login">Log in</Link>, and if you don't have a
        user, just <Link to="/users/register">Register</Link>
      </p>
    </ContentHolder>
  );
};

export default LoginRequired;
