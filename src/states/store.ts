import { configureStore } from '@reduxjs/toolkit';
import { bookApiSlice } from './bookSlice/bookApi';
import { borrowApi } from './borrowSlice/borrowApi';

export const store = configureStore({
  reducer: {
    [bookApiSlice.reducerPath]: bookApiSlice.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      bookApiSlice.middleware,
      borrowApi.middleware
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
