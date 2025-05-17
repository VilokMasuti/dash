import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export default function TopKeywords() {
  // Sample data for top keywords
  const keywords = [
    { keyword: "best gaming laptop", traffic: 12500 },
    { keyword: "mechanical keyboard", traffic: 8700 },
    { keyword: "wireless earbuds", traffic: 7200 },
    { keyword: "smart home devices", traffic: 6500 },
    { keyword: "budget smartphones", traffic: 5800 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Keywords</CardTitle>
        <CardDescription>Your highest traffic keywords</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {keywords.map((item) => (
            <div key={item.keyword} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">{item.keyword}</p>
              </div>
              <div className="text-sm font-medium">{item.traffic.toLocaleString()} visits</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
