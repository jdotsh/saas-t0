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
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Trusted by developers worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of developers building with Nexus
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 gap-8 lg:mt-20 lg:grid-cols-4 lg:gap-12"
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
                  duration: 0.5,
                  delay: 0.1 * index
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>

                <div className="flex items-baseline justify-center gap-x-1">
                  {stat.prefix && (
                    <span className="text-4xl font-bold tracking-tight lg:text-5xl">
                      {stat.prefix}
                    </span>
                  )}
                  <span className="text-4xl font-bold tracking-tight lg:text-5xl">
                    <NumberTicker value={stat.value} />
                  </span>
                  {stat.suffix && (
                    <span className="text-4xl font-bold tracking-tight lg:text-5xl">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-sm font-medium text-foreground">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
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
