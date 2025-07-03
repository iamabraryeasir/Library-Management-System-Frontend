import { configureStore } from '@reduxjs/toolkit';
import { bookApiSlice } from './bookSlice/bookApi';

export const store = configureStore({
  reducer: {
    [bookApiSlice.reducerPath]: bookApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(bookApiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
