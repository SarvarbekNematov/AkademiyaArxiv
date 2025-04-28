// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// LocalStorage dan tokenni olish
const tokenFromStorage = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: tokenFromStorage ? tokenFromStorage : null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

// export actions
export const { setToken, removeToken } = authSlice.actions;

// export reducer
export default authSlice.reducer;
