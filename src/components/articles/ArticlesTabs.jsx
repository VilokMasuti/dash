import { Link, useLocation } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

export  default function ArticlesTabs() {
  const location = useLocation()
  const currentPath = location.pathname

  const tabs = [
    { value: "generated", label: "Generated", path: "/articles/generated" },
    { value: "published", label: "Published", path: "/articles/published" },
    { value: "scheduled", label: "Scheduled", path: "/articles/scheduled" },
    { value: "archived", label: "Archived", path: "/articles/archived" },
  ]

  const getCurrentTab = () => {
    const tab = tabs.find((tab) => currentPath === tab.path)
    return tab ? tab.value : "generated"
  }

  return (
    <div className="mb-6">
      <Tabs value={getCurrentTab()} className="w-full">
        <TabsList className="w-full justify-start bg-white border-b rounded-none p-0 h-auto">
          {tabs.map((tab) => (
            <Link key={tab.value} to={tab.path} className="flex-1 sm:flex-none">
              <TabsTrigger
                value={tab.value}
                className={`rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none ${
                  currentPath === tab.path ? "border-blue-500 font-medium" : ""
                }`}
              >
                {tab.label}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}
