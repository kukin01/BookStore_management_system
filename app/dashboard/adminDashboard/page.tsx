"use client"
import { useState, useEffect } from "react"
import { newUsers, BookingRequest } from "@/types/user"
import { slots } from "@/types/slots"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
    const [slots, setSlots] = useState<slots[]>([])
    const [recentUsers, setUsers] = useState<newUsers[]>([])
    const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([])

    useEffect(() => {
        const fetchSlots = async () => {
            const slotsRes = await fetch("/api/slots");
            const bookingRes = await fetch("/api/bookings/pending");
            const userRes = await fetch("/api/users/recent")
            setUsers(await userRes.json());
            setSlots(await slotsRes.json());
            setBookingRequests(await bookingRes.json());
        }
        const interval = setInterval(fetchSlots, 5000);
        fetchSlots();
        return () => clearInterval(interval);
    }, [])
    return (
        <div className="p-6 space-y-8">
            {/* Section 1: Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>New Sign-Ups</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{recentUsers.length}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pending Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {bookingRequests.filter(r => r.status === "pending").length}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Slots Available</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">
                            {slots.filter(s => s.is_Booked === "AVAILABLE").length} / {slots.length}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Section 2: Recent Users Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recently Signed Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>id</TableHead>
                                <TableHead>first name</TableHead>
                                <TableHead>last name</TableHead>
                                <TableHead>email</TableHead>
                                <TableHead>Signed In At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.first_name}</TableCell>
                                    <TableCell>{user.last_name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {new Date(user.signedInAt).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Section 3: Booking Requests */}
            <Card>
                <CardHeader>
                    <CardTitle>Pending Booking Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>id</TableHead>
                                <TableHead>user_ID</TableHead>
                                <TableHead>slot_Id</TableHead>
                                <TableHead>status</TableHead>
                                <TableHead>Requested_Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookingRequests.map((bookings) => (
                                <TableRow key={bookings.id}>
                                    <TableCell>{bookings.UserId}</TableCell>
                                    <TableCell>{bookings.slotId}</TableCell>
                                    <TableCell>{bookings.status}</TableCell>
                                    <TableCell>
                                        {new Date(bookings.requested).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Slots</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>id</TableHead>
                                <TableHead>slot_number</TableHead>
                                <TableHead>is_booked</TableHead>
                                <TableHead>vehicle_plate_number</TableHead>
                                <TableHead>user_ID</TableHead>
                                <TableHead>is_approved</TableHead>
                                <TableHead>slot_type</TableHead>
                                <TableHead>price_per_hour</TableHead>
                                <TableHead>size</TableHead>
                                <TableHead>vehicle_type</TableHead>
                                <TableHead>Update</TableHead>
                                <TableHead>Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {slots.map((slots) => (
                                <TableRow key={slots.id}>
                                    <TableCell>{slots.slot_number}</TableCell>
                                    <TableCell>{slots.is_Booked}</TableCell>
                                    <TableCell>{slots.is_approved}</TableCell>
                                    <TableCell>{slots.slot_type}</TableCell>
                                    <TableCell>{slots.price_per_hour}</TableCell>
                                    <TableCell>{slots.size}</TableCell>
                                    <TableCell>{slots.vehicle_type}</TableCell>
                                    <TableCell><Button><Link href="/update/id" ><span>Update</span></Link></Button></TableCell>
                                    <TableCell><Button><Link href="/delete/id" ><span>Delete</span></Link></Button></TableCell>
                                    {/* <TableCell>
                                        {new Date(user.signedInAt).toLocaleString()}
                                    </TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );


}