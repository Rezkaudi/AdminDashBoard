import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      const index = state.users.findIndex((user) => user.id === payload.id);

      if (index !== -1) {
        state.users[index] = payload;
      }
    },

    deleteUser: (state, { payload }) => {
      state.users = state.users.filter((user) => user.id !== payload.id);
    },

    getUser: (state, { payload }) => {
      return state.users.find((user) => user.id === payload.id);
    },

    getAllUsers: (state, { payload }) => {
      console.log(payload)
      state.users = payload
      // return (state.users = payload);
    },
  },
});

export const { updateUser, deleteUser, getUser, getAllUsers } =
  usersSlice.actions;
export default usersSlice.reducer;
