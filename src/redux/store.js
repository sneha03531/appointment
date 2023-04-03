import { configureStore } from '@reduxjs/toolkit'
import {combineReducers} from "redux"
import {alertsSlice} from "./alertsSlice"
import {usersSlice} from "./usersSlice"

const rootReducer=combineReducers({
    alerts: alertsSlice.reducer,
    users: usersSlice.reducer
});

const store=configureStore({
    reducer:rootReducer
});

export default store;