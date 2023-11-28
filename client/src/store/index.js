import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware());

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

export default store;
