'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { featureBenefits } from '@/config/feature-benefits';
import { Check } from 'lucide-react';

/**
 * Features Showcase Component
 *
 * Full-width stacking modules inspired by Vibrant's design
 * Each module highlights a key benefit with visual + description
 *
 * Features:
 * - Alternating layout (image left/right)
 * - Scroll-triggered animations with color fills
 * - Generous spacing between modules
 * - Responsive mobile-first design
 * - Checklist of feature details
 */

interface FeatureModuleProps {
  benefit: string;
  headline: string;
  description: string;
  details: string[];
  imagePath: string;
  imageAlt: string;
  reverse?: boolean;
  index: number;
}

function FeatureModule({
  benefit,
  headline,
  description,
  details,
  imagePath,
  imageAlt,
  reverse = false,
  index
}: FeatureModuleProps) {
  // Alternating background colors for Vibrant-style
  const bgClass = index % 2 === 0 ? 'bg-background' : 'bg-muted/30';

  return (
    <section className={`w-full ${bgClass} transition-colors duration-500`}>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div
          className={`grid gap-12 lg:grid-cols-2 lg:gap-16 ${
            reverse ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`flex flex-col justify-center ${
              reverse ? 'lg:order-2' : 'lg:order-1'
            }`}
          >
            {/* Benefit Badge */}
            <div className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              {benefit}
            </div>

            {/* Headline */}
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {headline}
            </h2>

            {/* Description */}
            <p className="mb-8 text-lg text-muted-foreground">
              {description}
            </p>

            {/* Details Checklist */}
            <ul className="space-y-4">
              {details.map((detail, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 * idx
                  }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check
                      className="h-4 w-4 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-base text-foreground">{detail}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className={`relative ${reverse ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted/50 shadow-2xl">
              <Image
                src={imagePath}
                alt={imageAlt}
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Gradient Overlay for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
            </div>

            {/* Decorative Element - Optional colored accent */}
            <div
              className={`absolute -z-10 ${
                reverse ? '-left-8 -top-8' : '-right-8 -bottom-8'
              } h-32 w-32 rounded-full bg-primary/10 blur-3xl`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Main Features Showcase Component
 */
export function FeaturesShowcase() {
  return (
    <div className="w-full">
      {featureBenefits.map((feature, index) => (
        <FeatureModule
          key={feature.id}
          benefit={feature.benefit}
          headline={feature.headline}
          description={feature.description}
          details={feature.details}
          imagePath={feature.imagePath}
          imageAlt={feature.imageAlt}
          reverse={index % 2 === 1}
          index={index}
        />
      ))}
    </div>
  );
}
