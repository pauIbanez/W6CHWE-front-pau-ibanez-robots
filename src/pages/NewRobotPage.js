import { useState } from "react";
import Header from "../components/Header/Header";
import RobotForm from "../components/RobotForm/RobotForm";

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
    apperances: [],
  };

  const [formData, setFormData] = useState(blankForm);

  const submit = () => {};

  return (
    <>
      <Header current={3} texts={headerTexts} />
      <RobotForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={submit}
      />
    </>
  );
};

export default NewRobotPage;
