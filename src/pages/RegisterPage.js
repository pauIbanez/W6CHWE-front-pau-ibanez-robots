import { useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const ContentHolder = styled.div`
  padding: 100px;
`;
const RegisterPage = () => {
  const headerTexts = {
    title: "Join We Robot!",
    description: "Fill the form bellow to create your own user",
  };

  const [compleated, setCompleated] = useState(false);
  const [email, setEmail] = useState("");
  const allGood = (email) => {
    setCompleated(true);
    setEmail(email);
  };

  return (
    <>
      <Header current={4} texts={headerTexts} />
      {!compleated ? (
        <ContentHolder>
          <RegisterForm allGood={allGood} />
        </ContentHolder>
      ) : (
        <ContentHolder>
          <h1>Verification email sent!</h1>
          <p>Your user has been submitted! Now just one last step:</p>
          <p>A verification email has been sent to:</p>
          <a href={`mailto:${email}`}>{email}</a>
          <p>Please check your inbox and stary enjoying We Robot at the max!</p>
        </ContentHolder>
      )}
      <Footer />
    </>
  );
};

export default RegisterPage;
