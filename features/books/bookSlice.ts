import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "@/types/book";
import { create } from "domain";


type InitialState = {
    data: Book[];
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
export const BookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setBooks: (state, action: PayloadAction<InitialState>) => {
            return { ...state, ...action.payload }; //replace the entire state with new book list+metadata
        },
        addBook: (state, action: PayloadAction<Book>) => {
            state.data.push(action.payload);
        },
        removeBook: (state, action: PayloadAction<number>) => {
            // state.data = state.data.filter(book => book.id !== action.payload);
            return {...state,...[...state.data].filter}
        }
    }
})

export const { setBooks, addBook, removeBook } = BookSlice.actions;
export default BookSlice.reducer;