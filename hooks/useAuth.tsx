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
import { toast } from "react-toastify";
import { User } from "@/types/user";
//setUser: stores the user data in redux state
//logoutUser: clears user data from the redux state

interface LoginResponse {
    message: string;
    token: string;
    data: {
        id: number;
        email: string;
        firstName?: string;
        lastName?: string;
    };
}

//custom hook that encapsulate the authentication logic
const useAuth = () => {
    const navigate = useNavigate();
    const { loading, withLoading } = useLoading();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    //root endpoint that all your authentication requests (like /signup, /login) will be built upon.
    const authService = new AuthService("http://your-api-url.com");

    const registerUser = async (data: Omit<z.infer<typeof RegisterFormSchema>, "confirmPassword">) => {
        withLoading(async () => {
            const response = await authService.registerStudent(data);
            if (response.status === 201) {
                navigate("/api/users/login");
                toast.success(
                    "You have been successfully registered!! Redirecting you to login",
                );
            }
        })
    }
    const loginUser = async (data: z.infer<typeof LoginSchema>) => {
        withLoading(async () => {
            const response = await authService.loginStudent(data);

            const {
                token,
                data: userDetails
            } = response.data as LoginResponse;

            if (response.status == 200) {
                setAuthorizationToken(token, "ACCESS");
                dispatch(setUser({
                    id: userDetails.id,
                    email: userDetails.email,
                    firstName: userDetails.firstName || '', // Provide defaults for optional fields
                    lastName: userDetails.lastName || '',
                }as User));
                navigate(location.state?.path || "/admin", { replace: true });
                toast.success("Logged in successfully!!");
            }
        });
    };
}

export default useAuth;