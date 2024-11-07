import { createContext, useState } from "react";

export const DateContext = createContext();

export const SelectedDateContext = ({ children }) => {
  const [selectedStartDate, setSelectedStartDate] = useState("null");
  const [selectedEndDate, setSelectedEndDate] = useState("null");
  const [hoverEndDate, setHoverEndDate] = useState("null");

  return <DateContext.Provider value={{ selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate, hoverEndDate, setHoverEndDate }}>{children}</DateContext.Provider>;
};
