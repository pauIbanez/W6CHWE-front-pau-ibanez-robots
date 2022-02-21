import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";

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

  &:focus {
    border: 2px solid gray;
  }
`;

const DescriptionBox = styled.textarea`
  height: 300px;
  width: 800px;
  outline: none;
  border-radius: 30px;
  border: 1px solid gray;
  padding: 30px;
  font-size: 15px;
  font-family: inherit;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    border: 2px solid gray;
  }
`;

const ImageHolder = styled.div`
  position: relative;
  height: 360px;
  width: 350px;
`;

const ImagePlaceHolder = styled.div`
  border: 2px dashed gray;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  display: ${(props) => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  color: #696969;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: contain;
  border-radius: 50%;
`;

const FormFinal = styled.div`
  display: flex;
  height: 300px;
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

  &:hover {
    cursor: pointer;
    background-color: #696969;
    color: white;
  }
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ForemCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const RegisterForm = () => {
  const blankForm = {
    name: "",
    lastName: "",
    avatar: "",
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(blankForm);

  const [localImageUrl, setLocalImageUrl] = useState(formData.avatar);

  const [showingBackground, setShowingBackground] = useState(true);

  const setImageBackground = (mode) => {
    setShowingBackground(mode);
  };

  const onSubmit = (event) => {
    event.preventDefault();
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

  return (
    <Form onSubmit={onSubmit}>
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
        <DescriptionBox
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

      <FormRow>
        <ForemCol>
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
              alt="Robot"
              height="200"
              width="200"
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
        </ForemCol>

        <ForemCol>
          <InputThingy>
            <InputName htmlFor="universe">Universe</InputName>
            <TextInput
              type="text"
              name="universe"
              id="universe"
              value={formData.universe}
              onChange={updateData}
              autoComplete="off"
              placeholder="Robot universe..."
              required
            />
          </InputThingy>
        </ForemCol>
      </FormRow>
      <FormFinal>
        <SubmitButton>Register</SubmitButton>
      </FormFinal>
    </Form>
  );
};

export default RegisterForm;
