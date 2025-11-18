// src/store/index.ts
'use client' // 👈 REQUIRED for React Redux

import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './slices/exampleSlice'

export const store = configureStore({
  reducer: {
    example: exampleReducer, // must be an object of reducers
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
