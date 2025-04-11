
import { cn } from "@/lib/utils"

import { useState } from "react"
import { Ambulance, AlertCircle, Clock, Users, Activity, Bell, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Link } from "react-router"

export default function Emergency() {
  const [activeEmergencies, setActiveEmergencies] = useState([
    {
      id: "EM-1234",
      patient: "John Doe",
      status: "Critical",
      time: "10:30 AM",
      location: "ER Room 3",
      doctor: "Dr. Sarah Johnson",
      type: "Cardiac Arrest",
    },
    {
      id: "EM-1235",
      patient: "Emily Clark",
      status: "Severe",
      time: "10:45 AM",
      location: "ER Room 1",
      doctor: "Dr. Michael Chen",
      type: "Severe Trauma",
    },
    {
      id: "EM-1236",
      patient: "Robert Wilson",
      status: "Moderate",
      time: "11:00 AM",
      location: "ER Room 4",
      doctor: "Dr. Lisa Wong",
      type: "Respiratory Distress",
    },
  ])

  const [ambulances, setAmbulances] = useState([
    {
      id: "AMB-001",
      status: "En Route",
      patient: "Maria Garcia",
      destination: "Main Hospital",
      eta: "5 min",
      dispatchTime: "11:20 AM",
    },
    {
      id: "AMB-002",
      status: "Dispatched",
      patient: "James Brown",
      destination: "Main Hospital",
      eta: "12 min",
      dispatchTime: "11:15 AM",
    },
    {
      id: "AMB-003",
      status: "Available",
      patient: null,
      destination: null,
      eta: null,
      dispatchTime: null,
    },
  ])

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
      case "severe":
        return "bg-orange-500 text-white"
      case "moderate":
        return "bg-yellow-500 text-white"
      case "en route":
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
            <span className="hidden sm:inline">Current Time:</span> 11:30 AM
          </Button>
          <Button variant="destructive">
            <AlertCircle className="mr-2 h-4 w-4" />
            Declare Emergency
          </Button>
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
              {activeEmergencies.filter((e) => e.status === "Critical").length} critical
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
              {ambulances.filter((a) => a.status === "Available").length} available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Waiting Patients</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Average wait: 25 minutes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ER Capacity</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">3 rooms available</p>
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
              <Card key={emergency.id} className="overflow-hidden">
                <CardHeader className={cn("py-3", getStatusColor(emergency.status))}>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium text-white">
                      {emergency.id}: {emergency.patient}
                    </CardTitle>
                    <Badge variant="outline" className="bg-white/20 text-white">
                      {emergency.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Type:</span>
                      <span>{emergency.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Location:</span>
                      <span>{emergency.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Doctor:</span>
                      <span>{emergency.doctor}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Time:</span>
                      <span>{emergency.time}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-3 bg-muted/40">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
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
              <Card key={ambulance.id}>
                <CardHeader className={cn("py-3", getStatusColor(ambulance.status))}>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium text-white">{ambulance.id}</CardTitle>
                    <Badge variant="outline" className="bg-white/20 text-white">
                      {ambulance.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  {ambulance.patient ? (
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Patient:</span>
                        <span>{ambulance.patient}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Destination:</span>
                        <span>{ambulance.destination}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">ETA:</span>
                        <span>{ambulance.eta}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Dispatched:</span>
                        <span>{ambulance.dispatchTime}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-20">
                      <p className="text-muted-foreground">Available for dispatch</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t p-3 bg-muted/40">
                  <Button
                    variant={ambulance.status === "Available" ? "default" : "outline"}
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link href="/emergency/ambulance-booking">
                      {ambulance.status === "Available" ? "Book Ambulance" : "Track Ambulance"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="outline" asChild>
              <Link href="/emergency/ambulance-booking">
                Manage Ambulances
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
              <Button variant="outline" className="w-full">
                View All Alerts
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
