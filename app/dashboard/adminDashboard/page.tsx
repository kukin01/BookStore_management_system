"use client"
import { useState, useEffect } from "react"
import { ParkingSlot,newUsers, BookingRequest } from "@/types/user"
import { Card, CardHeader,CardTitle,CardContent } from "@/components/ui/card"
import { Table,TableBody,TableCell,TableHeader,TableRow, TableHead } from "@/components/ui/table"

export default function AdminDashboard() {
    const [slots, setSlots] = useState<ParkingSlot[]>([])
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
                  {slots.filter(s => s.status === "available").length} / {slots.length}
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
                {/* Similar table structure for requests */}
              </Table>
            </CardContent>
          </Card>
        </div>
      );

    
}