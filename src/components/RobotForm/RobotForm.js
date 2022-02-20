import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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

const TagsSelector = styled.select`
  height: 50px;
  outline: none;
  border-radius: 50px;
  border: 1px solid gray;
  padding-left: 30px;
  width: 300px;
  font-size: 15px;

  &:focus {
    border: 2px solid gray;
    border-radius: 25px 25px 0 0;
  }
`;

const TagThingy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TagsShower = styled.div`
  height: 50px;
  border-radius: 10px;
  background-color: lightgray;
  width: 545px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  margin-top: 20px;
`;

const Tag = styled.div`
  padding: 7px;
  background-color: purple;
  border-radius: 5px;
  width: fit-content;
  height: 30px;
  color: white;
  display: flex;
  align-items: center;
  gap: 3px;
`;

const TagButton = styled.button`
  background-color: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: white;
  display: flex;
  justify: content: center;
  align-items: center;
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
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ForemCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
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

  const assesTag = (event) => {
    if (formData.tags.includes(event.target.value)) {
      const newTags = formData.tags.filter((tag) => tag !== event.target.value);
      const newFormData = {
        ...formData,
        tags: newTags,
      };
      setFormData(newFormData);
    } else {
      const newTags = [...formData.tags, event.target.value];
      const newFormData = {
        ...formData,
        tags: newTags,
      };
      setFormData(newFormData);
    }
  };

  const deleteTag = (tag) => {
    const mockEvent = {
      target: {
        value: tag,
      },
    };
    assesTag(mockEvent);
  };

  const tagsToRender = formData.tags.map((tag) => (
    <Tag key={tag}>
      {tag[0].toUpperCase() + tag.substring(1)}
      <TagButton
        onClick={(event) => {
          event.preventDefault();
          deleteTag(tag);
        }}
      >
        <FontAwesomeIcon icon={faXmark} />
      </TagButton>
    </Tag>
  ));

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
            placeholder="Robot name..."
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
            placeholder="Robot description..."
          />
        </InputThingy>

        <FormRow>
          <ForemCol>
            <InputThingy>
              <InputName htmlFor="image">Image</InputName>
              <TextInput
                type="text"
                name="image"
                id="image"
                value={formData.image}
                onChange={updateData}
                autoComplete="off"
                placeholder="Image url..."
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
              <ImagePlaceHolder>Input a valid image</ImagePlaceHolder>
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
              />
            </InputThingy>
            <TagThingy>
              <InputName htmlFor="image">Tags</InputName>
              <TagsSelector name="tags" id="tags" value="" onChange={assesTag}>
                <option value="">Select a Tag</option>
                <option value="real">Real</option>
                <option value="sentient">Sentient</option>
                <option value="humanoid">Humanoid</option>
                <option value="lifeLike">Life-like</option>
                <option value="spaceCraft">Space Craft</option>
              </TagsSelector>
              <TagsShower>{tagsToRender}</TagsShower>
            </TagThingy>
          </ForemCol>
        </FormRow>
        <FormFinal>
          <SubmitButton> Create! </SubmitButton>
        </FormFinal>
      </Form>
    </>
  );
};

export default RobotForm;