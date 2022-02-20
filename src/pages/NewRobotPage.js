import Header from "../components/Header/Header";

const NewRobotPage = () => {
  const headerTexts = {
    title: "Upload a Robot!",
    description: "Fill the form bellow to upload your own robot!",
  };
  return <Header current={3} texts={headerTexts} />;
};

export default NewRobotPage;
