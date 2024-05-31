import { createSlice } from "@reduxjs/toolkit";
import { getAllApplicants, deleteApplicant } from "./handleRequests";
import { toast } from "react-toastify";

const initialState = {
  users: null,
  totalCount: 0,
  currentPage: 1,
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

    getUser: (state, { payload }) => {
      return state.users.find((user) => user.id === payload.id);
    },

    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteApplicant.fulfilled, (state, { payload }) => {
        state.users = state.users.filter((user) => user.id !== payload.id);
        state.totalCount = state.totalCount - 1;
        toast.success(payload.data.message);
      })
      .addCase(deleteApplicant.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    builder
      .addCase(getAllApplicants.pending, (state, { payload }) => {
        state.users = null;
      })
      .addCase(getAllApplicants.fulfilled, (state, { payload }) => {
        state.users = payload.data.list;
        state.totalCount = payload.data.totalCount;
        toast.success(payload.message);
      })
      .addCase(getAllApplicants.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});

export const { updateUser, getUser, setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
