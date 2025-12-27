import { LucideIcon } from 'lucide-react';
import { Rocket, Code, Building2 } from 'lucide-react';

export interface UseCase {
  id: string;
  persona: string;
  title: string;
  problem: string;
  solution: string;
  benefits: string[];
  icon: LucideIcon;
  ctaText: string;
  ctaHref: string;
  imagePath?: string;
}

export const useCases: UseCase[] = [
  {
    id: 'saas-founders',
    persona: 'SaaS Founders',
    title: 'Launch faster, validate sooner',
    problem:
      'Spending months building authentication, payments, and infrastructure delays your time to market and burns runway.',
    solution:
      'Start with a production-ready foundation. Focus on your unique value proposition while we handle the boilerplate.',
    benefits: [
      'Ship your MVP in days, not months',
      'Pre-built auth, payments & subscriptions',
      'Focus on features that differentiate you',
      'Proven architecture used by 2,500+ founders'
    ],
    icon: Rocket,
    ctaText: 'Start Building',
    ctaHref: '/docs',
    imagePath: '/images/hikari-dashboard.png'
  },
  {
    id: 'developers',
    persona: 'Freelance Developers',
    title: 'Deliver client projects in record time',
    problem:
      'Building custom SaaS applications from scratch for every client is time-consuming and error-prone.',
    solution:
      'Use Nexus as your battle-tested foundation. Customize the UI, add client-specific features, and deploy with confidence.',
    benefits: [
      'Cut development time by 70%',
      'Type-safe code reduces bugs',
      'Impress clients with polished UI',
      'Scale easily as their business grows'
    ],
    icon: Code,
    ctaText: 'View Documentation',
    ctaHref: '/docs',
    imagePath: '/images/hikari-dashboard.png'
  },
  {
    id: 'agencies',
    persona: 'Dev Agencies',
    title: 'Reusable foundation for all SaaS projects',
    problem:
      'Maintaining consistency across projects while meeting tight deadlines leads to technical debt and maintenance nightmares.',
    solution:
      'Standardize on Nexus. Train your team once, deploy multiple times. Maintain one codebase template for all SaaS clients.',
    benefits: [
      'Consistent architecture across all projects',
      'Onboard new devs quickly with docs',
      'Reduce maintenance burden',
      'White-label ready for your brand'
    ],
    icon: Building2,
    ctaText: 'Enterprise Options',
    ctaHref: '#pricing',
    imagePath: '/images/hikari-dashboard.png'
  }
];
