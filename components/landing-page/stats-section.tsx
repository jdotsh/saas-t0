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
          transition={{ duration: 0.1, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl px-3 sm:px-4">
            Trusted by developers worldwide
          </h2>
          <p className="mt-3 sm:mt-4 text-sm xs:text-base sm:text-lg text-muted-foreground px-3 sm:px-4">
            Join thousands of developers building with Nexus
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.1, delay: 0.03, ease: 'easeOut' }}
          className="mt-10 xs:mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 gap-4 xs:gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-12"
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
                  duration: 0.1,
                  delay: 0.02 * index,
                  ease: 'easeOut'
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 xs:mb-4 flex h-10 w-10 xs:h-12 xs:w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon
                    className="h-5 w-5 xs:h-6 xs:w-6 text-primary"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex items-baseline justify-center gap-x-1">
                  {stat.prefix && (
                    <span className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
                      {stat.prefix}
                    </span>
                  )}
                  <span className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
                    <NumberTicker value={stat.value} />
                  </span>
                  {stat.suffix && (
                    <span className="text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                <p className="mt-1.5 xs:mt-2 text-xs xs:text-sm font-medium text-foreground px-2">
                  {stat.label}
                </p>
                <p className="mt-0.5 xs:mt-1 text-xs text-muted-foreground px-2">
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
