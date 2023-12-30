
import { configureStore, Store } from "@reduxjs/toolkit";
import sharedReducer from "./slices/sharedSlice";

const reducer = {
 
    shared: sharedReducer,
    
  };
  let store:Store;
  
  if (process.env.NODE_ENV === "production") {
    store = configureStore({
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
         
          serializableCheck: false,
        }),
      reducer,
      devTools: false, // disable redux store at production
    });
  } else {
    store = configureStore({
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
         
          serializableCheck: false,
        }),
      reducer,
      devTools: true, // Enable redux devtools on dev environment
    });
  }
  
  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  

  

  export type RootState = ReturnType<typeof store.getState>;
  export default store ;
  