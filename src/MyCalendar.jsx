import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";

export const MyCalendar = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};
