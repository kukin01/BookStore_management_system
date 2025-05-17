

export type slots = {
    id: number,
    slot_number: string,
    is_Booked: "AVAILABLE" | "BOOKED",
    is_approved: "APPROVED" | "FALSE" | "TRUE" | "ONMARKET",
    slot_type: "STANDARD" | "VIP" | "VVIP",
    price_per_hour: number,
    size: "MEDIUM" | "LARGE" | "SMALL",
    vehicle_type: "MOTORCYCLE" | "CAR" | "TRUCK",
}

export type TParams = {
    page?: number;
    limit?: number;
    [key: string]: number | boolean | undefined;
};

