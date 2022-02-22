import { useCallback, useContext, useEffect, useState } from "react";
import { getUserDataApiHandler } from "../utils/apiResultsHandlers";
import apiContext from "./apiContext";
import userContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const { robotAPI } = useContext(apiContext);

  const fetchUser = useCallback(() => {
    if (robotAPI.ready) {
      const token = window.localStorage.getItem("token");
      const username = window.localStorage.getItem("username");
      if (token) {
        robotAPI.postBody(
          robotAPI.endpoints.userData,
          getUserDataApiHandler(onResponse),
          {
            body: {
              username,
              token,
            },
          }
        );
      }
    }
  }, [robotAPI]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  const onResponse = (userData) => {
    setUser(userData.user);
  };

  const contextValue = { user, setUser, fetchUser };
  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};

export default UserContextProvider;
