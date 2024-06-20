import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { deleteJop, getAllJops,getJop } from "./handleRequests";

const initialState = {
  jops: null,
  findJop: null,
  totalCount: 0,
  currentPage: 1,
};

export const jopsSlice = createSlice({
  name: "jops",
  initialState,
  reducers: {
    addJop: (state, { payload }) => {
      state.jops.push(payload);
    },

    updateJop: (state, { payload }) => {
      const index = state.jops.findIndex(
        (jop) => jop.id === payload.id
      );

      if (index !== -1) {
        state.jops[index] = payload;
      }
    },

    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(deleteJop.fulfilled, (state, { payload }) => {
        state.jops = state.jops.filter(
          (jop) => jop.id !== payload.id
        );
        state.totalCount = state.totalCount - 1;
        toast.success(payload.data.message);
      })
      .addCase(deleteJop.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    builder
      .addCase(getAllJops.pending, (state, { payload }) => {
        state.jops = null;
      })
      .addCase(getAllJops.fulfilled, (state, { payload }) => {
        state.jops = payload.data.jobs;
        state.totalCount = payload.data.total;
        toast.success(payload.message);
      })
      .addCase(getAllJops.rejected, (state, { payload }) => {
        toast.error(payload);
      });

      builder
      .addCase(getJop.pending, (state, { payload }) => {
        state.findJop = null;
      })
      .addCase(getJop.fulfilled, (state, { payload }) => {
        state.findJop = payload.data;
        toast.success(payload.message);
      })
      .addCase(getJop.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});

export const { addJop, updateJop, setCurrentPage } =
  jopsSlice.actions;
export default jopsSlice.reducer;
