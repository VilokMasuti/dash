import { useState } from "react"
import { Button } from "../ui/button"
import { useAppContext } from "../../hooks/useAppContext.js"
import toast from "react-hot-toast"


export default function ArticleBulkActions({ selectedArticles, onClearSelection }) {
  const { deleteArticle } = useAppContext()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleBulkDelete = async () => {
    if (selectedArticles.length === 0) {
      toast.error("No articles selected")
      return
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedArticles.length} articles?`)) {
      return
    }

    setIsDeleting(true)

    try {
      // Process deletions sequentially to avoid race conditions
      for (const id of selectedArticles) {
        await deleteArticle(id)
      }

      toast.success(`${selectedArticles.length} articles deleted successfully`)
      onClearSelection()
    } catch (error) {
      console.error("Bulk delete error:", error)
      toast.error("Failed to delete some articles")
    } finally {
      setIsDeleting(false)
    }
  }

  if (selectedArticles.length === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2 mr-4">
      <span className="text-sm text-gray-500">
        {selectedArticles.length} {selectedArticles.length === 1 ? "item" : "items"} selected
      </span>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleBulkDelete}
        disabled={isDeleting}
        className="bg-red-500 hover:bg-red-600"
      >
        {isDeleting ? "Deleting..." : "Delete Selected"}
      </Button>
    </div>
  )
}
