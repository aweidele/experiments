import { useState, createContext } from "react";
export const TestContext = createContext();
export const TestContextProvider = ({ children }) => {
  const [val, setVal] = useState(10);
  return <TestContext.Provider value={{ val, setVal }}>{children}</TestContext.Provider>;
};
