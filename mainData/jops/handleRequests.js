import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/utils/Api";

// Async thunk for deleting a company
export const deleteJop = createAsyncThunk(
  "jops/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/jobs/${id}`, {
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
export const getAllJops = createAsyncThunk(
  "jops/getAll",
  async ({ currentPage, token }, { rejectWithValue }) => {
    let pageSize = 10;
    try {
      const response = await fetch(
        `${Api}/admin/jobs?page=${currentPage}&size=${pageSize}`,
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

export const getJop = createAsyncThunk(
  "jops/get",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/jobs/${id}`, {
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

export const createJop = createAsyncThunk(
  "jops/createJop",
  async ({ jopData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
        body: JSON.stringify(jopData),
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

export const editJop = createAsyncThunk(
  "jops/editJop",
  async ({ id, token, newJopData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        body: JSON.stringify(newJopData),
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

export const filterJops = createAsyncThunk(
  "jops/filterJops",
  async (
    { currentPage, token, title, skills, companyId },
    { rejectWithValue }
  ) => {
    let pageSize = 10;

    let url = `${Api}/admin/jobs?page=${currentPage}&size=${pageSize}`;
    if (title.length !== 0) {
        url += `&title=${title}`;
    }
    if (skills.length !== 0) {
        url += `&skills=${skills}`;
    }
    if (companyId.length !== 0) {
        url += `&companyId=${companyId}`;
    }      
    
    try {
      const response = await fetch(url,
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
