import { createSlice } from "@reduxjs/toolkit";
import {
  getAllApplicants,
  deleteApplicant,
  getResentUsers,
  getUser,
} from "./handleRequests";
import { toast } from "react-toastify";

// {
//   "id": "882d5807-2ecb-4f35-82d4-5932c771aad5",
//   "email": "ismaeladra250@gmail.com",
//   "firstName": "Ismael",
//   "lastName": "Adra",
//   "isGoogleUser": null,
//   "isAppleUser": null,
//   "isLinkedInUser": null,
//   "image": "image url updated",
//   "phone": "+963932078097",
//   "verifiedAt": "2024-04-19T09:00:52.000Z",
//   "createdAt": "2024-04-19T08:59:54.000Z"
// }

const initialState = {
  users: null,
  recentUsers: null,
  findUser: null,
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

    builder
      .addCase(getResentUsers.pending, (state, { payload }) => {
        state.recentUsers = null;
      })
      .addCase(getResentUsers.fulfilled, (state, { payload }) => {
        state.recentUsers = payload.data.list;
        toast.success(payload.message);
      })
      .addCase(getResentUsers.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    builder
      .addCase(getUser.pending, (state, { payload }) => {
        state.findUser = null;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.findUser = payload.data;
        toast.success(payload.message);
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});

export const { updateUser, setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
