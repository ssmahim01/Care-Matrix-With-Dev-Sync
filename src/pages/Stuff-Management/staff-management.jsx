import { useState, useEffect } from "react";
import { Search, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { StaffTable } from "./staff-table";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { StaffFilters } from "./staff-filters";
import { delay } from "@/lib/stuff";

// Move the main component content here
export function StaffManagement() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ role: [] });

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-requests"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-requests`
      );
      setStaff(data);
      return data;
    },
  });

  const [staff, setStaff] = useState(data);
  const [filteredStaff, setFilteredStaff] = useState(staff);

  // Update staff when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      setStaff(data);
    }
  }, [data]);

  // Update filtered staff when data or filters change
  useEffect(() => {
    if (!staff) {
      setFilteredStaff(null);
      return;
    }

    let result = [...staff];

    // Apply role filters
    if (activeFilters.role.length > 0) {
      result = result.filter((member) =>
        activeFilters.role.includes(member.role)
      );
    }

    setFilteredStaff(result);
  }, [staff, activeFilters]);

  const handleSearch = async (e) => {
    const search = e.target.value.toLowerCase();

    if (search.trim() === "") {
      refetch();
      return;
    }

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/user-requests/search-users?name=${search}`
      );
      setStaff(response.data);
    } catch (error) {
      console.error(
        "Error searching staff, falling back to client-side search:",
        error
      );
      // Fallback to client-side filtering if the search endpoint fails
      const filtered = staff.filter(
        (member) =>
          member.name.toLowerCase().includes(search) ||
          member.email.toLowerCase().includes(search) ||
          member.role.toLowerCase().includes(search)
      );
      setStaff(filtered);
    }
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="space-y-6">
      <Tabs>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search staff..."
                className="pl-8"
                // onChange={handleSearch}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={activeFilters.role.length > 0 ? "bg-primary/10" : ""}
              aria-expanded={showFilters}
            >
              <Filter
                className={`h-4 w-4 ${
                  activeFilters.role.length > 0 ? "text-primary" : ""
                }`}
              />
              <span className="sr-only">Toggle filters</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={async () => {
                setStaff(null);
                await delay(500);
                refetch();
              }}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${staff ? "" : "animate-spin"}`} />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            showFilters ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="transform transition-transform duration-300 ease-in-out">
            <StaffFilters
              staff={staff}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <TabsContent className="mt-6">
          <StaffTable
            staff={filteredStaff}
            isLoading={isLoading && !staff}
            refetch={refetch}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
