"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SlotsFormSchema } from "@/types/form_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


export default function AddSlot() {
    const form = useForm<z.infer<typeof SlotsFormSchema>>({
    resolver: zodResolver(SlotsFormSchema),
    defaultValues: {
        slot_number: "",
        slot_type: "STANDARD",
        price_per_hour: 5,
        size: "MEDIUM",
        vehicle_type: "MOTORCYCLE",
        is_Booked: "AVAILABLE",
        is_approved: "FALSE",
    }
});
function onSubmit(values: z.infer<typeof SlotsFormSchema>) {
    console.log(values)
}
    return(
        <div className=" w-screen h-10/12 mt-8 flex flex-col justify-center items-center">
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8 border-1 border-blue-500 flex text-black flex-col justify-center w-1/3 h-5/6 items-center font-black">
        <div className="bg-blue-400 w-full flex justify-center items-center mt-0 h-16 border-1 border-blue-500 ">
            <h1>Add another slot</h1>
        </div>
        <FormField
          control={form.control}
          name="slot_number"
          render={({ field }) => (
            <FormItem className="w-lg">
              <FormLabel>slot_number</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
                    control={form.control}
                    name="slot_type"
                    render={({ field }) => (
                        <FormItem className="w-lg">
                            <FormLabel>slot type</FormLabel>
                            <FormControl>
                                <select {...field} className="border-2 border-blue-500 rounded-md p-2">
                                    <option value="STANDARD">STANDARD</option>
                                    <option value="VIP">VIP</option>
                                    <option value="VVIP">VVIP</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                  <FormField
                    control={form.control}
                    name="vehicle_type"
                    render={({ field }) => (
                        <FormItem className="w-lg">
                            <FormLabel>vehicle type</FormLabel>
                            <FormControl>
                                <select {...field} className="border-2 border-blue-500 rounded-md p-2">
                                    <option value="MOTOCYCLE">Motocycle</option>
                                    <option value="CAR">car</option>
                                    <option value="TRUCK">Truck</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                        <FormItem className="w-lg">
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                                <select {...field} className="border-2 border-blue-500 rounded-md p-2">
                                    <option value="LARGE">Large</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="SMALL">Small</option>
                                </select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
        <Button type="submit" className="w-md font-bold bg-blue-200">Submit</Button>
      </form>
    </Form>
         </div>
    )
}