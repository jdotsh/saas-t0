import { LucideIcon } from 'lucide-react';
import { Users, Zap, TrendingUp, Github } from 'lucide-react';

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
  icon: LucideIcon;
}

export const stats: Stat[] = [
  {
    id: 'developers',
    label: 'Developers',
    value: 2500,
    suffix: '+',
    description: 'Building with Nexus',
    icon: Users
  },
  {
    id: 'launch-time',
    label: 'Hours to Launch',
    value: 48,
    description: 'Average time to production',
    icon: Zap
  },
  {
    id: 'uptime',
    label: 'Uptime',
    value: 99.9,
    suffix: '%',
    description: 'Powered by Supabase',
    icon: TrendingUp
  },
  {
    id: 'github-stars',
    label: 'GitHub Stars',
    value: 1200,
    suffix: '+',
    description: 'Community support',
    icon: Github
  }
];
