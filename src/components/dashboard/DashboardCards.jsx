import { Clock, FileText, Users, Zap } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';

export default function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <AnalyticsCard
        title="Total Articles"
        value="128"
        change={12}
        icon={FileText}
        changeType="positive"
      />
      <AnalyticsCard
        title="Published"
        value="84"
        change={8}
        icon={Zap}
        changeType="positive"
      />
      <AnalyticsCard
        title="Avg. Time to Publish"
        value="2.4 days"
        change={-15}
        icon={Clock}
        changeType="positive"
      />
      <AnalyticsCard
        title="Active Users"
        value="12"
        change={0}
        icon={Users}
        changeType="neutral"
      />
    </div>
  );
}
