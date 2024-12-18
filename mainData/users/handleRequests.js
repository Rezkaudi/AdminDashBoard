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

export const getResentUsers = createAsyncThunk(
  "user/getResent",
  async ({ token }, { rejectWithValue }) => {
    let pageSize = 6;

    try {
      const response = await fetch(
        `${Api}/admin/users?pageNumber=1&pageSize=${pageSize}`,
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

export const getUser = createAsyncThunk(
  "users/find",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/users/${id}`, {
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

export const editUser = createAsyncThunk(
  "users/editUser",
  async ({ id, token, newData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/users/${id}`, {
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

export const getAllApplicantInfo = createAsyncThunk(
  "users/getAllApplicantInfo",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/users/${id}/full`, {
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

export const getUserCv = createAsyncThunk(
  "user/getUserCv",
  async ({ cvId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/user/cv/${cvId}`, {
        method: "GET",
      });

      if (response.ok) {
        console.log(response);
        return response.url;
      } else {
        return rejectWithValue("fail to download");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
