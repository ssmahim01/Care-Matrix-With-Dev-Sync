
import { useState, useEffect } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


export function StaffFilters({ staff, activeFilters, onFilterChange }) {
  const [departments, setDepartments] = useState([])
  const [roles, setRoles] = useState([])
  const [shifts, setShifts] = useState([])
  const [statuses, setStatuses] = useState([])

  useEffect(() => {
    // Extract unique values from staff data
    const uniqueDepartments = [...new Set(staff.map((s) => s.department))].filter(Boolean)
    const uniqueRoles = [...new Set(staff.map((s) => s.role))].filter(Boolean)
    const uniqueShifts = [...new Set(staff.map((s) => s.shift))].filter(Boolean)
    const uniqueStatuses = [...new Set(staff.map((s) => s.status))].filter(Boolean)

    setDepartments(uniqueDepartments)
    setRoles(uniqueRoles)
    setShifts(uniqueShifts)
    setStatuses(uniqueStatuses)
  }, [staff])

  const handleFilterToggle = (type, value) => {
    const newFilters = { ...activeFilters }

    if (newFilters[type].includes(value)) {
      newFilters[type] = newFilters[type].filter((v) => v !== value)
    } else {
      newFilters[type] = [...newFilters[type], value]
    }

    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    onFilterChange({
      department: [],
      role: [],
      status: [],
      shift: [],
    })
  }

  const totalActiveFilters =
    activeFilters.department.length +
    activeFilters.role.length +
    activeFilters.status.length +
    activeFilters.shift.length

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
              Department
              {activeFilters.department.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                  {activeFilters.department.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search department..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {departments.map((department) => {
                    const isSelected = activeFilters.department.includes(department)
                    return (
                      <CommandItem key={department} onSelect={() => handleFilterToggle("department", department)}>
                        <div
                          className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${
                            isSelected ? "bg-primary border-primary" : "opacity-50"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <span>{department}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
              Role
              {activeFilters.role.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                  {activeFilters.role.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search role..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {roles.map((role) => {
                    const isSelected = activeFilters.role.includes(role)
                    return (
                      <CommandItem key={role} onSelect={() => handleFilterToggle("role", role)}>
                        <div
                          className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${
                            isSelected ? "bg-primary border-primary" : "opacity-50"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <span>{role}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
              Shift
              {activeFilters.shift.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                  {activeFilters.shift.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search shift..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {shifts.map((shift) => {
                    const isSelected = activeFilters.shift.includes(shift)
                    return (
                      <CommandItem key={shift} onSelect={() => handleFilterToggle("shift", shift)}>
                        <div
                          className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${
                            isSelected ? "bg-primary border-primary" : "opacity-50"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <span>{shift}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 border-dashed">
              Status
              {activeFilters.status.length > 0 && (
                <Badge variant="secondary" className="ml-2 rounded-sm px-1 font-normal">
                  {activeFilters.status.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search status..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {statuses.map((status) => {
                    const isSelected = activeFilters.status.includes(status)
                    return (
                      <CommandItem key={status} onSelect={() => handleFilterToggle("status", status)}>
                        <div
                          className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${
                            isSelected ? "bg-primary border-primary" : "opacity-50"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                        </div>
                        <span>{status}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {totalActiveFilters > 0 && (
          <Button variant="ghost" size="sm" className="h-8" onClick={clearFilters}>
            Clear Filters
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.department.map((dept) => (
            <Badge key={`dept-${dept}`} variant="secondary" className="px-2 py-1">
              {dept}
              <button
                className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleFilterToggle("department", dept)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {dept} filter</span>
              </button>
            </Badge>
          ))}
          {activeFilters.role.map((role) => (
            <Badge key={`role-${role}`} variant="secondary" className="px-2 py-1">
              {role}
              <button
                className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleFilterToggle("role", role)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {role} filter</span>
              </button>
            </Badge>
          ))}
          {activeFilters.shift.map((shift) => (
            <Badge key={`shift-${shift}`} variant="secondary" className="px-2 py-1">
              {shift}
              <button
                className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleFilterToggle("shift", shift)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {shift} filter</span>
              </button>
            </Badge>
          ))}
          {activeFilters.status.map((status) => (
            <Badge key={`status-${status}`} variant="secondary" className="px-2 py-1">
              {status}
              <button
                className="ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => handleFilterToggle("status", status)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {status} filter</span>
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

