import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Redux combineReducers requires at least one reducer slice.
// We configure a dummy metadata slice that will be replaced in future feature prompts.
const rootReducer = combineReducers({
  _metadata: (state = { initialized: true }) => state,
});

/**
 * Configure Redux Store with rootReducer and standard middleware.
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Sensible defaults for serializability validation
        ignoredActions: [],
        ignoredPaths: [],
      },
    }),
});

// RootState and AppDispatch types derived from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
