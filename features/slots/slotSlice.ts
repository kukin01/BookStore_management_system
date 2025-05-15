import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { slots } from "@/types/slots";
import { create } from "domain";


type InitialState = {
    data: slots[];
    totalPages: number;
    currentPage: number;
    totalItems: number,
    limit: number,
}

const initialState: InitialState = {
    data: [],
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
    limit: 3,
}
export const SlotSlice = createSlice({
    name: "slots",
    initialState,
    reducers: {
        setSlots: (state, action: PayloadAction<InitialState>) => {
            return { ...state, ...action.payload }; //replace the entire state with new book list+metadata
        },
        addSlot: (state, action: PayloadAction<slots>) => {
            state.data.push(action.payload);
        },
        removeSlot: (state, action: PayloadAction<number>) => {
            // state.data = state.data.filter(book => book.id !== action.payload);
            return {...state,...[...state.data].filter}
        }
    }
})

export const { setSlots, addSlot, removeSlot } = SlotSlice.actions;
export default SlotSlice.reducer;