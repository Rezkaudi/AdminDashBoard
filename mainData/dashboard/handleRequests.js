import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/utils/Api";

export const getStatistics = createAsyncThunk(
  "dashboard/statistics",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        }
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


