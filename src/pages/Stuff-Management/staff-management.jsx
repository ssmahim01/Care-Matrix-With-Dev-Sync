
import { useState, useEffect } from "react"
import { Search, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { fetchStaff } from "@/lib/stuff"
import { StaffTable } from "./staff-table"
import { StaffForm } from "./staff-form"
import { StaffFilters } from "./staff-filters"

export function StaffManagement() {
  const [staff, setStaff] = useState([])
  const [filteredStaff, setFilteredStaff] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState({
    department: [],
    role: [],
    status: [],
    shift: [],
  })

 


  const [activeTab, setActiveTab] = useState("all-staff")
  useEffect(() => {
    const loadStaff = async () => {
      try {
        setIsLoading(true)
        const data = await fetchStaff()
        setStaff(data)
        setFilteredStaff(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load staff data. Please try again.",
          variant: "destructive",
        })
        console.error("Failed to fetch staff:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStaff()
  }, [toast])

  useEffect(() => {
    // Apply filters and search
    let result = [...staff]

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.staffId.toLowerCase().includes(query) ||
          s.department.toLowerCase().includes(query) ||
          s.role.toLowerCase().includes(query),
      )
    }

    // Apply filters
    if (activeFilters.department.length > 0) {
      result = result.filter((s) => activeFilters.department.includes(s.department))
    }

    if (activeFilters.role.length > 0) {
      result = result.filter((s) => activeFilters.role.includes(s.role))
    }

    if (activeFilters.status.length > 0) {
      result = result.filter((s) => activeFilters.status.includes(s.status))
    }

    if (activeFilters.shift.length > 0) {
      result = result.filter((s) => activeFilters.shift.includes(s.shift))
    }

    setFilteredStaff(result)
  }, [staff, searchQuery, activeFilters])

  const handleRefresh = async () => {
    try {
      setIsLoading(true)
      const data = await fetchStaff()
      setStaff(data)
      toast({
        title: "Success",
        description: "Staff data refreshed successfully",
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Failed to refresh staff data",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleFilterChange = (filters) => {
    setActiveFilters(filters)
  }

  const handleStaffUpdated = () => {
    handleRefresh()
    setActiveTab("all-staff")
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <TabsList>
            <TabsTrigger className={`px-2`} value="all-staff">All Staff</TabsTrigger>
            <TabsTrigger className={`px-2`} value="add-staff">Add New Staff</TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search staff..." className="pl-8" value={searchQuery} onChange={handleSearch} />
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {showFilters && (
          <StaffFilters staff={staff} activeFilters={activeFilters} onFilterChange={handleFilterChange} />
        )}

        <TabsContent value="all-staff" className="mt-6">
          <StaffTable staff={filteredStaff} isLoading={isLoading} onStaffUpdated={handleStaffUpdated} />
        </TabsContent>

        <TabsContent value="add-staff" className="mt-6">
          <StaffForm onSuccess={handleStaffUpdated} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

