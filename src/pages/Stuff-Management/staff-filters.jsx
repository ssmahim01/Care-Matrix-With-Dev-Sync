
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

export function StaffFilters({ staff, activeFilters, onFilterChange }) {
  const [availableRoles, setAvailableRoles] = useState([])
  const [isInitializing, setIsInitializing] = useState(true)

  // Extract unique roles from staff data
  useEffect(() => {
    if (staff && staff.length > 0) {
      const roles = [...new Set(staff.map((member) => member.role))].filter(Boolean)
      setAvailableRoles(roles)
      setIsInitializing(false)
    }
  }, [staff])

  const handleRoleToggle = (role) => {
    const updatedRoles = activeFilters.role.includes(role)
      ? activeFilters.role.filter((r) => r !== role)
      : [...activeFilters.role, role]

    onFilterChange({
      ...activeFilters,
      role: updatedRoles,
    })
  }

  const clearFilters = () => {
    onFilterChange({
      ...activeFilters,
      role: [],
    })
  }

  // Get role badge color
  const getRoleBadgeVariant = (role, isActive) => {
    if (isActive) return "default"

    switch (role.toLowerCase()) {
      case "doctor":
        return "outline"
      case "nurse":
        return "outline"
      case "admin":
        return "outline"
      case "patient":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <Card className="p-4 shadow-sm border">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Filters</h3>
          {activeFilters.role.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
              Clear all
            </Button>
          )}
        </div>

        <div>
          <h4 className="text-xs font-medium mb-2">Role</h4>
          <div className="flex flex-wrap gap-2">
            {isInitializing ? (
              <div className="animate-pulse flex space-x-2">
                <div className="h-6 w-16 bg-muted rounded-full"></div>
                <div className="h-6 w-20 bg-muted rounded-full"></div>
                <div className="h-6 w-14 bg-muted rounded-full"></div>
              </div>
            ) : availableRoles.length > 0 ? (
              availableRoles.map((role) => {
                const isActive = activeFilters.role.includes(role)
                return (
                  <Badge
                    key={role}
                    variant={getRoleBadgeVariant(role, isActive)}
                    className={`cursor-pointer transition-all duration-200 hover:bg-primary/90 capitalize ${
                      isActive ? "pl-2 pr-1 py-1" : "px-2 py-1"
                    }`}
                    onClick={() => handleRoleToggle(role)}
                  >
                    {role}
                    {isActive && (
                      <span className="ml-1 rounded-full hover:bg-primary-foreground/20 p-0.5">
                        <X className="h-3 w-3" />
                      </span>
                    )}
                  </Badge>
                )
              })
            ) : (
              <span className="text-xs text-muted-foreground">No roles available</span>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {activeFilters.role.length > 0
              ? `${activeFilters.role.length} filter${activeFilters.role.length > 1 ? "s" : ""} applied`
              : "No filters applied"}
          </div>
        </div>
      </div>
    </Card>
  )
}

