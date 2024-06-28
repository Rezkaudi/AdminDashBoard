import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/utils/Api";

// Async thunk for deleting a company
export const deleteCompany = createAsyncThunk(
  "company/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/companies/${id}`, {
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

// Async thunk for getting all companies
export const getAllCompanies = createAsyncThunk(
  "company/getAll",
  async ({ currentPage, token }, { rejectWithValue }) => {
    let pageSize = 10;
    try {
      const response = await fetch(
        `${Api}/admin/companies?pageNumber=${currentPage}&pageSize=${pageSize}`,
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

// Async thunk for getting one a company
export const getCompany = createAsyncThunk(
  "company/find",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/companies/${id}`, {
        method: "GET",
        headers: {
          Auth: token,
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

// Async thunk for getting one a company
export const editCompany = createAsyncThunk(
  "company/editCompany",
  async ({ id, token, newData }, { rejectWithValue }) => {
    console.log(newData);
    try {
      const response = await fetch(`${Api}/admin/companies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        body: JSON.stringify(newData),
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

// Async thunk for getting one a company
export const createCompany = createAsyncThunk(
  "company/createCompany",
  async ({ companyData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        body: JSON.stringify(companyData),
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
