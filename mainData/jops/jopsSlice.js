import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  deleteJop,
  getAllJops,
  getJop,
  createJop,
  editJop,
  filterJops,
} from "./handleRequests";

const initialState = {
  jops: null,
  findJop: null,
  requestState: true,
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
      const index = state.jops.findIndex((jop) => jop.id === payload.id);

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
      .addCase(deleteJop.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(deleteJop.fulfilled, (state, { payload }) => {
        state.requestState = true;
        // state.jops = state.jops.filter((jop) => jop.id !== payload.id);
        // state.totalCount = state.totalCount - 1;
        toast.success(payload.data.message);
      })
      .addCase(deleteJop.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(getAllJops.pending, (state, { payload }) => {
        state.jops = null;
      })
      .addCase(getAllJops.fulfilled, (state, { payload }) => {
        state.jops = payload.data.jobs;
        state.totalCount = payload.data.total;
        // toast.success(payload.message);
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
        // toast.success(payload.message);
      })
      .addCase(getJop.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    builder
      .addCase(editJop.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(editJop.fulfilled, (state, { payload }) => {
        toast.success(payload.data.message);

        state.requestState = true;
        // const index = state.jops.findIndex((jop) => jop.id === payload.id);

        // if (index !== -1) {
        //   state.jops[index] = payload.data.data;
        // }
      })
      .addCase(editJop.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(createJop.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(createJop.fulfilled, (state, { payload }) => {
        state.requestState = true;
        // state.jops = [...state.jops, payload.data];
        // state.totalCount = Number(state.totalCount) + 1;
        toast.success(payload.message);
      })
      .addCase(createJop.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(filterJops.pending, (state, { payload }) => {
        state.jops = null;
        state.totalCount = 0;
      })
      .addCase(filterJops.fulfilled, (state, { payload }) => {
        state.jops = payload.data.jobs;
        state.totalCount = payload.data.total;
        // toast.success(payload.message);
      })
      .addCase(filterJops.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});

export const { addJop, updateJop, setCurrentPage } = jopsSlice.actions;
export default jopsSlice.reducer;
