/* eslint-disable no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

export default function AnalyticsCard({ title, value, change, icon: Icon, changeType = "neutral" }) {
  const isPositive = changeType === "positive" ? change > 0 : change < 0
  const isNegative = changeType === "positive" ? change < 0 : change > 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1">
          {change !== 0 && (
            <>
              {isPositive ? (
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              ) : isNegative ? (
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
              ) : null}
              <span
                className={`text-xs ${isPositive ? "text-green-500" : isNegative ? "text-red-500" : "text-gray-500"}`}
              >
                {change > 0 ? "+" : ""}
                {change}% from last month
              </span>
            </>
          )}
          {change === 0 && <span className="text-xs text-gray-500">No change from last month</span>}
        </div>
      </CardContent>
    </Card>
  )
}
