import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/user";
import { Satellite } from "lucide-react";

const initialState: User = {
    id: undefined,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    username:""
}
export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        //the name of the reducer
        setUser: (state,action: PayloadAction<User>)=>{
            // console.log(action)
            const {payload} = action;
            state.id = payload.id;
            state.email = payload.email;
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.password = payload.password;
            state.username = payload.username
        },
        logoutUser: (state,_action: PayloadAction<User>)=>{
            state.id = undefined,
            state.email = "",
            state.username = "",
            state.firstName = "",
            state.lastName = "",
            state.password = "";
        }
    }
})
export const {setUser, logoutUser} = UserSlice.actions;
export default UserSlice.reducer; //listening for actions and update the redux state accordingly;