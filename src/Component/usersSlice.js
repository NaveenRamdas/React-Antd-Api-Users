import { createSlice } from "@reduxjs/toolkit";
import React, { useState } from "react";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    
  },

  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
   
  },
});

export const { setUsers, deleteUser } = usersSlice.actions;

export default usersSlice.reducer;
