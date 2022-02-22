import { useContext, useState } from "react";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import apiContext from "../../contexts/apiContext";
import { getLoginUserApiHandler } from "../../utils/apiResultsHandlers";
import userContext from "../../contexts/userContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  gap: 50px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 200px;
`;

const FormCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const InputThingy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextInput = styled.input`
  height: 50px;
  outline: none;
  border-radius: 50px;
  border: 1px solid gray;
  padding-left: 30px;
  width: 300px;
  font-size: 15px;

  &:focus {
    border: 2px solid gray;
  }
`;

const InputName = styled.label`
  font-size: 20px;
  font-weight: 600;
`;

const FormFinal = styled.div`
  display: flex;
  height: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SubmitButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: #f8f9fb;
  border: 1px solid gray;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    ${(props) =>
      props.disabled || "background-color: purple; cursor: pointer;"};
    color: white;
  }
`;

const ErrorHolder = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: fit-content;
  color: red;
`;

const LoginForm = () => {
  const blankForm = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(blankForm);
  const [loading, setLoading] = useState(false);
  const [showErros, setShowErrors] = useState(false);
  const { robotAPI } = useContext(apiContext);
  const { fetchUser } = useContext(userContext);
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    robotAPI.postBody(
      robotAPI.endpoints.login,
      getLoginUserApiHandler(onResponse),
      {
        headers: new Headers({
          Authorization:
            "Basic " +
            Buffer.from(
              `${formData.username}:${formData.password}`,
              "utf-8"
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }
    );
  };

  const onResponse = (ok) => {
    setLoading(false);
    if (ok) {
      window.localStorage.setItem("username", formData.username);
      navigate("/home");
      fetchUser();
      return;
    }
    setShowErrors(true);
  };

  const updateData = (event) => {
    const newFormData = {
      ...formData,
      [event.target.id]: event.target.value,
    };
    setFormData(newFormData);
  };

  return (
    <Form onSubmit={submit}>
      <FormRow>
        <FormCol>
          <InputThingy>
            <InputName htmlFor="username">Username</InputName>
            <TextInput
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={updateData}
              autoComplete="off"
              placeholder="Username..."
              required
            />
          </InputThingy>
        </FormCol>
        <FormCol>
          <InputThingy>
            <InputName htmlFor="username">Password</InputName>
            <TextInput
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={updateData}
              autoComplete="off"
              placeholder="Password..."
              required
            />
          </InputThingy>
        </FormCol>
      </FormRow>
      <ErrorHolder>
        {showErros && <p>Username or password wrong</p>}
      </ErrorHolder>
      <FormFinal>
        {!loading ? (
          <SubmitButton>Login</SubmitButton>
        ) : (
          <SubmitButton disabled>
            <div className="loader">Loading...</div>
          </SubmitButton>
        )}
      </FormFinal>
    </Form>
  );
};

export default LoginForm;
