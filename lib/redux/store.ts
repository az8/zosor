import { configureStore } from '@reduxjs/toolkit'
import sharedReducer from "./slices/sharedSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      shared: sharedReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']