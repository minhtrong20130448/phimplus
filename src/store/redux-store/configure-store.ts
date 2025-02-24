import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { middleware, sagaMiddleware } from "./middleware";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const _configureStore = () => {
  const _store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // true is default for all
        thunk: false,
        immutableCheck: true,
        serializableCheck: false,
        actionCreatorCheck: true,
      }).concat(middleware),
  });
  sagaMiddleware.run(rootSaga);
  return _store;
};

const reduxStore = _configureStore() // exported this instead;

export default reduxStore;

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

/* hooks - use throughout your app instead of plain `useDispatch` and `useSelector` */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
