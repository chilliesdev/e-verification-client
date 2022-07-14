import { createSlice } from "@reduxjs/toolkit";

let accessToken = undefined;

if (typeof window !== "undefined") {
  accessToken =
    localStorage.getItem("access-token") ||
    sessionStorage.getItem("access-token");
}

const initialState = {
  accessToken: accessToken,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;

      if (typeof window !== "undefined") {
        if (action.payload.rememberMe)
          return localStorage.setItem(
            "access-token",
            action.payload.accessToken
          );

        return sessionStorage.setItem(
          "access-token",
          action.payload.accessToken
        );
      }
    },
    removeAccessToken: (state) => {
      state.accessToken = undefined;
      localStorage.removeItem("access-token");
      sessionStorage.removeItem("access-token");
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveAccessToken, removeAccessToken } = authSlice.actions;

export default authSlice.reducer;
