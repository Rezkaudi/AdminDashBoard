import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menu: false,
    chatSidebar: false,
    popUp:false
};

export const toggleSlice = createSlice({
    name: "toggle",
    initialState,
    reducers: {
        menuToggle: (state) => {
            state.menu = !state.menu;
        },
        popUpToggle: (state) => {
            state.popUp = !state.popUp;
        },
        chatSidebarToggle: (state) => {
            state.chatSidebar = !state.chatSidebar;
        },
    },
});

export const { menuToggle, chatSidebarToggle ,popUpToggle} = toggleSlice.actions;
export default toggleSlice.reducer;
