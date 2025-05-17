/* eslint-disable no-unused-vars */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export default function ArticleStats() {
  // Sample data for the chart
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Generated",
        data: [12, 19, 10, 5, 8, 15],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
      {
        label: "Published",
        data: [8, 12, 6, 4, 7, 10],
        backgroundColor: "rgba(16, 185, 129, 0.5)",
      },
    ],
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Article Statistics</CardTitle>
        <CardDescription>Number of articles generated and published over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {/* Chart would go here - using a placeholder */}
          <div className="flex h-full w-full items-center justify-center bg-gray-100 rounded-md">
            <p className="text-gray-500">Chart visualization would appear here</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
