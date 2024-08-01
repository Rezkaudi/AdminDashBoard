import { createSlice } from "@reduxjs/toolkit";
import {
  createSkill,
  editSkill,
  deleteSkill,
  getAllSkills,
  getSkillsByName,
} from "./handleRequests";
import { toast } from "react-toastify";

const initialState = {
  skills: null,
  requestState: true,
  totalCount: 0,
  skillsByName: null,
  currentPage: 1,
};

export const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteSkill.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(deleteSkill.fulfilled, (state, { payload }) => {
        state.requestState = true;
        // state.skills = state.skills.filter((skill) => skill.id !== payload.id);
        // state.totalCount = state.totalCount - 1;
        toast.success(payload.data.message);
      })
      .addCase(deleteSkill.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(getAllSkills.pending, (state, { payload }) => {
        state.skills = null;
        state.totalCount = 0;

      })
      .addCase(getAllSkills.fulfilled, (state, { payload }) => {
        state.skills = payload.data.list;
        state.totalCount = payload.data.totalCount;
        // toast.success(payload.message);
      })
      .addCase(getAllSkills.rejected, (state, { payload }) => {
        toast.error(payload);
      });

    builder
      .addCase(editSkill.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(editSkill.fulfilled, (state, { payload }) => {
        toast.success(payload.data.message);

        state.requestState = true;
        const index = state.skills.findIndex(
          (skill) => skill.id === payload.id
        );

        if (index !== -1) {
          state.skills[index] = payload.data.data;
        }
      })
      .addCase(editSkill.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(createSkill.pending, (state, { payload }) => {
        state.requestState = false;
      })
      .addCase(createSkill.fulfilled, (state, { payload }) => {
        state.requestState = true;
        // state.skills = [...state.skills, payload.data];
        // state.totalCount =Number(state.totalCount) + 1
        toast.success(payload.message);
      })
      .addCase(createSkill.rejected, (state, { payload }) => {
        state.requestState = true;
        toast.error(payload);
      });

    builder
      .addCase(getSkillsByName.pending, (state, { payload }) => {
        state.skillsByName = null;
      })
      .addCase(getSkillsByName.fulfilled, (state, { payload }) => {
        state.skillsByName = payload.data.list;
        // toast.success(payload.message);
      })
      // .addCase(getSkillsByName.rejected, (state, { payload }) => {
      //   toast.error(payload);
      // });
  },
});

export const { setCurrentPage } = skillsSlice.actions;
export default skillsSlice.reducer;
