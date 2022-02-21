import { useState } from "react";
import userContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const contextValue = { user, setUser };
  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};

export default UserContextProvider;
