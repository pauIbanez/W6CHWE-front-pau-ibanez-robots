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

  return (
    <>
      <Header current={4} texts={headerTexts} />
      <FormHolder>
        <RegisterForm />
      </FormHolder>
    </>
  );
};

export default RegisterPage;
