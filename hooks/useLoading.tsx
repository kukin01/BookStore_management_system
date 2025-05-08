import { toast } from "react-toastify"
import { useState } from "react"

//loading and error handling logic for API calls.
const useLoading = () => {
    const [loading, setLoading] = useState(false);
    async function withLoading<T>(fetchFunction: () => Promise<T>) {
        try {
            setLoading(true);
            const response = await fetchFunction();
            return response;
        } catch (error: any) {
            console.log(error);
            //checks if the error came from axios
            if (error.response) {
                const { data } = error.response;
                //those messages are sent from backend
                toast.error(data.message || data.error || "unkown error occured", { position: "top-right" })
            } else {
                toast.error("network error please try again 🌞")
            }
        } finally {
            setLoading(false);
        }
    }
    return { loading, withLoading };
}
export default useLoading;