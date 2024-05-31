import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/utils/Api";

// Async thunk for deleting a user
export const deleteApplicant = createAsyncThunk(
  "users/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/users/${id}`, {
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

// Async thunk for getting all users
export const getAllApplicants = createAsyncThunk(
  "user/getAll",
  async ({ currentPage, token }, { rejectWithValue }) => {
    let pageSize = 10;

    try {
      const response = await fetch(
        `${Api}/admin/users?pageNumber=${currentPage}&pageSize=${pageSize}`,
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
