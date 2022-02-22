import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import LoginRequired from "../components/LogInRequired/LoginRequired";
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
  const { robotAPI } = useContext(apiContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(blankForm);
  const token = window.localStorage.getItem("token");

  const submit = (event) => {
    event.preventDefault();

    robotAPI.postBody(
      robotAPI.endpoints.create,
      getCreateRobotApiHandler(dispatch),
      {
        body: {
          robot: formData,
          token,
        },
      }
    );
    navigate("/home");
  };

  return (
    <>
      <Header current={3} texts={headerTexts} />
      {token ? (
        <FormHolder>
          <RobotForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={submit}
          />
        </FormHolder>
      ) : (
        <LoginRequired />
      )}
      <Footer />
    </>
  );
};

export default NewRobotPage;
