import { z } from "zod";

const passwordValidationSchema = z
    .string()
    .refine((value) => /(?=.*?[A-z])/.test(value), {
        message: "password must have atleast one upper case letter",
    })
    .refine((value) => /(?=.*?[a-z])/.test(value), {
        message: "password must have atleast one lower case letter",
    })
    .refine((value) => /(?=.*?[0-9])/.test(value), {
        message: "the message must have atleast one number"
    })
    .refine((value) => /(?=.*?[!@#$%^&*-+=])/.test(value), {
        message: "the message must contain atleast one special character"
    })
    .refine((value) => /.{8,}/.test(value), {
        message: "the message must be greater or equal to 8 characters"
    })

const RegisterFormSchema = z.object({
    firstName: z
        .string()
        .min(3, { message: "Too short" })
        .max(20, { message: "too long" }),
    lastName: z
        .string()
        .min(3, { message: "Too short" })
        .max(20, { message: "too long" }),
    email: z
        .string()
        .email({ message: "Invalid email" }),
    password: passwordValidationSchema,
    confirmPassword: passwordValidationSchema,
    // vehicle_plate_number: z
    //     .string()
    //     .length(7,{message: "must be exactly 7 characters long"})
    //     .regex(/^[A-Za-z]{3}\s{4}$/,{
    //         message: "Invalid plate number"
    //     })
    username: z
        .string()
        .min(3, { message: "Too short" })
        .max(20, { message: "too long" }),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "passwords dont match",
        path: ["confirmPassword"],
    })

const LoginSchema = z
    .object({
        email: z
            .string()
            .email({ message: "Invalid password" }),
        password: z
            .string()
            .min(2, { message: "Too short" })
    })

const SlotsFormSchema = z.object({
    slot_number: z
        .string()
        .min(3, { message: "Book name can't go below 3 characters" })
        .max(100, { message: "Book name can't exceed 100 characters" }),
    is_Booked: z
        .enum(["AVAILABLE", "BOOKED"]),
    is_approved: z
        .enum(["APPROVED", "FALSE", "TRUE", "ONMARKET"]),
    slot_type: z
        .enum(["STANDARD", "VIP", "VVIP"]),
        // .default("STANDARD"),
        // .catch("STANDARD"),
    price_per_hour: z
        .number()
        .min(3, "price can't go below 3 characters"),
    size: z.enum(["MEDIUM", "LARGE", "SMALL"]),
    vehicle_type: z.enum(["MOTORCYCLE", "CAR", "TRUCK"]),
});
export { passwordValidationSchema, RegisterFormSchema, LoginSchema, SlotsFormSchema }
