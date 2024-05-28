import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload; // Correctly set the token in the state
    },
    
    deleteToken: (state) => {
      state.token = null; // Remove the token from the state
    },
    
    getToken: (state) => {
      return state.token; // Return the current token
    },
  },
});

export const { setToken, deleteToken, getToken } = tokenSlice.actions;
export default tokenSlice.reducer;