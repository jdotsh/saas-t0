'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NumberTicker from '@/components/magicui/number-ticker';
import {
  TrendingUp,
  Users,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

/**
 * Analytics Dashboard
 *
 * UNIQUE COMPETITIVE ADVANTAGE: None of the competitors have a charts dashboard
 * - Hikari: ❌ None
 * - next-money: ❌ None
 * - saas-starter: ❌ None
 * - saasfly: ❌ None
 * - Nexus: ✅ Full analytics dashboard
 *
 * NOTE: Install recharts to enable interactive charts:
 * pnpm add recharts
 */

// Mock data for demo
const mockData = {
  stats: {
    totalUsers: 2847,
    activeUsers: 1924,
    revenue: 45231,
    growthRate: 12.5
  },
  userGrowth: [
    { month: 'Jan', users: 1200, active: 850 },
    { month: 'Feb', users: 1450, active: 1020 },
    { month: 'Mar', users: 1680, active: 1180 },
    { month: 'Apr', users: 1920, active: 1350 },
    { month: 'May', users: 2280, active: 1620 },
    { month: 'Jun', users: 2847, active: 1924 }
  ],
  revenue: [
    { month: 'Jan', revenue: 28500, subscriptions: 142 },
    { month: 'Feb', revenue: 32400, subscriptions: 168 },
    { month: 'Mar', revenue: 36800, subscriptions: 194 },
    { month: 'Apr', revenue: 38200, subscriptions: 201 },
    { month: 'May', revenue: 42100, subscriptions: 223 },
    { month: 'Jun', revenue: 45231, subscriptions: 241 }
  ],
  planDistribution: [
    { name: 'Free', value: 1420, color: '#94a3b8' },
    { name: 'Pro', value: 987, color: '#3b82f6' },
    { name: 'Enterprise', value: 440, color: '#8b5cf6' }
  ]
};

// Stats Card Component
function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  format = 'number'
}: {
  title: string;
  value: number;
  change: number;
  icon: React.ElementType;
  format?: 'number' | 'currency' | 'percentage';
}) {
  const isPositive = change >= 0;
  const formattedValue =
    format === 'currency'
      ? `$${value.toLocaleString()}`
      : format === 'percentage'
        ? `${value}%`
        : value.toLocaleString();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {format === 'number' ? (
            <NumberTicker value={value} />
          ) : (
            formattedValue
          )}
        </div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {isPositive ? (
            <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
          ) : (
            <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
          )}
          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
            {Math.abs(change)}%
          </span>
          <span className="ml-1">from last month</span>
        </p>
      </CardContent>
    </Card>
  );
}

// Simple Bar Chart Component (pure CSS, no recharts needed)
function SimpleBarChart({ data }: { data: typeof mockData.userGrowth }) {
  const maxUsers = Math.max(...data.map((d) => d.users));

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const percentage = (item.users / maxUsers) * 100;
        const activePercentage = (item.active / maxUsers) * 100;

        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.month}</span>
              <span className="text-muted-foreground">
                {item.users.toLocaleString()} users
              </span>
            </div>
            <div className="relative h-8 bg-muted rounded-md overflow-hidden">
              <div
                className="absolute h-full bg-primary/20 transition-all duration-200 ease-smooth"
                style={{ width: `${percentage}%` }}
              />
              <div
                className="absolute h-full bg-primary transition-all duration-200 ease-smooth"
                style={{ width: `${activePercentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Simple Line Chart Component (pure CSS, no recharts needed)
function SimpleLineChart({ data }: { data: typeof mockData.revenue }) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className="space-y-4">
      <div className="h-64 flex items-end justify-between gap-2">
        {data.map((item, index) => {
          const height = (item.revenue / maxRevenue) * 100;

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="w-full flex items-end justify-center relative group">
                <div
                  className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-md transition-all duration-200 ease-smooth hover:opacity-80 relative"
                  style={{ height: `${height}%`, minHeight: '4px' }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap shadow-md">
                    ${(item.revenue / 1000).toFixed(1)}k
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Simple Pie Chart Component (pure CSS, no recharts needed)
function SimplePieChart({ data }: { data: typeof mockData.planDistribution }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const prevPercentage = data
              .slice(0, index)
              .reduce((sum, d) => sum + (d.value / total) * 100, 0);

            return (
              <div
                key={index}
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(${item.color} 0% ${percentage}%, transparent ${percentage}% 100%)`,
                  transform: `rotate(${prevPercentage * 3.6}deg)`
                }}
              />
            );
          })}
          <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">{total.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Users</div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm">{item.name}</span>
            </div>
            <span className="text-sm font-medium">
              {item.value.toLocaleString()} (
              {((item.value / total) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="w-full mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive insights into your SaaS metrics and performance
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={mockData.stats.totalUsers}
          change={mockData.stats.growthRate}
          icon={Users}
          format="number"
        />
        <StatsCard
          title="Active Users"
          value={mockData.stats.activeUsers}
          change={8.2}
          icon={Activity}
          format="number"
        />
        <StatsCard
          title="Monthly Revenue"
          value={mockData.stats.revenue}
          change={15.3}
          icon={DollarSign}
          format="currency"
        />
        <StatsCard
          title="Growth Rate"
          value={mockData.stats.growthRate}
          change={2.4}
          icon={TrendingUp}
          format="percentage"
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Growth</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="distribution">Plan Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Growth Over Time</CardTitle>
              <CardDescription>
                Total users vs active users trend. Light bar shows total users,
                dark bar shows active users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleBarChart data={mockData.userGrowth} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
              <CardDescription>
                Revenue growth trend over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimpleLineChart data={mockData.revenue} />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Average Revenue Per User</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  $
                  {(
                    mockData.stats.revenue / mockData.stats.activeUsers
                  ).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  +$3.20 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  <NumberTicker
                    value={
                      mockData.revenue[mockData.revenue.length - 1]
                        .subscriptions
                    }
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  18 new this month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan Distribution</CardTitle>
              <CardDescription>
                Breakdown of users by subscription tier
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SimplePieChart data={mockData.planDistribution} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional Metrics */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.2%</div>
            <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-primary w-[34.2%]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8%</div>
            <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-destructive w-[2.8%]" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Customer Lifetime Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,847</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
