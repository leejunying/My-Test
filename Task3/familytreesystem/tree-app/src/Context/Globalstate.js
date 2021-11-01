import React from "react";
import { createContext, useState } from "react";

const UsersContext = createContext();
// Provide Context
export const UsersProvider = ({ children }) => {
  const [selected, setSelected] = useState({});
  return (
    <UsersContext.Provider value={{ selected, setSelected }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
