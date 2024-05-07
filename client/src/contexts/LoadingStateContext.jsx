import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const useStateContext = () => useContext(StateContext);

export const LoadingStateProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <StateContext.Provider value={{ loading, setLoading }}>
      {children}
    </StateContext.Provider>
  );
};
