import { configureStore } from "@reduxjs/toolkit";
import modal from "../features/modal";
import calendar from "../features/calendar";

export const store = configureStore({
  reducer: {
    modal,
    calendar,
  },
});
