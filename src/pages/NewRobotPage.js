import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import RobotForm from "../components/RobotForm/RobotForm";

const FormHolder = styled.div`
  padding: 100px;
`;
const NewRobotPage = () => {
  const headerTexts = {
    title: "Upload a Robot!",
    description: "Fill the form bellow to upload your own robot!",
  };

  const blankForm = {
    name: "",
    description: "",
    image: "",
    universe: "",
    tags: [],
  };

  const [formData, setFormData] = useState(blankForm);

  const submit = () => {};

  return (
    <>
      <Header current={3} texts={headerTexts} />
      <FormHolder>
        <RobotForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={submit}
        />
      </FormHolder>
    </>
  );
};

export default NewRobotPage;
