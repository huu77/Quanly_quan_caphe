import { configureStore } from "@reduxjs/toolkit";
import middleware from "./middleware";
import Reducer from "./reducer";

const store = configureStore({
  reducer: Reducer,
  middleware
});

export default store;
