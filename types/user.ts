export type User = {
    id?: number;
    email: string,
    firstName: string,
    lastName: string;
    password: string;
    vehicle_plate_number: string
};

export type BookingRequest = {
    id: number;
    UserId:string;
    slotId:string,
    status: "pending" | "approved" |"rejected";
    requested: Date;
}
export type newUsers = {
    id:number,
    first_name: string,
    last_name: string,
    email: string,
    signedInAt: Date 
}
export type ParkingSlot = {
    id:number,
    name: string,
    status: "available" | "booked"
}