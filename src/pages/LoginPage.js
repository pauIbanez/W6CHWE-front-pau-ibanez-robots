import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header/Header";

const ContentHolder = styled.div`
  padding: 100px;
`;
const LoginPage = () => {
  const headerTexts = {
    title: "Enjoy all the user privileges",
    description: "Edit, delete and create as much robots as you want.",
  };

  return (
    <>
      <Header current={4} texts={headerTexts} />

      <ContentHolder>
        <h1>Log in</h1>
        <p>
          Don't have a user? <Link to="/users/register"> Register</Link>
        </p>
      </ContentHolder>
    </>
  );
};

export default LoginPage;
