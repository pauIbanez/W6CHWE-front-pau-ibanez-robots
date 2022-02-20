import { useEffect, useState } from "react";
import useAPI from "use-json-api-react";
import apiErrorHandler from "../utils/apiErrorHandler";
import apiContext from "./apiContext";

const apiURL = process.env.REACT_APP_API_URL;
const log = [];
const endpoints = {
  robots: "robots",
  robot: "robots",
  create: "robots/create",
  token: "token",
};

const ApiContextProvider = ({ children }) => {
  const apiManager = useAPI();

  const [robotAPI, setRobotAPI] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const createdRobotAPI = apiManager.createAPI(
      apiURL,
      apiErrorHandler(log),
      endpoints
    );

    createdRobotAPI.getBody(createdRobotAPI.endpoints.token, (result) => {
      if (result.ok) {
        setToken(result.body.token);
      }
    });

    setRobotAPI(createdRobotAPI);
  }, [apiManager]);

  const contextValue = {
    robotAPI,
    endpoints: endpoints.current,
    token,
  };
  return (
    <apiContext.Provider value={contextValue}>{children}</apiContext.Provider>
  );
};

export default ApiContextProvider;
