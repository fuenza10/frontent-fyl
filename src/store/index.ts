// import { createStore, applyMiddleware, compose, configureStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer as reduxPersistReducer,
  persistStore,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
};
const persistReducer = reduxPersistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


