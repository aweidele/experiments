import { useContext } from "react";
import { DateContextProvider } from "./SelectedDateContext";
import { Datepicker } from "./Datepicker";
export function DatepickerWrapper() {
  return (
    <div className="relative">
      <DateContextProvider>
        <Datepicker />
      </DateContextProvider>
    </div>
  );
}
