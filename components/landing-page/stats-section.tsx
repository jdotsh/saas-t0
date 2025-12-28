'use client';

import { motion } from 'framer-motion';
import { stats } from '@/config/stats';
import NumberTicker from '@/components/magicui/number-ticker';

/**
 * Stats Section Component
 *
 * Displays key metrics with animated number counters
 * Inspired by Vibrant's full-width module design
 *
 * Features:
 * - Animated number counters using NumberTicker
 * - Scroll-triggered animations
 * - Responsive grid layout (2x2 mobile, 4x1 desktop)
 * - Icons from config
 */

export function StatsSection() {
  return (
    <section className="w-full border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.2 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl px-4">
            Trusted by developers worldwide
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground px-4">
            Join thousands of developers building with Nexus
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.15, delay: 0.05 }}
          className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.15,
                  delay: 0.03 * index
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>

                <div className="flex items-baseline justify-center gap-x-1">
                  {stat.prefix && (
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
                      {stat.prefix}
                    </span>
                  )}
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
                    <NumberTicker value={stat.value} />
                  </span>
                  {stat.suffix && (
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs sm:text-sm font-medium text-foreground px-2">
                  {stat.label}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground px-2">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
