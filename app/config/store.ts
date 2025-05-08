/* eslint-disable @typescript-eslint/no-unused-vars */
import storage from "redux-persist/lib/storage";
import { rootReducer } from "@/features/rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import App from "next/app";

//how and where to store the state
export const persistConfig = {
  key: "app",
  storage,
};
//
const persistedReducer = persistReducer(persistConfig, rootReducer);
const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  })
  const persistor = persistStore(store);
  return {store, persistor};
}

export type Appstore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<Appstore['getState']>;
export type AppDispatch = Appstore['dispatch'];
export default makeStore;
