import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getAllCompanies,
  deleteCompany,
  getCompany,
  editCompany,
  createCompany,
  getCompaniesByName,
} from "./handleRequests";

// {
//   "id": "f15a6346-0704-4f08-bbab-1b9d8b21c7b6",
//   "email": "test2y@gmail.com",
//   "name": "London, UK",
//   "address": "test2",
//   "joinDate": "2024-06-19T17:34:28.276Z"
// }

const initialState = {
  companies: null,
  findCompany: null,
  totalCount: 0,
  currentPage: 1,
  companiesByName: null,
  requestState: true,
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
        state.companies[index] = payload.data;
      }
    },

    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCompany.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(deleteCompany.fulfilled, (state, { payload }) => {
        state.requestState = true;
        state.companies = state.companies.filter(
          (company) => company.id !== payload.id
        );
        state.totalCount = state.totalCount - 1;
        toast.success(payload.data.message);
      })
      .addCase(deleteCompany.rejected, (state, { payload }) => {
        state.requestState = true;
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

    builder
      .addCase(editCompany.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(editCompany.fulfilled, (state, { payload }) => {
        toast.success(payload.data.message);

        state.requestState = true;
        const index = state.companies.findIndex(
          (company) => company.id === payload.id
        );

        if (index !== -1) {
          state.companies[index] = payload.data.data;
        }
      })
      .addCase(editCompany.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(createCompany.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(createCompany.fulfilled, (state, { payload }) => {
        state.requestState = true;
        state.companies = [...state.companies, payload.data];
        toast.success(payload.message);
      })
      .addCase(createCompany.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(getCompaniesByName.pending, (state, { payload }) => {
        state.companiesByName = null;
      })
      .addCase(getCompaniesByName.fulfilled, (state, { payload }) => {
        state.companiesByName = payload.data.list;
        // toast.success(payload.message);
      });
    // .addCase(getCompaniesByName.rejected, (state, { payload }) => {
    //   toast.error(payload);
    // });
  },
});

export const { addCompany, updateCompany, setCurrentPage } =
  companySlice.actions;
export default companySlice.reducer;
