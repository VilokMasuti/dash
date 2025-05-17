"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { useAppContext } from "../../hooks/useAppContext.js"
import toast from "react-hot-toast"

export default  function ArticleDeleteDialog({ open, onOpenChange, articleId }) {
  const { deleteArticle } = useAppContext()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!articleId) return

    setIsDeleting(true)

    try {
      await deleteArticle(articleId)
      toast.success("Article deleted successfully")
    } catch (error) {
      toast.error("Failed to delete article")
      console.error("Delete error:", error)
    } finally {
      setIsDeleting(false)
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the article and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-500 hover:bg-red-600">
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
