import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useAppContext } from "../../hooks/useAppContext.js"

export default function RecentArticles() {
  const { articles } = useAppContext()

  // Get the 5 most recent articles
  const recentArticles = [...articles].sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)).slice(0, 5)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Articles</CardTitle>
          <CardDescription>Your most recently created articles</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/articles/generated">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentArticles.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No articles found</p>
          ) : (
            recentArticles.map((article) => (
              <div key={article.id} className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{article.title}</p>
                  <p className="text-sm text-gray-500">{new Date(article.createdOn).toLocaleDateString()}</p>
                </div>
                <div className="text-sm text-gray-500">{article.words} words</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
