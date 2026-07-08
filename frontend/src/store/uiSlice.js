import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  sidebarMobileOpen: false,
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleSidebarMobile: (state) => {
      state.sidebarMobileOpen = !state.sidebarMobileOpen;
    },
    closeSidebarMobile: (state) => {
      state.sidebarMobileOpen = false;
    },
    setUILoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleSidebar, toggleSidebarMobile, closeSidebarMobile, setUILoading } = uiSlice.actions;
export default uiSlice.reducer;
