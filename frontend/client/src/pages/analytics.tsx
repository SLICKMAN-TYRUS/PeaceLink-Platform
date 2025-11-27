import { Header, BottomNav } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Users, FileText, MessageSquare, CheckCircle2, AlertTriangle, Download, Eye, MapPin } from "lucide-react";
import {
  ANALYTICS_OVERVIEW,
  REGIONAL_DATA,
  CATEGORY_DATA,
  TIME_SERIES_DATA,
  IMPACT_METRICS,
  USER_DEMOGRAPHICS,
  RESOLUTION_STATS,
  ACTIVE_COMMUNITIES,
  TRENDING_TOPICS,
  RESOURCE_ENGAGEMENT,
  ALERT_LEVELS,
  CHART_COLORS,
} from "@/lib/analytics-data";

export default function Analytics() {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 pb-24">
      <Header title="Analytics Dashboard" />
      
      <div className="p-4 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-foreground">{ANALYTICS_OVERVIEW.totalReports.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Total Reports</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-foreground">{ANALYTICS_OVERVIEW.registeredUsers.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Active Users</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-white">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-foreground">{ANALYTICS_OVERVIEW.resolvedIssues.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Issues Resolved</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-100 bg-gradient-to-br from-orange-50 to-white">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-foreground">{ANALYTICS_OVERVIEW.activeForums.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Active Forums</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full mb-4 grid grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="regional" className="text-xs">Regional</TabsTrigger>
            <TabsTrigger value="trends" className="text-xs">Trends</TabsTrigger>
            <TabsTrigger value="impact" className="text-xs">Impact</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Issue Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Issue Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {CATEGORY_DATA.map((cat) => (
                    <div key={cat.category} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{cat.category}</span>
                          {getTrendIcon(cat.trend)}
                        </div>
                        <span className="text-muted-foreground">{cat.count}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${cat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Demographics Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">User Demographics</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={USER_DEMOGRAPHICS}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={3}
                      dataKey="count"
                      label={({ role, percentage }) => `${role} ${percentage}%`}
                      labelStyle={{ fontSize: 10 }}
                    >
                      {USER_DEMOGRAPHICS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS.gradient[index % CHART_COLORS.gradient.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Resolution Time */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Average Resolution Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {RESOLUTION_STATS.map((stat) => (
                    <div key={stat.timeframe} className="text-center p-3 bg-secondary/30 rounded-lg">
                      <p className="text-xl font-bold text-foreground">{stat.count}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{stat.timeframe}</p>
                      <Badge variant="outline" className="mt-1 text-[9px]">{stat.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Regional Tab */}
          <TabsContent value="regional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Reports by State</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={REGIONAL_DATA} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" fontSize={10} />
                    <YAxis dataKey="state" type="category" fontSize={10} width={120} />
                    <Tooltip />
                    <Bar dataKey="reports" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Alert Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Alert Levels by Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {ALERT_LEVELS.map((alert) => (
                    <div key={alert.state} className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium">{alert.state}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          style={{ borderColor: alert.color, color: alert.color }}
                          className="text-[9px] uppercase"
                        >
                          {alert.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.alerts} alerts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-4">
            {/* Time Series */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Activity Trends (6 Months)</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TIME_SERIES_DATA}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" fontSize={10} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="reports" stroke={CHART_COLORS.primary} strokeWidth={2} />
                    <Line type="monotone" dataKey="forums" stroke={CHART_COLORS.secondary} strokeWidth={2} />
                    <Line type="monotone" dataKey="users" stroke={CHART_COLORS.success} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Trending Forum Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {TRENDING_TOPICS.map((topic, index) => (
                    <div key={topic.topic} className="p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[9px]">#{index + 1}</Badge>
                          <span className="text-xs font-medium">{topic.topic}</span>
                        </div>
                        <Badge variant="secondary" className="text-[9px]">{topic.engagement}% engagement</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {topic.posts}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {topic.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Resource Engagement</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={RESOURCE_ENGAGEMENT}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="category" fontSize={10} angle={-15} textAnchor="end" height={60} />
                    <YAxis fontSize={10} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="downloads" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="views" fill={CHART_COLORS.info} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-4">
            {/* Impact Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-2 border-green-100">
                <CardContent className="p-4 text-center">
                  <CheckCircle2 className="h-10 w-10 mx-auto mb-2 text-green-600" />
                  <p className="text-3xl font-bold text-foreground">{IMPACT_METRICS.issuesResolved.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Issues Resolved</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-100">
                <CardContent className="p-4 text-center">
                  <Users className="h-10 w-10 mx-auto mb-2 text-blue-600" />
                  <p className="text-3xl font-bold text-foreground">{IMPACT_METRICS.communitiesReached.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Communities Reached</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-100">
                <CardContent className="p-4 text-center">
                  <MessageSquare className="h-10 w-10 mx-auto mb-2 text-purple-600" />
                  <p className="text-3xl font-bold text-foreground">{IMPACT_METRICS.peaceDialogues.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Peace Dialogues</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-100">
                <CardContent className="p-4 text-center">
                  <Download className="h-10 w-10 mx-auto mb-2 text-orange-600" />
                  <p className="text-3xl font-bold text-foreground">{IMPACT_METRICS.resourcesShared.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Resources Shared</p>
                </CardContent>
              </Card>
            </div>

            {/* Most Active Communities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Most Active Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ACTIVE_COMMUNITIES.map((community, index) => (
                    <div key={community.name} className="p-3 bg-secondary/30 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className="text-[9px] h-5 w-5 p-0 flex items-center justify-center">
                            {index + 1}
                          </Badge>
                          <span className="text-sm font-medium">{community.name}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 bg-background rounded">
                          <p className="text-xs font-bold text-foreground">{community.members}</p>
                          <p className="text-[9px] text-muted-foreground">Members</p>
                        </div>
                        <div className="p-2 bg-background rounded">
                          <p className="text-xs font-bold text-foreground">{community.posts}</p>
                          <p className="text-[9px] text-muted-foreground">Posts</p>
                        </div>
                        <div className="p-2 bg-background rounded">
                          <p className="text-xs font-bold text-foreground">{community.reports}</p>
                          <p className="text-[9px] text-muted-foreground">Reports</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <BottomNav />
    </div>
  );
}
