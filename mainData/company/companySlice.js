import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companys: [],
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany: (state, { payload }) => {
      state.companys.push(payload);
    },

    updateCompany: (state, { payload }) => {
      const index = state.companys.findIndex(
        (company) => company.id === payload.id
      );

      if (index !== -1) {
        state.companys[index] = payload;
      }
    },

    deleteCompany: (state, { payload }) => {
      state.companys = state.companys.filter(
        (company) => company.id !== payload.id
      );
    },

    getCompany: (state, { payload }) => {
        return state.companys.find(company => company.id === payload.id);
      },

    getAllCompanys: (state, { payload }) => {
      return state.companys
    },
  },
});

export const { addCompany, updateCompany, deleteCompany, getCompany,getAllCompanys } = companySlice.actions;
export default companySlice.reducer;
