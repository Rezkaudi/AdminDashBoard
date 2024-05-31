import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllCompanies, deleteCompany } from "./handleRequests";

const initialState = {
  companies: null,
  totalCount: 0,
  currentPage: 1,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany: (state, { payload }) => {
      state.companies.push(payload);
    },

    updateCompany: (state, { payload }) => {
      const index = state.companies.findIndex(
        (company) => company.id === payload.id
      );

      if (index !== -1) {
        state.companies[index] = payload;
      }
    },

    getCompany: (state, { payload }) => {
      return state.companies.find((company) => company.id === payload.id);
    },

    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCompany.fulfilled, (state, { payload }) => {
        state.companies = state.companies.filter(
          (company) => company.id !== payload.id
        );
        state.totalCount = state.totalCount - 1;
        toast.success(payload.data.message);
      })
      .addCase(deleteCompany.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    builder
      .addCase(getAllCompanies.pending, (state, { payload }) => {
        state.companies = null;
      })
      .addCase(getAllCompanies.fulfilled, (state, { payload }) => {
        state.companies = payload.data.list;
        state.totalCount = payload.data.totalCount;
        toast.success(payload.message);
      })
      .addCase(getAllCompanies.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});

export const { addCompany, updateCompany, getCompany, setCurrentPage } =
  companySlice.actions;
export default companySlice.reducer;
