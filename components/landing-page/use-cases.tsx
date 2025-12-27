'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCases } from '@/config/use-cases';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Check } from 'lucide-react';

/**
 * Use Cases Component
 *
 * Showcases 3 key personas and their use cases
 * Card-based layout with hover effects
 *
 * Features:
 * - 3 persona cards (SaaS Founders, Developers, Agencies)
 * - Hover animations with scale + shadow
 * - Benefits checklist
 * - CTAs for each use case
 * - Responsive grid layout
 */

export function UseCases() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built for every type of builder
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Whether you're a solo founder, freelancer, or agency, Nexus adapts
            to your workflow
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;

            return (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2, ease: 'easeOut' }
                }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <Icon
                    className="h-7 w-7 text-primary"
                    aria-hidden="true"
                  />
                </div>

                {/* Persona Badge */}
                <div className="mb-3 inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                  {useCase.persona}
                </div>

                {/* Title */}
                <h3 className="mb-3 text-2xl font-bold tracking-tight">
                  {useCase.title}
                </h3>

                {/* Problem */}
                <p className="mb-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    The problem:
                  </span>{' '}
                  {useCase.problem}
                </p>

                {/* Solution */}
                <p className="mb-6 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    The solution:
                  </span>{' '}
                  {useCase.solution}
                </p>

                {/* Benefits Checklist */}
                <ul className="mb-8 space-y-3 flex-1">
                  {useCase.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={useCase.ctaHref}
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' }),
                    'w-full transition-transform duration-200 group-hover:translate-x-0.5'
                  )}
                >
                  {useCase.ctaText}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
