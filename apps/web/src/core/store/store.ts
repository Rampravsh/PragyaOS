import { configureStore, combineReducers } from '@reduxjs/toolkit';

// CombineReducers is configured empty as feature slices are not yet defined.
const rootReducer = combineReducers({});

/**
 * Configure Redux Store with an empty rootReducer and standard middleware.
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
