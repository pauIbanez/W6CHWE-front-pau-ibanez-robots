import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import apiContext from "../../contexts/apiContext";
import { getRegisterUserApiHandler } from "../../utils/apiResultsHandlers";

const spacing = 200;
const avatarSize = 150;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const InputThingy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputBocata = styled.div`
  height: 50px;
  display: flex;
`;

const InputName = styled.label`
  font-size: 20px;
  font-weight: 600;
`;

const TextInput = styled.input`
  height: 50px;
  outline: none;
  border-radius: 50px;
  border: 1px solid gray;
  padding-left: 30px;
  width: 300px;
  font-size: 15px;

  ${(props) =>
    props.wrong
      ? "background-color:  rgba(255,0,0,0.3); border: 2px solid rgba(255,0,0,0.5);"
      : ""};

  &:focus {
    border: 2px solid gray;
  }
`;

const ImageHolder = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagePlaceHolder = styled.div`
  border: 2px dashed gray;
  border-radius: 50%;
  width: ${avatarSize}px;
  height: ${avatarSize}px;
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  color: #696969;
`;

const Image = styled.img`
  object-fit: fill;
  border-radius: 50%;
  border: 5px solid purple;
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

const FormRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing}px;
`;

const marKSize = 35;

const InvalidMark = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  height: 50px;
  width: 50px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  color: red;
  svg {
    height: ${marKSize}px;
    width: ${marKSize}px;
  }
`;

const FormCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const ImageRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  gap: ${spacing}px;
`;

const ErrorHolder = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  width: fit-content;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const RegisterForm = ({ allGood }) => {
  const blankForm = {
    name: "",
    lastName: "",
    avatar: "",
    email: "",
    username: "",
    password: "",
  };

  const baseWrongData = {
    email: false,
    username: false,
  };

  const [formData, setFormData] = useState(blankForm);
  const [wrongData, setWrongData] = useState(baseWrongData);
  const { robotAPI } = useContext(apiContext);
  const [isRepeatPasswordWrong, setIsRepeatPasswordWrong] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const checkPassword = useCallback(() => {
    const password = formData.password;

    if (password !== repeatPassword) {
      setIsRepeatPasswordWrong(true);
    } else {
      setIsRepeatPasswordWrong(false);
    }
  }, [formData.password, repeatPassword]);

  useEffect(() => {
    checkPassword();
  }, [checkPassword, formData.password]);

  const [localImageUrl, setLocalImageUrl] = useState(formData.avatar);
  const [showingBackground, setShowingBackground] = useState(true);
  const [showErros, setShowErrors] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const setImageBackground = (mode) => {
    setShowingBackground(mode);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (isRepeatPasswordWrong || showingBackground) {
      setErrorMessages(getErrorMessage(wrongData));
      setShowErrors(true);
      return;
    }
    setLoading(true);
    robotAPI.post(
      robotAPI.endpoints.register,
      getRegisterUserApiHandler(duplicatedData, allGood, formData.email),
      {
        body: formData,
      }
    );
  };

  const duplicatedData = (wrongDataField) => {
    setLoading(false);
    const newWrongData = { ...baseWrongData };
    const badFields = wrongDataField.split(" ");

    badFields.forEach((field) => {
      newWrongData[field] = true;
    });

    setWrongData(newWrongData);
    setErrorMessages(getErrorMessage(newWrongData));
    setShowErrors(true);
  };

  const updateData = (event) => {
    const newFormData = {
      ...formData,
      [event.target.id]: event.target.value,
    };
    if (event.target.id === "avatar") {
      setLocalImageUrl(event.target.value);
    }
    setFormData(newFormData);
  };

  const getErrorMessage = (badData) => {
    const errorMessages = [];
    if (isRepeatPasswordWrong) {
      errorMessages.push("Please make sure you inputed the correct password");
    }
    if (showingBackground) {
      errorMessages.push("Plase make sure your avatar is a valid image");
    }
    Object.entries(badData).forEach((entry) => {
      if (entry[1] && (entry[0] === "email" || entry[0] === "username")) {
        errorMessages.push(`A user alreay exists using this  ${entry[0]}`);
      }
    });

    return errorMessages.map((message) => (
      <ErrorMessage key={message}>{message}</ErrorMessage>
    ));
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormRow>
        <FormCol>
          <InputThingy>
            <InputName htmlFor="name">Name</InputName>
            <TextInput
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={updateData}
              autoComplete="off"
              placeholder="Your name..."
              required
            />
          </InputThingy>
          <InputThingy>
            <InputName htmlFor="lastName">Last Name</InputName>

            <TextInput
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={updateData}
              autoComplete="off"
              placeholder="Your last name..."
              required
            />
          </InputThingy>
          <InputThingy>
            <InputName htmlFor="email">Email</InputName>
            <InputBocata>
              <TextInput
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={updateData}
                autoComplete="off"
                placeholder="Your email..."
                required
                wrong={wrongData.email}
              ></TextInput>
              <InvalidMark show={wrongData.email}>
                <FontAwesomeIcon icon={faXmark} />
              </InvalidMark>
            </InputBocata>
          </InputThingy>
        </FormCol>
        <FormCol>
          <InputThingy>
            <InputName htmlFor="username">Username</InputName>
            <InputBocata>
              <TextInput
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={updateData}
                autoComplete="off"
                placeholder="Username..."
                required
                wrong={wrongData.username}
              />
              <InvalidMark show={wrongData.username}>
                <FontAwesomeIcon icon={faXmark} />
              </InvalidMark>
            </InputBocata>
          </InputThingy>
          <InputThingy>
            <InputName htmlFor="password">Password</InputName>
            <InputBocata>
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
              <InvalidMark show={wrongData.password}>
                <FontAwesomeIcon icon={faXmark} />
              </InvalidMark>
            </InputBocata>
          </InputThingy>
          <InputThingy>
            <InputName htmlFor="repeatPassword">Repeat password</InputName>
            <TextInput
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              onChange={(event) => {
                setRepeatPassword(event.target.value);
                checkPassword();
              }}
              autoComplete="off"
              placeholder="Repeat password..."
              required
              wrong={isRepeatPasswordWrong}
            />
            <InvalidMark icon={faXmark} />
          </InputThingy>
        </FormCol>
      </FormRow>
      <ImageRow>
        <InputThingy>
          <InputName htmlFor="avatar">Avatar</InputName>
          <TextInput
            type="text"
            name="avatar"
            id="avatar"
            value={formData.avatar}
            onChange={updateData}
            autoComplete="off"
            placeholder="Avatar url..."
            required
          />
        </InputThingy>
        <ImageHolder>
          <Image
            src={localImageUrl ? localImageUrl : formData.avatar}
            alt="Avatar"
            height={avatarSize.toString()}
            width={avatarSize.toString()}
            onError={(event) => {
              event.target.style.display = "none";
              setImageBackground(true);
            }}
            onLoad={(event) => {
              event.target.style.display = "block";
              setImageBackground(false);
            }}
          />
          <ImagePlaceHolder show={showingBackground} />
        </ImageHolder>
      </ImageRow>
      <ErrorHolder>{showErros && errorMessages}</ErrorHolder>

      <FormFinal>
        {!loading ? (
          <SubmitButton>Register</SubmitButton>
        ) : (
          <SubmitButton disabled>
            <div className="loader">Loading...</div>
          </SubmitButton>
        )}
      </FormFinal>
    </Form>
  );
};

export default RegisterForm;
