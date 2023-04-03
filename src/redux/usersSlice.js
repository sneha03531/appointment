import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users:null,
    reloadUser:true
  },
  reducers: {
    setUsers:(state,action)=>{
        state.users=action.payload
    },
    reloadUserData:(state,action)=>{
      state.reloadUser=action.payload
    }
  },
});

export const { setUsers,reloadUserData } = usersSlice.actions;