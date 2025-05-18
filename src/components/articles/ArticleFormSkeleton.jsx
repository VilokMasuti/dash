import { Skeleton } from "../ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

export default function ArticleFormSkeleton() {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Skeleton className="h-10 w-10 mr-4" />
        <Skeleton className="h-10 w-48" />
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-40 w-full" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    </div>
  )
}
