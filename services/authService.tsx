
//connecting frontend with the backend 
//send user credentials(register a new user,login and get a token)
//use zod, store the access token in cookies and send it with future requests.

import axios, { AxiosInstance } from "axios";
import { LoginSchema, RegisterFormSchema } from "../types/form_schema";
import { z } from "zod";

export class AuthService {
    protected instance: AxiosInstance;
    public constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Request timed out!!"
        })
    }
    registerStudent = async (
        data: Omit<z.infer<typeof RegisterFormSchema>, "confirmPassword">,
    ) => {
        const {
            username,
            firstName,
            lastName,
            email,
            password,
        } = data;
        return await this.instance.post("/signup", {
            firstName, lastName, email, password,username
        })
    }
    logoutMUser(dispatch: any, navigate: (path: string) => void) {
        dispatch({ type: "user/logout" }); // Or import your logout action
        localStorage.removeItem("token");
        navigate("/login");
    }
    loginStudent = async (
        data: z.infer<typeof LoginSchema>
    ) => {
        return await this.instance.post("/login", data)
    }
}