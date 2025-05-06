import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./users/userSlice";
import { BookSlice } from "./books/bookSlice";

export const rootReducer = combineReducers({
    user: userSlice,
    book: BookSlice
})