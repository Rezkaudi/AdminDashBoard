import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllCompanies, deleteCompany ,getCompany} from "./handleRequests";

// {
//   "id": "f15a6346-0704-4f08-bbab-1b9d8b21c7b6",
//   "email": "test2y@gmail.com",
//   "name": "London, UK",
//   "address": "test2",
//   "joinDate": "2024-06-19T17:34:28.276Z"
// }

const initialState = {
  companies: null,
  findCompany:null,
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

      builder
      .addCase(getCompany.pending, (state, { payload }) => {
        state.findCompany = null;
      })
      .addCase(getCompany.fulfilled, (state, { payload }) => {
        state.findCompany = payload.data;
        toast.success(payload.message);
      })
      .addCase(getCompany.rejected, (state, { payload }) => {
        toast.error(payload);
      });
  },
});

export const { addCompany, updateCompany, setCurrentPage } =
  companySlice.actions;
export default companySlice.reducer;
