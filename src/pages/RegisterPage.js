import styled from "styled-components";
import Header from "../components/Header/Header";

const FormHolder = styled.div`
  padding: 100px;
`;
const RegisterPage = () => {
  const headerTexts = {
    title: "Join We Robot!",
    description: "Fill the form bellow to create your own user",
  };

  const blankForm = {
    name: "",
    lastName: "",
    avatar: "",
    username: "",
    password: "",
  };

  return (
    <>
      <Header current={4} texts={headerTexts} />
      <FormHolder></FormHolder>
    </>
  );
};

export default RegisterPage;
