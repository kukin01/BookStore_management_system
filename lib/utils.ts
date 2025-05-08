import { type ClassValue, clsx } from "clsx";
import { twMerge } from 'tailwind-merge';
import Cookies from "js-cookie";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

//getting the stored accesstoken from cookies, and return it in a ..
//storing a token into a cookie
export const getAuthorizationHeader = () => {
    const currentUser = Cookies.get("currentUser");
    return {
        Authorization: `Bearer ${JSON.parse(currentUser || "")?.accessToken || ""}`,
    }
}

const parseJwt = (token: string): Record<string, any> | null => {
    try {
        const baseURL = token.split(".")[1];
        const base64 = baseURL.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => `%${`00${c.charCodeAt(0).toString(16).slice(-2)}`.slice(-2)}`)
                .join("")
        )
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.log("error parsing jwt:", error);
        return null;
    }
}

export const setAuthorizationToken = (token: string, type: string) => {
    Cookies.set(
        "currentUser",
        JSON.stringify({ [`${type.toLowerCase()}Token`]: token })
    );
}

export const isTokenExpired = (
    currentUserCokie: string | undefined,
    expirationTimeBuffer: number=5, // ensuring you don't use an about-to-expire token
): boolean => {
    try {
        if (!currentUserCokie) {
            return true;
        }
        const currentUser = currentUserCokie ? JSON.parse(currentUserCokie) : null;
        const token = currentUser?.accessToken;
        if (!token) return true;
        const decodedToken = parseJwt(token);

        if (!decodedToken || !decodedToken.exp) return true;
        return Date.now() >= (decodedToken.exp - expirationTimeBuffer) * 1000;
    } catch (error) {
        console.error("parsing error", error);
        return true;
    }
}
export const isAuthenticated = ()=>{
    const token = Cookies.get("currentUser");
    const expired = token?isTokenExpired(token):true;
    return !expired;
}
