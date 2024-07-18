import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/utils/Api";

export const deleteSkill = createAsyncThunk(
  "skills/deleteSkill",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/skills/${id}`, {
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

export const getAllSkills = createAsyncThunk(
  "skills/getAllSkills",
  async ({ currentPage, token }, { rejectWithValue }) => {
    let pageSize = 10;

    try {
      const response = await fetch(
        `${Api}/admin/skills?pageNumber=${currentPage}&pageSize=${pageSize}`,
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

export const createSkill = createAsyncThunk(
  "skills/createSkill",
  async ({ skillData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: token,
        },
        body: JSON.stringify(skillData),
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

export const editSkill = createAsyncThunk(
  "skills/editSkill",
  async ({ id, token, newSkillData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${Api}/admin/skills/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        body: JSON.stringify(newSkillData),
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

export const getSkillsByName = createAsyncThunk(
  "skills/getSkillsByName",
  async ({ skillName, token }, { rejectWithValue }) => {
    let url =
      skillName !== undefined && skillName != null && skillName.length > 0
        ? `${Api}/admin/skills?pageNumber=1&pageSize=10&name=${skillName}`
        : `${Api}/admin/skills?pageNumber=1&pageSize=10`;

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
