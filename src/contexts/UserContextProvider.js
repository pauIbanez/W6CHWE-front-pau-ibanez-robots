import userContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const contextValue = {};

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};

export default UserContextProvider;
