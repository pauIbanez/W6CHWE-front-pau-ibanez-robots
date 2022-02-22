import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const FormHolder = styled.div`
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
        <FormHolder>
          <RegisterForm allGood={allGood} />
        </FormHolder>
      ) : (
        <FormHolder>
          <h1>Nice!</h1>
          <p>Your user has been submitted! Now just one last step:</p>
          <p>
            You need to verify your email, to do so please check your inbox at
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </FormHolder>
      )}
    </>
  );
};

export default RegisterPage;
