import { configureStore } from "@reduxjs/toolkit";
import Calculator from "../features/calculator";

const store = configureStore({
  reducer: { Calculator },
});

export default store;
