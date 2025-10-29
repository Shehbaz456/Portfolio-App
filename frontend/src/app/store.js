import { configureStore } from '@reduxjs/toolkit';
import { portfolioApi } from './api/portfolioApi';

export const store = configureStore({
  reducer: {
    [portfolioApi.reducerPath]: portfolioApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(portfolioApi.middleware),
});
