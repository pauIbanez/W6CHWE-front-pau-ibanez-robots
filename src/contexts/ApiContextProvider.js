import { useEffect, useRef, useState } from "react";
import useAPI from "use-json-api-react";
import apiErrorHandler from "../utils/apiErrorHandler";
import apiContext from "./apiContext";

const apiURL = process.env.REACT_APP_API_URL;
const log = [];

const ApiContextProvider = ({ children }) => {
  const endpoints = useRef({
    robots: "robots",
    create: "robots/create",
    token: "token",
  });
  const apiManager = useAPI();

  const [robotAPI, setRobotAPI] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const createdRobotAPI = apiManager.createAPI(apiURL, apiErrorHandler(log));

    createdRobotAPI.getBody(endpoints.current.token, (result) => {
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
