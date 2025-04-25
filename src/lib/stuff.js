import axios from "axios"

// dummy data
export const mockStaff = [
  {
    id: "1",
    staffId: "STAFF-001",
    name: "John Doe",
    role: "Doctor",
    department: "Emergency",
    shift: "Morning",
    status: "Active",
    contact: "+1 (555) 123-4567",
    email: "john.doe@hospital.com",
    joiningDate: "2022-01-15",
    address: "123 Main St, City, State, ZIP",
    emergencyContact: "+1 (555) 987-6543",
    profileImage: "/placeholder.svg?height=200&width=200",
    notes: "Senior physician with 10 years of experience",
  },
  {
    id: "2",
    staffId: "STAFF-002",
    name: "Jane Smith",
    role: "Nurse",
    department: "ICU",
    shift: "Night",
    status: "Active",
    contact: "+1 (555) 234-5678",
    email: "jane.smith@hospital.com",
    joiningDate: "2022-03-10",
    address: "456 Oak St, City, State, ZIP",
    emergencyContact: "+1 (555) 876-5432",
    profileImage: "/placeholder.svg?height=200&width=200",
    notes: "Specialized in critical care",
  },
  {
    id: "3",
    staffId: "STAFF-003",
    name: "Robert Johnson",
    role: "Technician",
    department: "Radiology",
    shift: "Afternoon",
    status: "On Leave",
    contact: "+1 (555) 345-6789",
    email: "robert.johnson@hospital.com",
    joiningDate: "2022-05-20",
    address: "789 Pine St, City, State, ZIP",
    emergencyContact: "+1 (555) 765-4321",
    profileImage: "/placeholder.svg?height=200&width=200",
    notes: "On medical leave until next month",
  },
  {
    id: "4",
    staffId: "STAFF-004",
    name: "Emily Davis",
    role: "Receptionist",
    department: "Administration",
    shift: "Morning",
    status: "Active",
    contact: "+1 (555) 456-7890",
    email: "emily.davis@hospital.com",
    joiningDate: "2022-07-05",
    address: "101 Elm St, City, State, ZIP",
    emergencyContact: "+1 (555) 654-3210",
    profileImage: "/placeholder.svg?height=200&width=200",
    notes: "",
  },
  {
    id: "5",
    staffId: "STAFF-005",
    name: "Michael Wilson",
    role: "Pharmacist",
    department: "Pharmacy",
    shift: "Rotating",
    status: "Active",
    contact: "+1 (555) 567-8901",
    email: "michael.wilson@hospital.com",
    joiningDate: "2022-09-15",
    address: "202 Maple St, City, State, ZIP",
    emergencyContact: "+1 (555) 543-2109",
    profileImage: "/placeholder.svg?height=200&width=200",
    notes: "Certified in advanced pharmaceutical care",
  },
  {
    id: "6",
    staffId: "STAFF-006",
    name: "Sarah Brown",
    role: "Lab Technician",
    department: "Laboratory",
    shift: "Afternoon",
    status: "Resigned",
    contact: "+1 (555) 678-9012",
    email: "sarah.brown@hospital.com",
    joiningDate: "2022-11-10",
    address: "303 Cedar St, City, State, ZIP",
    emergencyContact: "+1 (555) 432-1098",
    profileImage: "/placeholder.svg?height=200&width=200",
    notes: "Resigned due to relocation",
  },
]


// Simulate API delay
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch all staff
export async function fetchStaff() {
  // Simulate API call
  return await axios.get(`${import.meta.env.VITE_API_URL}/users`)
  // return [...mockStaff]
}

// Create new staff
export async function createStaff(data) {
  // Simulate API call
  await delay(1500)

  // In a real implementation, you would send the FormData to your API
  // For now, we'll create a mock staff object
  const newStaff = {
    id: `${mockStaff.length + 1}`,
    staffId: data.get("staffId"),
    name: data.get("name"),
    role: data.get("role"),
    department: data.get("department"),
    shift: data.get("shift"),
    status: data.get("status"),
    contact: data.get("contact"),
    email: data.get("email"),
    joiningDate: data.get("joiningDate"),
    address: (data.get("address")) || "",
    emergencyContact: (data.get("emergencyContact")) || "",
    profileImage: "/placeholder.svg?height=200&width=200", // In a real app, this would be the uploaded image URL
    notes: (data.get("notes")) || "",
  }

  // In a real implementation, you would add this to your database
  mockStaff.push(newStaff)

  return newStaff
}

// Update existing staff
export async function updateStaff(id, data) {
  // Simulate API call
  await delay(1500)

  // Find the staff to update
  const staffIndex = mockStaff.findIndex((s) => s.id === id)
  if (staffIndex === -1) {
    throw new Error("Staff not found")
  }

  // Update the staff data
  const updatedStaff = {
    ...mockStaff[staffIndex],
    staffId: (data.get("staffId")) || mockStaff[staffIndex].staffId,
    name: (data.get("name")) || mockStaff[staffIndex].name,
    role: (data.get("role")) || mockStaff[staffIndex].role,
    department: (data.get("department")) || mockStaff[staffIndex].department,
    shift: (data.get("shift")) || mockStaff[staffIndex].shift,
    status: (data.get("status")) || mockStaff[staffIndex].status,
    contact: (data.get("contact")) || mockStaff[staffIndex].contact,
    email: (data.get("email")) || mockStaff[staffIndex].email,
    joiningDate: (data.get("joiningDate")) || mockStaff[staffIndex].joiningDate,
    address: (data.get("address")) || mockStaff[staffIndex].address,
    emergencyContact: (data.get("emergencyContact")) || mockStaff[staffIndex].emergencyContact,
    notes: (data.get("notes")) || mockStaff[staffIndex].notes,
  }

  // In a real implementation, you would update this in your database
  mockStaff[staffIndex] = updatedStaff

  return updatedStaff
}

// Delete staff
export async function deleteStaff(id) {
  // Simulate API call
  await delay(1000)

  // Find the staff to delete
  const staffIndex = mockStaff.findIndex((s) => s.id === id)
  if (staffIndex === -1) {
    throw new Error("Staff not found")
  }

  // In a real implementation, you would delete this from your database
  mockStaff.splice(staffIndex, 1)
}

// Assign shift to staff
export async function assignShift(staffId, shiftData){
  // Simulate API call
  await delay(1000)

  // Find the staff to update
  const staffIndex = mockStaff.findIndex((s) => s.id === staffId)
  if (staffIndex === -1) {
    throw new Error("Staff not found")
  }

  // Update the staff shift
  mockStaff[staffIndex].shift = shiftData.shift

  // In a real implementation, you would also store the shift schedule details
}

// Assign emergency duty to staff
export async function assignEmergencyDuty(staffId, dutyData) {
  // Simulate API call
  await delay(1000)

  // Find the staff to update
  const staffIndex = mockStaff.findIndex((s) => s.id === staffId)
  if (staffIndex === -1) {
    throw new Error("Staff not found")
  }

  // In a real implementation, you would store the emergency duty details
  // For now, we'll just update the staff notes to reflect the emergency assignment
  mockStaff[staffIndex].notes =
    `${mockStaff[staffIndex].notes} | EMERGENCY DUTY: ${dutyData.emergencyType} on ${dutyData.date}`.trim()
}

// Send message to staff
export async function sendStaffMessage(staffId, messageData) {
  // Simulate API call
  await delay(1000)

  // Find the staff to message
  const staffIndex = mockStaff.findIndex((s) => s.id === staffId)
  if (staffIndex === -1) {
    throw new Error("Staff not found")
  }

  // In a real implementation, you would store the message and send it to the staff
  // For now, we'll just log it
  // console.log(`Message sent to ${mockStaff[staffIndex].name}: ${messageData.subject}`)
}
