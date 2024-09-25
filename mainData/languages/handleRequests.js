import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/utils/Api";

export const deleteLanguage = createAsyncThunk(
  "languages/deleteLanguage",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/languages/${id}`, {
        method: "DELETE",
        headers: {
          Auth: token,
        },
      });
      const data = await response.json();

      if (response.ok) {
        return { id, data };
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllLanguages = createAsyncThunk(
  "languages/getAllLanguages",
  async ({ currentPage, token }, { rejectWithValue }) => {
    let pageSize = 10;

    try {
      const response = await fetch(
        `${Api}/admin/languages?pageNumber=${currentPage}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            auth: token,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createLanguage = createAsyncThunk(
  "languages/createLanguage",
  async ({ languageData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/languages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
        body: JSON.stringify(languageData),
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editLanguage = createAsyncThunk(
  "languages/editLanguage",
  async ({ id, token, newLanguageData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/languages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        body: JSON.stringify(newLanguageData),
      });
      const data = await response.json();

      if (response.ok) {
        return { data, id };
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLanguagesByName = createAsyncThunk(
  "languages/getLanguagesByName",
  async ({ languageName, token }, { rejectWithValue }) => {
    let url =
      languageName !== undefined &&
      languageName !== null &&
      languageName.length > 0
        ? `${Api}/admin/languages?pageNumber=1&pageSize=10&name=${languageName}`
        : `${Api}/admin/languages?pageNumber=1&pageSize=10`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          auth: token,
        },
      });
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
