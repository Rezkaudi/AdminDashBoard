import { createSlice } from "@reduxjs/toolkit";
import { logIn, changePassword } from "./handleRequests";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  token: null,
  requestState: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, { payload }) => {
      state.token = null;
      Cookies.remove("authToken");
    },
    loadAuth: (state, { payload }) => {
      if (authToken) {
        state.token = Cookies.get("authToken");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.requestState = true;
        state.token = payload.data.data.accessToken;

        if (payload.rememberMe) {
          Cookies.set("authToken", token, { expires: 7 });
        } else {
          Cookies.set("authToken", token, { expires: 1 / 24 });
        }
        toast.success(payload.data.message);
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(changePassword.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.requestState = true;
        toast.success(payload.message);
      })
      .addCase(changePassword.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });
  },
});

export const { logOut, loadAuth } = authSlice.actions;
export default authSlice.reducer;
