"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    firstName: z.string().min(5).max(50),
    lastName: z.string().min(5).max(15),
    email: z.string().email(),
    password: z.string().min(5).max(15)
})

export default function Login() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        router.push("/dashboard");
        console.log(values)
    }

    return (
        <div className="bg-blue-100 w-screen h-screen flex justify-center items-center">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center rounded-3xl text-black flex-col  bg-blue-300 w-1/3 h-5/6 items-center font-black">
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
            </form>
        </Form>
        </div>
    );
}