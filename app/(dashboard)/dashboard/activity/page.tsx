'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Settings,
  LogOut,
  UserPlus,
  Lock,
  UserCog,
  AlertCircle,
  UserMinus,
  Mail,
  CheckCircle,
  CreditCard,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import { EmptyState } from '@/components/empty-state';

// Activity types enum
enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
  UPDATE_BILLING = 'UPDATE_BILLING',
  SECURITY_ALERT = 'SECURITY_ALERT',
}

// Icon mapping for each activity type
const iconMap: Record<ActivityType, LucideIcon> = {
  [ActivityType.SIGN_UP]: UserPlus,
  [ActivityType.SIGN_IN]: UserCog,
  [ActivityType.SIGN_OUT]: LogOut,
  [ActivityType.UPDATE_PASSWORD]: Lock,
  [ActivityType.DELETE_ACCOUNT]: UserMinus,
  [ActivityType.UPDATE_ACCOUNT]: Settings,
  [ActivityType.CREATE_TEAM]: UserPlus,
  [ActivityType.REMOVE_TEAM_MEMBER]: UserMinus,
  [ActivityType.INVITE_TEAM_MEMBER]: Mail,
  [ActivityType.ACCEPT_INVITATION]: CheckCircle,
  [ActivityType.UPDATE_BILLING]: CreditCard,
  [ActivityType.SECURITY_ALERT]: Shield,
};

// Color mapping for different activity types
const colorMap: Record<ActivityType, string> = {
  [ActivityType.SIGN_UP]: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
  [ActivityType.SIGN_IN]: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
  [ActivityType.SIGN_OUT]: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
  [ActivityType.UPDATE_PASSWORD]: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300',
  [ActivityType.DELETE_ACCOUNT]: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
  [ActivityType.UPDATE_ACCOUNT]: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
  [ActivityType.CREATE_TEAM]: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
  [ActivityType.REMOVE_TEAM_MEMBER]: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
  [ActivityType.INVITE_TEAM_MEMBER]: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
  [ActivityType.ACCEPT_INVITATION]: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
  [ActivityType.UPDATE_BILLING]: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
  [ActivityType.SECURITY_ALERT]: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
};

// Relative time formatter
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minute${Math.floor(diffInSeconds / 60) === 1 ? '' : 's'} ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) === 1 ? '' : 's'} ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) === 1 ? '' : 's'} ago`;
  return date.toLocaleDateString();
}

// Format activity action to human-readable text
function formatAction(action: ActivityType): string {
  const actionMap: Record<ActivityType, string> = {
    [ActivityType.SIGN_UP]: 'You signed up',
    [ActivityType.SIGN_IN]: 'You signed in',
    [ActivityType.SIGN_OUT]: 'You signed out',
    [ActivityType.UPDATE_PASSWORD]: 'You changed your password',
    [ActivityType.DELETE_ACCOUNT]: 'You deleted your account',
    [ActivityType.UPDATE_ACCOUNT]: 'You updated your account',
    [ActivityType.CREATE_TEAM]: 'You created a new team',
    [ActivityType.REMOVE_TEAM_MEMBER]: 'You removed a team member',
    [ActivityType.INVITE_TEAM_MEMBER]: 'You invited a team member',
    [ActivityType.ACCEPT_INVITATION]: 'You accepted an invitation',
    [ActivityType.UPDATE_BILLING]: 'You updated billing information',
    [ActivityType.SECURITY_ALERT]: 'Security alert detected',
  };
  return actionMap[action] || 'Unknown action occurred';
}

// Mock activity data for demo (in production, this would come from Supabase)
const getMockActivityLogs = () => {
  const now = new Date();
  return [
    {
      id: 1,
      action: ActivityType.SIGN_IN,
      ipAddress: '192.168.1.1',
      timestamp: new Date(now.getTime() - 5 * 60 * 1000), // 5 minutes ago
    },
    {
      id: 2,
      action: ActivityType.UPDATE_ACCOUNT,
      ipAddress: '192.168.1.1',
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 3,
      action: ActivityType.UPDATE_PASSWORD,
      ipAddress: '192.168.1.1',
      timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: 4,
      action: ActivityType.INVITE_TEAM_MEMBER,
      ipAddress: '192.168.1.1',
      timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      id: 5,
      action: ActivityType.SIGN_UP,
      ipAddress: '192.168.1.1',
      timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
  ];
};

export default function ActivityPage() {
  // In production: const logs = await getActivityLogs();
  const logs = getMockActivityLogs();

  return (
    <div className="w-full mx-auto">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Activity Log</h1>
          <p className="text-muted-foreground">
            Track all account actions and security events
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Monitor your account activity and security events. Activity logs are retained for 90 days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {logs.length > 0 ? (
              <ul className="space-y-4">
                {logs.map((log) => {
                  const Icon = iconMap[log.action as ActivityType] || Settings;
                  const colorClass = colorMap[log.action as ActivityType] || 'bg-gray-100 text-gray-600';
                  const formattedAction = formatAction(log.action as ActivityType);

                  return (
                    <li key={log.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`rounded-full p-2 ${colorClass}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">
                          {formattedAction}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">
                            {getRelativeTime(new Date(log.timestamp))}
                          </p>
                          {log.ipAddress && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <p className="text-xs text-muted-foreground font-mono">
                                {log.ipAddress}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <EmptyState
                icon={AlertCircle}
                title="No activity yet"
                description="When you perform actions like signing in or updating your account, they'll appear here."
              />
            )}
          </CardContent>
        </Card>

        {/* Security notice */}
        <Card className="border-orange-200 dark:border-orange-900">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Security Notice</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Activity logs help you monitor your account security. If you see suspicious activity, change your password immediately and contact support.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
