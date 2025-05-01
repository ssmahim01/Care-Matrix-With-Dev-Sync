
import { useEffect, useState } from "react"
import { Phone, Edit, Trash, Search, Hospital, Ambulance, ShieldAlert, Flame } from "lucide-react"
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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import AddEmergencyContact from "@/components/emergency/Add-emergency-contact"
import { toast } from "react-hot-toast"
import { motion, AnimatePresence } from 'framer-motion'
import useRole from "@/hooks/useRole"

export default function EmergencyContactsList() {
  const [role] = useRole()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [loading, setLoading] = useState(false);

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/emergency/contacts`)
      setContacts(res.data)
      return res.data
    }
  })

  const [contacts, setContacts] = useState(data)


  useEffect(() => {
    if (data && data.length > 0) {
      setContacts(data)
    }
  }, [data])

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

  const handleAddContact = async (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value;
    const type = form.type.value
    const phone = form.phone.value
    const address = form.address.value
    const email = form.email.value
    const available = form.available.value === "Yes"
    const contact = { name, type, phone, address, email, available }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/emergency/add-contact`, contact)
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Something went wrong');
    } finally {
      refetch()
      setIsAddDialogOpen(false)
    }
  }

  const handleEditContact = async (e) => {
    e.preventDefault()
    const form = e.target;
    const name = form.editName.value;
    const type = form.editType.value;
    const phone = form.editPhone.value;
    const address = form.editAddress.value;
    const email = form.editEmail.value;
    const available = form.availability.value === "available"


    const updatedContact = { name, type, phone, address, available };

    try {
      if (!selectedContact?._id) {
        return toast.error('No contact selected for editing');
      }
      setLoading(true)
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/emergency/update-contact/${selectedContact._id}`,
        updatedContact
      );

      toast.success(res.data.message || 'Contact updated successfully');

      // Reset form and close dialog
      form.reset();
      setIsEditDialogOpen(false);
      refetch(); // Refresh contact list
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || error.message || 'Failed to update contact';
      toast.error(errorMessage);
    } finally {
      setLoading(false)
      refetch()
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteContact = (id) => {
    if(role !== "administrator") return toast.error("Admin Only")
    toast.custom((t) => (
      <AnimatePresence>
        {t.visible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md mx-auto flex flex-col items-center justify-center text-center space-y-4 z-[9999] border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-800">Are you absolutely sure?</h2>
            <p className="text-sm text-gray-600">This action cannot be undone.</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={async () => {
                  toast.dismiss(t.id);
                  try {
                    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/emergency/delete-contact/${id}`);
                    toast.success(res.data.message);
                  } catch (error) {
                    toast.error(error.message || 'Something went wrong');
                  } finally {
                    refetch();
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all duration-150"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    ), { position: 'top-center', duration: Infinity });
  };

  const openEditDialog = (contact) => {
    
    if(role !== "administrator") return toast.error("Admin Only")
    setSelectedContact(contact)
    setIsEditDialogOpen(true)
  }

  const handleSearch = async (value) => {
    if (value.trim() === "") {
      refetch()
      return
    }
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/emergency/search?name=${value}`)
      setContacts(res.data)
    } catch (error) {
      // console.log(error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Contacts</h1>
          <p className="text-muted-foreground">Manage and access emergency contacts for quick response</p>
        </div>
        <AddEmergencyContact
          handleAddContact={handleAddContact}
          isAddDialogOpen={isAddDialogOpen}
          setIsAddDialogOpen={setIsAddDialogOpen} />
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {contacts.length === 0
        ?
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <p className="text-muted-foreground mb-4">No staff members found</p>
          <Button onClick={() => refetch()}>Refresh</Button>
        </div>
        :
        isLoading
          ?
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
          :
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="hospital">Hospitals</TabsTrigger>
              <TabsTrigger value="ambulance">Ambulance</TabsTrigger>
              <TabsTrigger value="police">Police</TabsTrigger>
              <TabsTrigger value="fire">Fire Dept</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card className={`py-3`}>
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
                      {contacts.map((contact) => (
                        <TableRow key={contact._id}>
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
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact._id)}>
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
                      {contacts
                        .filter((contact) => contact.type === "hospital")
                        .map((contact) => (
                          <TableRow key={contact._id}>
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
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact._id)}>
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
                      {contacts
                        .filter((contact) => contact.type === "ambulance")
                        .map((contact) => (
                          <TableRow key={contact._id}>
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
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact._id)}>
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
                      {contacts
                        .filter((contact) => contact.type === "police")
                        .map((contact) => (
                          <TableRow key={contact._id}>
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
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact._id)}>
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
                      {contacts
                        .filter((contact) => contact.type === "fire")
                        .map((contact) => (
                          <TableRow key={contact._id}>
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
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact._id)}>
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
      }

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
                  <Label htmlFor="editName" className="text-right">
                    Name
                  </Label>
                  <Input name="editName" className="col-span-3" defaultValue={selectedContact.name} required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editType" className="text-right">
                    Type
                  </Label>
                  <Select name='editType' defaultValue={selectedContact.type}>
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
                  <Label htmlFor="editPhone" className="text-right">
                    Phone
                  </Label>
                  <Input id="editPhone" className="col-span-3" defaultValue={selectedContact.phone} required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editAddress" className="text-right">
                    Address
                  </Label>
                  <Input id="editAddress" className="col-span-3" defaultValue={selectedContact.address} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="editEmail" className="text-right">
                    Email
                  </Label>
                  <Input id="editEmail" disabled readOnly type="email" className="col-span-3" defaultValue={selectedContact.email} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Status
                  </Label>
                  <Select name='availability' defaultValue={selectedContact.available ? "available" : "unavailable"}>
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
                <Button
                  disabled={loading}
                  type="submit">
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
