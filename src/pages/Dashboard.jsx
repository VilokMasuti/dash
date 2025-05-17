import ArticleStats from '../components/dashboard/ArticleStats';
import DashboardCards from '../components/dashboard/DashboardCards';
import RecentArticles from '../components/dashboard/RecentArticles';
import TopKeywords from '../components/dashboard/TopKeywords';
import DashboardLayout from '../components/layout/DashboardLayout';

const Dashboard = () => {
  return (
          <DashboardLayout>
<div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <DashboardCards />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ArticleStats />
          <div className="space-y-6">
            <RecentArticles />
            <TopKeywords />
          </div>
        </div>
      </div>
          </DashboardLayout>

  )
}
export default Dashboard
