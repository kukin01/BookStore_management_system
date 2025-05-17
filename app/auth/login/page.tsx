"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/types/form_schema";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    function onSubmit(values: z.infer<typeof LoginSchema>) {
        router.push("/dashboard");
        console.log(values)
    }

    return (
        <div className="bg-white w-screen h-auto mt-8 flex justify-center items-center">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex justify-center rounded-3xl text-black flex-col  bg-white border-2 border-blue-500 w-1/3 h-1/2 items-center font-black">
            <h1 className="text-black text-3xl">Login</h1>
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
                <Button type="submit" className="font-bold bg-blue-200 w-md">Login</Button>
                <span>No account?</span> <Link href="/auth/signup" className="text-blue-500 hover:text-blue-700 underline">Signup</Link>
            </form>
        </Form>
        </div>
    );
}