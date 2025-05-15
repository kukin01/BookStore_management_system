import { combineReducers } from "@reduxjs/toolkit";
import { UserSlice } from "./users/userSlice";
import { SlotSlice } from "./slots/slotSlice";

export const rootReducer = combineReducers({
    user: UserSlice.reducer,
    slot: SlotSlice.reducer
})