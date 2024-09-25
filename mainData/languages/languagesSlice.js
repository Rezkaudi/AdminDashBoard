import { createSlice } from "@reduxjs/toolkit";
import {
  createLanguage,
  editLanguage,
  deleteLanguage,
  getAllLanguages,
  getLanguagesByName,
} from "./handleRequests";
import { toast } from "react-toastify";

const initialState = {
  languages: null,
  requestState: true,
  totalCount: 0,
  currentPage: 1,
  languagesByName: null,
};

export const languagesSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteLanguage.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(deleteLanguage.fulfilled, (state, { payload }) => {
        state.requestState = true;
        // state.languages = state.languages.filter(
        //   (language) => language.id !== payload.id
        // );
        // state.totalCount = state.totalCount - 1;
        toast.success(payload.data.message);
      })
      .addCase(deleteLanguage.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(getAllLanguages.pending, (state, { payload }) => {
        state.languages = null;
        state.totalCount = 0;
      })
      .addCase(getAllLanguages.fulfilled, (state, { payload }) => {
        state.languages = payload.data.list;
        state.totalCount = payload.data.totalCount;
        // toast.success(payload.message);
      })
      .addCase(getAllLanguages.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    builder
      .addCase(editLanguage.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(editLanguage.fulfilled, (state, { payload }) => {
        toast.success(payload.data.message);

        state.requestState = true;
        // const index = state.languages.findIndex(
        //   (language) => language.id === payload.id
        // );

        // if (index !== -1) {
        //   state.languages[index] = payload.data.data;
        // }
      })
      .addCase(editLanguage.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(createLanguage.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(createLanguage.fulfilled, (state, { payload }) => {
        state.requestState = true;
        // state.languages = [...state.languages, payload.data];
        // state.totalCount = Number(state.totalCount) + 1;
        toast.success(payload.message);
      })
      .addCase(createLanguage.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(getLanguagesByName.pending, (state, { payload }) => {
        state.languagesByName = null;
      })
      .addCase(getLanguagesByName.fulfilled, (state, { payload }) => {
        state.languagesByName = payload.data.list;
        console.log(payload.data.list)
        // toast.success(payload.message);
      });
    // .addCase(getLanguagesByName.rejected, (state, { payload }) => {
    //   toast.error(payload);
    // });
  },
});

export const { setCurrentPage } = languagesSlice.actions;
export default languagesSlice.reducer;
