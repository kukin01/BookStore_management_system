import { AuthService } from "../services/authService";
import { z } from "zod";
import { LoginSchema, RegisterFormSchema } from "@/types/form_schema";
import { useNavigate, useLocation } from "react-router-dom";
import { setAuthorizationToken } from "@/lib/utils";
import Cookies from "js-cookie";//used to manage cookies in the browser(saving or removing user data
import { useAppDispatch, useAppSelector } from "@/app/config/hook";

//useAppDispatch: for dispatching redux actions
//useAppSelector: for reading values from the redux state
import { logoutUser, setUser } from "@/features/users/userSlice";
import useLoading from "./useLoading";
//setUser: stores the user data in redux state
//logoutUser: clears user data from the redux state

//custom hook that encapsulate the authentication logic
const useAuth = () => {
    const navigate = useNavigate();
    const { loading, withLoading } = useLoading();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const registerUser = async (data: Omit<z.infer<typeof RegisterFormSchema>, "confirmPassword">) => {
        withLoading(async () => {
            const response = await AuthService
        })
    }
}