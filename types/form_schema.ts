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
    confirmPassword: passwordValidationSchema
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

export { passwordValidationSchema, RegisterFormSchema, LoginSchema }