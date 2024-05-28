import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
};

export const loginPopupSlice = createSlice({
  name: "loginPopup",
  initialState,
  reducers: {
    
    handleCloseModal: (state) => {
      state.show = false;
    },

    handleShowModal: (state) => {
      state.show = true;
    },
  },
});

export const { handleCloseModal, handleShowModal } = loginPopupSlice.actions;
export default loginPopupSlice.reducer;
