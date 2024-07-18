import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/utils/Api";

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ adminData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        body: JSON.stringify(adminData),
      });
      const data = await response.json();

      if (response.ok) {
        return { data, rememberMe: adminData.rememberMe };
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ adminPasswords, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/profile/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        body: JSON.stringify(adminPasswords),
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
