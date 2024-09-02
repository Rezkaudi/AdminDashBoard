import { createSlice } from "@reduxjs/toolkit";
import {
  getAllApplicants,
  deleteApplicant,
  getResentUsers,
  getUser,
  editUser,
  getAllApplicantInfo,
  getUserCv
} from "./handleRequests";
import { toast } from "react-toastify";

const initialState = {
  users: null,
  recentUsers: null,
  findUser: null,
  fullUserInfo: null,
  requestState: true,
  userCv:null,
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
      .addCase(deleteApplicant.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(deleteApplicant.fulfilled, (state, { payload }) => {
        state.requestState = true;
        // state.users = state.users.filter((user) => user.id !== payload.id);
        // state.totalCount = state.totalCount - 1;
        toast.success(payload.data.message);
      })
      .addCase(deleteApplicant.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(getAllApplicants.pending, (state, { payload }) => {
        state.users = null;
        state.totalCount = 0;
      })
      .addCase(getAllApplicants.fulfilled, (state, { payload }) => {
        state.users = payload.data.list;
        state.totalCount = payload.data.totalCount;
        // toast.success(payload.message);
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
        // toast.success(payload.message);
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
        // console.log(state.findUser);
        // toast.success(payload.message);
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    builder
      .addCase(editUser.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        toast.success(payload.data.message);

        state.requestState = true;
        const index = state.users.findIndex((user) => user.id === payload.id);

        if (index !== -1) {
          state.users[index] = payload.data.data;
        }
      })
      .addCase(editUser.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });
    builder
      .addCase(getAllApplicantInfo.pending, (state, { payload }) => {
        state.fullUserInfo = null;
      })
      .addCase(getAllApplicantInfo.fulfilled, (state, { payload }) => {
        state.fullUserInfo = payload.data;
        // console.log(state.fullUserInfo);
        // toast.success(payload.message);
      })
      .addCase(getAllApplicantInfo.rejected, (state, { payload }) => {
        toast.error(payload);
      });

      builder
      .addCase(getUserCv.pending, (state, { payload }) => {
        state.userCv = null;
      })
      .addCase(getUserCv.fulfilled, (state, { payload }) => {
        state.userCv = payload.data;
        // toast.success(payload.message);
      })
      .addCase(getUserCv.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});


export const { updateUser, setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
