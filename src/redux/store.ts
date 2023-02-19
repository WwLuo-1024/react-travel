import { createStore } from "redux";
import languageReducer from "./languageReducer";

const store = createStore(languageReducer);

export default store;