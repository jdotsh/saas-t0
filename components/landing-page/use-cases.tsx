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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 xs:py-16 sm:py-20 md:py-24 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
          className="text-center px-3 sm:px-4"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Built for every type of builder
          </h2>
          <p className="mx-auto mt-2.5 xs:mt-3 sm:mt-4 max-w-2xl text-sm xs:text-base sm:text-lg text-muted-foreground">
            Whether you're a solo founder, freelancer, or agency, Nexus adapts
            to your workflow
          </p>
        </motion.div>

        <div className="mt-10 xs:mt-12 sm:mt-16 lg:mt-20 grid gap-5 xs:gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;

            return (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.12,
                  delay: 0.02 * index,
                  ease: 'easeOut'
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.12, ease: 'easeOut' }
                }}
                className="group relative flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-5 xs:p-6 sm:p-8 shadow-sm transition-shadow duration-100 md:hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10 transition-colors duration-150 group-hover:bg-primary/20">
                  <Icon
                    className="h-6 w-6 sm:h-7 sm:w-7 text-primary"
                    aria-hidden="true"
                  />
                </div>

                {/* Persona Badge */}
                <div className="mb-2 sm:mb-3 inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs font-medium text-primary">
                  {useCase.persona}
                </div>

                {/* Title */}
                <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold tracking-tight">
                  {useCase.title}
                </h3>

                {/* Problem */}
                <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    The problem:
                  </span>{' '}
                  {useCase.problem}
                </p>

                {/* Solution */}
                <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    The solution:
                  </span>{' '}
                  {useCase.solution}
                </p>

                {/* Benefits Checklist */}
                <ul className="mb-6 sm:mb-8 space-y-2 sm:space-y-3 flex-1">
                  {useCase.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-xs sm:text-sm text-foreground">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={useCase.ctaHref}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'w-full text-sm sm:text-base py-2 sm:py-2.5 transition-transform duration-100 active:scale-95 md:group-hover:translate-x-0.5'
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
