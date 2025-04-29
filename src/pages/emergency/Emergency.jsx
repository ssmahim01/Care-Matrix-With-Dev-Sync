
import { cn } from "@/lib/utils"

import { useState } from "react"
import { Ambulance, AlertCircle, Clock, Users, Activity, Bell, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { format } from "date-fns"

export default function Emergency() {
 




  const [alerts, setAlerts] = useState([
    {
      id: 1,
      message: "Ambulance AMB-001 arriving in 5 minutes with cardiac patient",
      time: "11:25 AM",
      type: "urgent",
    },
    {
      id: 2,
      message: "ER Room 2 now available for emergency patients",
      time: "11:20 AM",
      type: "info",
    },
    {
      id: 3,
      message: "Code Blue initiated in ER Room 3",
      time: "11:15 AM",
      type: "critical",
    },
    {
      id: 4,
      message: "Dr. Johnson requested additional staff for trauma case",
      time: "11:10 AM",
      type: "urgent",
    },
    {
      id: 5,
      message: "New emergency patient registered at reception",
      time: "11:05 AM",
      type: "info",
    },
  ])

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "critical":
        return "bg-red-600 text-white"
      case "urgent":
        return "bg-orange-500 text-white"
      case "en route":
        return "bg-purple-500 text-white"
      case "non-urgent":
        return "bg-blue-500 text-white"
      case "dispatched":
        return "bg-purple-500 text-white"
      case "available":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getAlertColor = (type) => {
    switch (type) {
      case "critical":
        return "border-l-4 border-red-600 bg-red-50"
      case "urgent":
        return "border-l-4 border-orange-500 bg-orange-50"
      case "info":
        return "border-l-4 border-blue-500 bg-blue-50"
      default:
        return "border-l-4 border-gray-500 bg-gray-50"
    }
  }

  const { data: ambulance = [] } = useQuery({
    queryKey: ["ambulance"],
    queryFn: async () => {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/ambulance/all`)
      setAmbulances(data)
      return data
    }
  })

  const [ambulances, setAmbulances] = useState(ambulance)

  const { data: triage = [] } = useQuery({
    queryKey: ["triage"],
    queryFn: async () => {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/triage/all-triage`)
      setActiveEmergencies(data)
      return data
    }
  })

  const [activeEmergencies, setActiveEmergencies] = useState(triage)

  const { data = [] } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/emergency/contacts`)
      return data
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage all emergency cases and ambulance dispatches</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Clock className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Current Time:</span> {format(new Date(), "h:mm a")}
          </Button>
          <Link to={`/emergency/triage`}>
          <Button variant="destructive">
            <AlertCircle className="mr-2 h-4 w-4" />
            Declare Emergency
          </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Emergencies</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmergencies.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeEmergencies.filter((e) => e.priority === "critical").length} critical
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ambulances</CardTitle>
            <Ambulance className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ambulances.length}</div>
            <p className="text-xs text-muted-foreground">
              {ambulances.filter((a) => a.status === "available").length} available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Waiting Patients</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmergencies.filter(waiting=> waiting.status === "waiting").length}</div>
            <p className="text-xs text-muted-foreground">Average wait: 25 minutes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Emergency Contacts</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.length}</div>
            <Link to={`/emergency/contacts`} className="text-xs text-muted-foreground">Add emergency contact</Link>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="emergencies">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="emergencies">Active Emergencies</TabsTrigger>
          <TabsTrigger value="ambulances">Ambulance Status</TabsTrigger>
          <TabsTrigger value="alerts">Emergency Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="emergencies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeEmergencies.map((emergency) => (
              <Card key={emergency._id} className="overflow-hidden">
                <CardHeader className={cn("py-3", getStatusColor(emergency.priority))}>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium text-white">
                      {emergency._id.slice(-6)}: {emergency.name}
                    </CardTitle>
                    <Badge variant="outline" className="bg-white/20 text-white">
                      {emergency.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Status:</span>
                      <span className="capitalize">{emergency.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Complaint:</span>
                      <span>{emergency.complaint }</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Doctor:</span>
                      <span>{emergency.assignedDoctor || "N/A"}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Time:</span>
                      <span>{format(emergency.arrivalTime, "h:m a, d E MMMM")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" asChild>
              <Link to="/emergency/triage">
                Go to Triage Panel
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="ambulances" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {ambulances.map((ambulance) => (
              <Card key={ambulance._id}>
                <CardHeader className={cn("py-3 rounded-t-xl", getStatusColor(ambulance.status))}>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium text-white">{ambulance._id.slice(-6)}</CardTitle>
                    <Badge variant="outline" className="bg-white/20 text-white">
                      {ambulance.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  {ambulance.status !== "available" ? (
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Patient:</span>
                        <span>{ambulance.patientDetails.patientName}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Destination:</span>
                        <span className="capitalize">{ambulance.patientDetails.destination}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">ETA:</span>
                        <span>{ambulance.eta || "N/A"}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Priority:</span>
                        <span className="capitalize">{ambulance.patientDetails.priority}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-20">
                      <p className="text-muted-foreground">Available for dispatch</p>
                    </div>
                  )}
                </CardContent>

              </Card>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" asChild>
              <Link to="/emergency/ambulance-booking">
                To Ambulances
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Alerts</CardTitle>
              <CardDescription>Real-time alerts and notifications for emergency staff</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className={cn("p-3 rounded-md", getAlertColor(alert.type))}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-2">
                          <Bell
                            className={cn(
                              "h-5 w-5 mt-0.5",
                              alert.type === "critical"
                                ? "text-red-600"
                                : alert.type === "urgent"
                                  ? "text-orange-500"
                                  : "text-blue-500",
                            )}
                          />
                          <div>
                            <p className="font-medium">{alert.message}</p>
                            <p className="text-xs text-muted-foreground">{alert.time}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            alert.type === "critical"
                              ? "destructive"
                              : alert.type === "urgent"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {alert.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t p-4 bg-muted/40">
              <Link to={"/emergency/triage"}>
              <Button variant="outline" className="w-full">
                View All Emergency
              </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
