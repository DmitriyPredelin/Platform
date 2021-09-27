import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import contextMenuReducer from "./contextMenuReducer";
import formReducer from "./formReducer";
import keyReducer from "./keyReducer";
import menuReducer from "./menuReducer";

const rootReducer = combineReducers({
  keyReducer: keyReducer,
  menuReducer: menuReducer,
  formReducer: formReducer,
  contextMenuReducer: contextMenuReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
