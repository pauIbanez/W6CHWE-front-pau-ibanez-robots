import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "../components/Header/Header";
import RobotForm from "../components/RobotForm/RobotForm";
import apiContext from "../contexts/apiContext";
import { getCreateRobotApiHandler } from "../utils/apiResultsHandlers";

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
  const { robotAPI, token } = useContext(apiContext);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(blankForm);

  const submit = (event) => {
    event.preventDefault();
    robotAPI.postBody(
      `${robotAPI.endpoints.create}?token=${token}`,
      getCreateRobotApiHandler(dispatch),
      {
        body: formData,
      }
    );
  };

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
