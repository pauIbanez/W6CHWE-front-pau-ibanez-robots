import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  width: 350px;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #696969;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

const RobotForm = ({ formData, setFormData, onSubmit }) => {
  const localImageUrl = useRef(formData.image);

  const updateData = (event) => {
    const newFormData = {
      ...formData,
      [event.target.id]: event.target.value,
    };
    if (event.target.id === "image") {
      localImageUrl.current = event.target.value;
    }
    setFormData(newFormData);
  };

  return (
    <>
      <h2>Upload robot form</h2>
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
          />
        </InputThingy>
        <InputThingy>
          <InputName htmlFor="description">Description</InputName>
          <DescriptionBox
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={updateData}
            autoComplete="off"
          />
        </InputThingy>
        <InputThingy>
          <InputName htmlFor="universe">Universe</InputName>
          <TextInput
            type="text"
            name="universe"
            id="universe"
            value={formData.universe}
            onChange={updateData}
            autoComplete="off"
          />
        </InputThingy>
        <InputThingy>
          <InputName htmlFor="image">Image</InputName>
          <TextInput
            type="text"
            name="image"
            id="image"
            value={formData.image}
            onChange={updateData}
            autoComplete="off"
          />
        </InputThingy>
        <ImageHolder>
          <Image
            src={localImageUrl.current}
            alt="Robot"
            height="360"
            width="350"
            onError={(event) => {
              event.target.style.display = "none";
            }}
            onLoad={(event) => {
              event.target.style.display = "block";
            }}
          />
          <ImagePlaceHolder>Input a valid image url</ImagePlaceHolder>
        </ImageHolder>
      </Form>
    </>
  );
};

export default RobotForm;
