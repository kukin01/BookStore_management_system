import { getAuthorizationHeader } from "@/lib/utils";
import { SlotsFormSchema } from "../types/form_schema";
import axios, { AxiosInstance } from "axios";
import { z } from "zod";
import { TParams } from "../types/slots"

export class SlotService {
    protected instance: AxiosInstance;
    public constructor(url: string) {
        this.instance = axios.create({
            baseURL: url,
            timeout: 30000,
            timeoutErrorMessage: "Request timed out!",
        });
    }

    getSlots = async ({ limit = 10, page = 1 }: TParams, options?: Record<string, string | number | boolean | undefined>) => {
        const params = {
            page,
            limit,
            ...options,
        };

        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined) {
                delete params[key as keyof typeof params];
            }
        });

        return await this.instance.get("/", {
            headers: getAuthorizationHeader(),
            params
        });
    };

    createBook = async (data: z.infer<typeof SlotsFormSchema>) => {
        return await this.instance.post("/create", data, {
            headers: getAuthorizationHeader(),
        });
    };

    updateSlot = async (
        data: z.infer<typeof SlotsFormSchema>,
        id: string,
    ) => {
        return await this.instance.put(`/update/${id}`, data, {
            headers: getAuthorizationHeader(),
        });
    };

    removeSlot = async (id: string) => {
        return await this.instance.delete(`/delete/${id}`, {
            headers: getAuthorizationHeader(),
        });
    };
}