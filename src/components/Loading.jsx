import { Skeleton } from "./ui/skeleton"
import { Card, CardContent, CardHeader } from "./ui/card"

export default function Loading() {
  return (
    <div className="h-screen w-full bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar skeleton */}
        <div className="hidden md:block w-64 bg-white border-r h-full">
          <div className="p-4 border-b">
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="p-4 border-b">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
            </div>
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <Skeleton className="h-10 w-48 mb-6" />

            {/* Stats cards skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <Skeleton className="h-4 w-24" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-16 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Tabs skeleton */}
            <div className="mb-4">
              <Skeleton className="h-10 w-full max-w-md" />
            </div>

            {/* Content skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <div className="border rounded-md p-4">
                    <div className="space-y-3">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="flex items-center">
                            <Skeleton className="h-4 w-4 mr-4" />
                            <Skeleton className="h-4 flex-1" />
                            <Skeleton className="h-4 w-24 mx-4" />
                            <Skeleton className="h-4 w-16 mx-4" />
                            <Skeleton className="h-4 w-24 mx-4" />
                            <Skeleton className="h-8 w-16" />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
