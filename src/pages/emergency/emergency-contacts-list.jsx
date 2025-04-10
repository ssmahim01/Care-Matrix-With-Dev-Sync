
import { useState } from "react"
import { Phone, Plus, Edit, Trash, Search, Hospital, Ambulance, ShieldAlert, Flame } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmergencyContactsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "City General Hospital",
      type: "hospital",
      phone: "555-123-4567",
      address: "123 Medical Center Blvd, City Center",
      email: "emergency@citygeneral.org",
      available: true,
    },
    {
      id: 2,
      name: "Rapid Response Ambulance",
      type: "ambulance",
      phone: "555-911-0000",
      address: "45 Emergency Drive, City Center",
      email: "dispatch@rapidambulance.com",
      available: true,
    },
    {
      id: 3,
      name: "City Police Department",
      type: "police",
      phone: "555-911-1234",
      address: "789 Law Enforcement Ave, City Center",
      email: "emergency@citypd.gov",
      available: true,
    },
    {
      id: 4,
      name: "City Fire Department",
      type: "fire",
      phone: "555-911-5678",
      address: "567 Firefighter Lane, City Center",
      email: "dispatch@cityfire.gov",
      available: true,
    },
    {
      id: 5,
      name: "Westside Medical Center",
      type: "hospital",
      phone: "555-987-6543",
      address: "456 Healthcare Pkwy, Westside",
      email: "emergency@westsidemedical.org",
      available: true,
    },
    {
      id: 6,
      name: "Eastside Emergency Clinic",
      type: "hospital",
      phone: "555-765-4321",
      address: "789 Urgent Care St, Eastside",
      email: "help@eastsideclinic.org",
      available: false,
    },
    {
      id: 7,
      name: "Lifeline Ambulance Services",
      type: "ambulance",
      phone: "555-247-8899",
      address: "321 Rescue Road, North District",
      email: "dispatch@lifelineambulance.com",
      available: true,
    },
    {
      id: 8,
      name: "County Sheriff's Office",
      type: "police",
      phone: "555-911-3344",
      address: "100 County Line Rd, County Center",
      email: "emergency@countysheriff.gov",
      available: true,
    },
  ])

  const getTypeIcon = (type) => {
    switch (type) {
      case "hospital":
        return <Hospital className="h-4 w-4 text-blue-600" />
      case "ambulance":
        return <Ambulance className="h-4 w-4 text-red-600" />
      case "police":
        return <ShieldAlert className="h-4 w-4 text-blue-800" />
      case "fire":
        return <Flame className="h-4 w-4 text-orange-600" />
      default:
        return <Phone className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case "hospital":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Hospital
          </Badge>
        )
      case "ambulance":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Ambulance
          </Badge>
        )
      case "police":
        return (
          <Badge variant="outline" className="bg-blue-900 text-white hover:bg-blue-900">
            Police
          </Badge>
        )
      case "fire":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            Fire Dept
          </Badge>
        )
      default:
        return <Badge variant="outline">Other</Badge>
    }
  }

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery) ||
      contact.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddContact = (e) => {
    e.preventDefault()
    // In a real app, you would add the contact to the database
    setIsAddDialogOpen(false)
  }

  const handleEditContact = (e) => {
    e.preventDefault()
    // In a real app, you would update the contact in the database
    setIsEditDialogOpen(false)
  }

  const handleDeleteContact = (id) => {
    // In a real app, you would delete the contact from the database
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  const openEditDialog = (contact) => {
    setSelectedContact(contact)
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Contacts</h1>
          <p className="text-muted-foreground">Manage and access emergency contacts for quick response</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Emergency Contact</DialogTitle>
                <DialogDescription>Add a new emergency contact to the system.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddContact}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospital">Hospital</SelectItem>
                        <SelectItem value="ambulance">Ambulance</SelectItem>
                        <SelectItem value="police">Police</SelectItem>
                        <SelectItem value="fire">Fire Department</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input id="phone" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Input id="address" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" type="email" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Contact</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="hospital">Hospitals</TabsTrigger>
          <TabsTrigger value="ambulance">Ambulance</TabsTrigger>
          <TabsTrigger value="police">Police</TabsTrigger>
          <TabsTrigger value="fire">Fire Dept</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Emergency Contacts</CardTitle>
              <CardDescription>List of all emergency contacts in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="hidden md:table-cell">Address</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(contact.type)}
                          {contact.name}
                        </div>
                      </TableCell>
                      <TableCell>{getTypeLabel(contact.type)}</TableCell>
                      <TableCell>
                        <a
                          href={`tel:${contact.phone}`}
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </a>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{contact.address}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                          {contact.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <Badge variant={contact.available ? "success" : "destructive"}>
                          {contact.available ? "Available" : "Unavailable"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(contact)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="hospital">
          <Card>
            <CardHeader>
              <CardTitle>Hospital Contacts</CardTitle>
              <CardDescription>List of all hospital emergency contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="hidden md:table-cell">Address</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts
                    .filter((contact) => contact.type === "hospital")
                    .map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Hospital className="h-4 w-4 text-blue-600" />
                            {contact.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </a>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{contact.address}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                            {contact.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge variant={contact.available ? "success" : "destructive"}>
                            {contact.available ? "Available" : "Unavailable"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(contact)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)}>
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ambulance">
          <Card>
            <CardHeader>
              <CardTitle>Ambulance Services</CardTitle>
              <CardDescription>List of all ambulance service contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="hidden md:table-cell">Address</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts
                    .filter((contact) => contact.type === "ambulance")
                    .map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Ambulance className="h-4 w-4 text-red-600" />
                            {contact.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </a>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{contact.address}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                            {contact.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge variant={contact.available ? "success" : "destructive"}>
                            {contact.available ? "Available" : "Unavailable"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(contact)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)}>
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="police">
          <Card>
            <CardHeader>
              <CardTitle>Police Contacts</CardTitle>
              <CardDescription>List of all police emergency contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="hidden md:table-cell">Address</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts
                    .filter((contact) => contact.type === "police")
                    .map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4 text-blue-800" />
                            {contact.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </a>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{contact.address}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                            {contact.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge variant={contact.available ? "success" : "destructive"}>
                            {contact.available ? "Available" : "Unavailable"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(contact)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)}>
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="fire">
          <Card>
            <CardHeader>
              <CardTitle>Fire Department Contacts</CardTitle>
              <CardDescription>List of all fire department emergency contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead className="hidden md:table-cell">Address</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts
                    .filter((contact) => contact.type === "fire")
                    .map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Flame className="h-4 w-4 text-orange-600" />
                            {contact.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center gap-1 text-blue-600 hover:underline"
                          >
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </a>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{contact.address}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                            {contact.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge variant={contact.available ? "success" : "destructive"}>
                            {contact.available ? "Available" : "Unavailable"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(contact)}>
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)}>
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Emergency Contact</DialogTitle>
            <DialogDescription>Update the emergency contact information.</DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <form onSubmit={handleEditContact}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right">
                    Name
                  </Label>
                  <Input id="edit-name" className="col-span-3" defaultValue={selectedContact.name} required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-type" className="text-right">
                    Type
                  </Label>
                  <Select defaultValue={selectedContact.type}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="ambulance">Ambulance</SelectItem>
                      <SelectItem value="police">Police</SelectItem>
                      <SelectItem value="fire">Fire Department</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="edit-phone" className="col-span-3" defaultValue={selectedContact.phone} required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-address" className="text-right">
                    Address
                  </Label>
                  <Input id="edit-address" className="col-span-3" defaultValue={selectedContact.address} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">
                    Email
                  </Label>
                  <Input id="edit-email" type="email" className="col-span-3" defaultValue={selectedContact.email} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Status
                  </Label>
                  <Select defaultValue={selectedContact.available ? "available" : "unavailable"}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
