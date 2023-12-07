import {configureStore} from '@reduxjs/toolkit';
import api from '../api';
import colorSchemeReducer from './color-scheme-reducer';

const store = configureStore({
  reducer: {
    colorScheme: colorSchemeReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat([api.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
