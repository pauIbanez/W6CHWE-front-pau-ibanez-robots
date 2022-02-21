import { createContext } from "react";

const userContext = createContext();
userContext.displayName = "User context";

export default userContext;
