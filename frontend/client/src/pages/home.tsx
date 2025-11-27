import { YouthDashboard } from "@/components/dashboards/youth-dashboard";
import { LeaderDashboard } from "@/components/dashboards/leader-dashboard";
import { NGODashboard } from "@/components/dashboards/ngo-dashboard";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { user } = useAuth();

  if (user?.role === 'leader' || user?.role === 'moderator') {
    return <LeaderDashboard />;
  }

  if (user?.role === 'ngo') {
    return <NGODashboard />;
  }

  // Default to Youth Dashboard
  return <YouthDashboard />;
}
