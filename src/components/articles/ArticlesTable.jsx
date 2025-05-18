/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ChevronDown, ChevronUp, Search, ArrowUpDown, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useAppContext } from "../../hooks/useAppContext.js"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import  ArticlesTableSkeleton  from "./ArticlesTableSkeleton.jsx"
import  ArticleBulkActions  from "./ArticleBulkActions"

export default  function ArticlesTable({ category = "generated", limit, onDeleteArticle }) {
  const navigate = useNavigate()
  const { articles, isLoading, error } = useAppContext()

  // State for table functionality
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const [selectedArticles, setSelectedArticles] = useState([])
  const [entriesPerPage, setEntriesPerPage] = useState("10")

  // Handle sorting when a column header is clicked
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Sort articles based on current sort column and direction
  const sortedArticles = [...articles].sort((a, b) => {
    if (!sortColumn) return 0

    let valueA = a[sortColumn]
    let valueB = b[sortColumn]

    // Handle numeric sorting for word count
    if (sortColumn === "words") {
      valueA = Number(valueA)
      valueB = Number(valueB)
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Filter articles based on search term
  const filteredArticles = sortedArticles.filter(
    (article) =>
      article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.keyword?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Limit articles if limit prop is provided
  const displayedArticles = limit ? filteredArticles.slice(0, limit) : filteredArticles

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedArticles.length === displayedArticles.length) {
      setSelectedArticles([])
    } else {
      setSelectedArticles(displayedArticles.map((article) => article.id))
    }
  }

  // Handle individual article selection
  const handleSelectArticle = (id) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter((articleId) => articleId !== id))
    } else {
      setSelectedArticles([...selectedArticles, id])
    }
  }

  // Handle article view
  const handleViewArticle = (article) => {
    // In a real app, this would navigate to the article view page
    alert(`Viewing article: ${article.title}`)
  }

  // Handle article edit
  const handleEditArticle = (article) => {
    navigate(`/edit-article/${article.id}`)
  }

  // Clear selection after bulk actions
  const handleClearSelection = () => {
    setSelectedArticles([])
  }

  // Get appropriate sort icon for column headers
  const getSortIcon = (column) => {
    if (sortColumn !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <div className="text-center py-8">
          <div className="text-red-500 text-xl mb-2">Error loading articles</div>
          <p className="text-gray-600">{error.message || "Please try again later"}</p>
          <Button className="mt-4 bg-blue-500" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  // Render loading skeleton
  if (isLoading) {
    return <ArticlesTableSkeleton rowCount={limit || 5} />
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-4">
        {/* Search, bulk actions, and entries per page controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for Title & Keywords..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            {!limit && (
              <ArticleBulkActions selectedArticles={selectedArticles} onClearSelection={handleClearSelection} />
            )}

            <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-500">entries per page</span>
          </div>
        </div>

        {/* Articles table */}
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={selectedArticles.length === displayedArticles.length && displayedArticles.length > 0}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all articles"
                  />
                </TableHead>
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort("title")}>
                    Article Title
                    {getSortIcon("title")}
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort("keyword")}>
                    Keyword [Traffic]
                    {getSortIcon("keyword")}
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort("words")}>
                    Words
                    {getSortIcon("words")}
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => handleSort("createdOn")}>
                    Created On
                    {getSortIcon("createdOn")}
                  </div>
                </TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Publish</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedArticles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No articles found. Try adjusting your search or create a new article.
                  </TableCell>
                </TableRow>
              ) : (
                displayedArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedArticles.includes(article.id)}
                        onCheckedChange={() => handleSelectArticle(article.id)}
                        aria-label={`Select ${article.title}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-xs truncate">{article.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{article.keyword}</TableCell>
                    <TableCell>{article.words}</TableCell>
                    <TableCell>
                      {article.updatedOn ? (
                        <span title={`Updated: ${new Date(article.updatedOn).toLocaleString()}`}>
                          {new Date(article.createdOn).toLocaleDateString()}*
                        </span>
                      ) : (
                        new Date(article.createdOn).toLocaleDateString()
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-500 border-blue-200 hover:bg-blue-50"
                          onClick={() => handleViewArticle(article)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditArticle(article)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => onDeleteArticle && onDeleteArticle(article.id)}
                              className="text-red-500 focus:text-red-500"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        •
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
          <div className="text-sm text-gray-500">
            Total <span className="font-medium">{displayedArticles.length}</span> Article Titles
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled className="bg-blue-500 text-white">
              1
            </Button>
            <span>/</span>
            <span>1</span>
          </div>
        </div>
      </div>
    </div>
  )
}
