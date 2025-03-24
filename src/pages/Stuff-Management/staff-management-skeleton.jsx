export function StaffManagementSkeleton() {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="h-10 w-48 bg-muted rounded-md animate-pulse"></div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="h-10 w-full sm:w-[300px] bg-muted rounded-md animate-pulse"></div>
            <div className="h-10 w-10 bg-muted rounded-md animate-pulse"></div>
            <div className="h-10 w-10 bg-muted rounded-md animate-pulse"></div>
          </div>
        </div>
  
        <div className="rounded-md border">
          <div className="h-12 border-b bg-muted/50"></div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-16 border-b flex items-center px-4">
              <div className="space-y-2 w-full">
                <div className="flex items-center gap-4">
                  <div className="h-8 w-20 bg-muted rounded-md animate-pulse"></div>
                  <div className="h-8 w-32 bg-muted rounded-md animate-pulse"></div>
                  <div className="h-8 w-24 bg-muted rounded-md animate-pulse"></div>
                  <div className="h-8 w-28 bg-muted rounded-md animate-pulse"></div>
                  <div className="h-8 w-20 bg-muted rounded-md animate-pulse"></div>
                  <div className="h-8 w-16 bg-muted rounded-md animate-pulse"></div>
                  <div className="h-8 w-32 bg-muted rounded-md animate-pulse"></div>
                  <div className="h-8 w-10 ml-auto bg-muted rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  