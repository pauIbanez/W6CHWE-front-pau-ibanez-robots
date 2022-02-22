import { useEffect, useState } from "react";
import useAPI from "use-json-api-react";
import apiErrorHandler from "../utils/apiErrorHandler";
import apiContext from "./apiContext";

const apiURL = process.env.REACT_APP_API_URL;
const log = [];
const endpoints = {
  robots: "robots",
  create: "robots/create",
  delete: "robots/delete",
  update: "robots/update",
  register: "users/register",
  activate: "users/activate/",
  login: "users/login",
  userData: "users/user",
};

const ApiContextProvider = ({ children }) => {
  const apiManager = useAPI();

  const [robotAPI, setRobotAPI] = useState({});

  useEffect(() => {
    const createdRobotAPI = apiManager.createAPI(
      apiURL,
      apiErrorHandler(log),
      endpoints
    );

    setRobotAPI(createdRobotAPI);
  }, [apiManager]);

  const contextValue = {
    robotAPI,
  };
  return (
    <apiContext.Provider value={contextValue}>{children}</apiContext.Provider>
  );
};

export default ApiContextProvider;
