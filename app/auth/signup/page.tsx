"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RegisterFormSchema, } from "@/types/form_schema";
import { useAppDispatch } from "@/app/config/hook";
import { setUser } from "@/features/users/userSlice";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const form = useForm<z.infer<typeof RegisterFormSchema>>({
        resolver: zodResolver(RegisterFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    });

    function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
        dispatch(setUser({
            id: Date.now(),
            ...values
        }))
        router.push("/dashboard");
        console.log(values)
    }

    return (
        <div className="bg-white w-screen h-screen flex justify-center items-center">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center rounded-3xl text-black flex-col  bg-white border-blue-500 border-2 w-1/3 h-5/6 items-center font-black">
            <h1 className="text-black text-3xl">Register for free</h1>
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem className="w-lg">
                            <FormLabel>FirstName</FormLabel>
                            <FormControl>
                                <Input placeholder="FirstName" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem className="w-lg">
                            <FormLabel>LastName</FormLabel>
                            <FormControl>
                                <Input placeholder="lastName" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-lg">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-lg">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="font-bold bg-blue-200 w-md">Sign Up</Button>
                <span>you have accout?</span> <Link href="/auth/login" className="text-blue-500 hover:text-blue-700 underline">Login</Link>
            </form>
        </Form>
        </div>
    );
}