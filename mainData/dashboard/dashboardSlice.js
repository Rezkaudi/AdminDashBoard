import { createSlice } from "@reduxjs/toolkit";
import { getStatistics } from "./handleRequests";
import { toast } from "react-toastify";

const initialState = {
  statistics: null,
};

export const authSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fn: (state, { payload }) => { },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state, { payload }) => {
        state.statistics = null;
      })
      .addCase(getStatistics.fulfilled, (state, { payload }) => {
        state.statistics = payload.data.stats
      })
      .addCase(getStatistics.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});

export const { fn } = authSlice.actions;
export default authSlice.reducer;
