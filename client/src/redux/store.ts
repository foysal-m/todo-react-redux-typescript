import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todosApiSlice } from "../todosApi/todosApiSlice";

export const store = configureStore({
  reducer: {
    [todosApiSlice.reducerPath]: todosApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(todosApiSlice.middleware), // catcing functionalities and benefits of redux toolkit provide by default
});

setupListeners(store.dispatch);
