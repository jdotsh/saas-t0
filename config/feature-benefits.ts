export interface FeatureBenefit {
  id: string;
  benefit: string;
  headline: string;
  description: string;
  details: string[];
  imagePath: string;
  imageAlt: string;
}

export const featureBenefits: FeatureBenefit[] = [
  {
    id: 'launch-faster',
    benefit: 'Launch in Days, Not Months',
    headline: 'Skip the boilerplate. Start with production-ready code.',
    description:
      'Stop wasting time building authentication, database schemas, payment flows, and email systems from scratch. Nexus gives you a complete, tested foundation so you can focus on what makes your SaaS unique.',
    details: [
      'Pre-configured Supabase auth with social providers',
      'Stripe subscriptions with webhook handlers',
      'React Email templates for transactional emails',
      'Type-safe tRPC API with authentication middleware',
      'Row-level security policies already configured'
    ],
    imagePath: '/images/hikari-dashboard.png',
    imageAlt: 'Dashboard showing rapid development progress'
  },
  {
    id: 'payments-work',
    benefit: 'Payments That Just Work',
    headline: 'Accept payments in minutes, not weeks.',
    description:
      'Stripe integration is complex. We\'ve done the hard work: subscription management, webhook handling, invoice generation, and customer portal. Just add your API keys and start charging.',
    details: [
      'Multiple pricing tiers out of the box',
      'Automatic invoice generation',
      'Customer billing portal included',
      'Webhook security and idempotency',
      'Tax and compliance ready'
    ],
    imagePath: '/images/hikari-dashboard.png',
    imageAlt: 'Stripe checkout flow and billing dashboard'
  },
  {
    id: 'scale-infrastructure',
    benefit: 'Scale Without Infrastructure Headaches',
    headline: 'Built on Supabase. Scales to millions of users.',
    description:
      'No DevOps required. Supabase handles your database, authentication, file storage, and real-time subscriptions. Focus on building features while we handle the infrastructure.',
    details: [
      'PostgreSQL database with automatic backups',
      'Edge functions for serverless compute',
      '99.9% uptime SLA',
      'Built-in CDN for global performance',
      'Real-time database subscriptions'
    ],
    imagePath: '/images/hikari-dashboard.png',
    imageAlt: 'Architecture diagram showing scalable infrastructure'
  },
  {
    id: 'type-safe',
    benefit: 'Type-Safe End-to-End',
    headline: 'Catch bugs before your users do.',
    description:
      'Full TypeScript coverage with tRPC means your API, database queries, and frontend components share the same types. Refactor with confidence. Deploy without fear.',
    details: [
      'End-to-end type safety from DB to UI',
      'tRPC for type-safe API calls',
      'Zod schemas for runtime validation',
      'TypeScript strict mode enabled',
      'No more "undefined is not a function"'
    ],
    imagePath: '/images/hikari-dashboard.png',
    imageAlt: 'Code editor showing TypeScript autocomplete and error detection'
  },
  {
    id: 'beautiful-ui',
    benefit: 'Beautiful UI Out of the Box',
    headline: '50+ components. Dark mode. Fully accessible.',
    description:
      'Built with shadcn/ui and Radix UI primitives. Every component is accessible, responsive, and themeable. Light and dark modes work perfectly. No design skills required.',
    details: [
      '50+ pre-built shadcn/ui components',
      'Radix UI for accessibility',
      'Tailwind CSS for rapid styling',
      'Framer Motion animations included',
      'Mobile-first responsive design'
    ],
    imagePath: '/images/hikari-dashboard.png',
    imageAlt: 'Component showcase grid with light and dark mode'
  }
];
