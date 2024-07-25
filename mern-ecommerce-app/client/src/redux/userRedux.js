import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginSuccess: (state, action) => ({
      ...state,
      isFetching: false,
      currentUser: action.payload,
    }),
    loginFailure: (state) => ({
      ...state,
      isFetching: false,
      error: true,
    }),
  },
});

export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
