// store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Proper initial state
const initialState = {
  
  user: null,


 
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "CLEAR_USER":
      return {
        ...initialState, // Reset to initial state
      };

     
    default:
      return state;
  }
  
};

const persistConfig = {
  key: "root",
  storage,

};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
