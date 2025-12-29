import Testimonials from '@/components/landing-page/testimonials-default';
import FAQSection from '@/components/landing-page/faq';
import Hero from '@/components/landing-page/hero';
import LogoCloud from '@/components/landing-page/logo-cloud-svg';
import { StatsSection } from '@/components/landing-page/stats-section';
import { FeaturesShowcase } from '@/components/landing-page/features-showcase';
import { UseCases } from '@/components/landing-page/use-cases';
import Pricing from '@/components/pricing/pricing-primary';
import Link from 'next/link';
import Image from 'next/image';

export default async function IndexPage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-24 mb-8">
      {/* Hero Section */}
      <Hero />

      {/* Logo Cloud */}
      <LogoCloud />

      {/* Stats Section - NEW */}
      <StatsSection />

      {/* Feature Showcase - NEW (Vibrant-style full-width modules) */}
      <FeaturesShowcase />

      {/* Use Cases - NEW */}
      <UseCases />

      {/* Pricing */}
      <Pricing />

      {/* Testimonials */}
      <Testimonials />

      {/* Community Highlights */}
      <section className="my-12 sm:my-16 md:my-20 px-4 sm:px-6">
        <div className="flex items-center w-full mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-center">
              Community highlights
            </h2>
            <Link
              href="https://x.com/antoineross__"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-base sm:text-lg text-primary hover:text-primary/80 hover:underline transition-colors duration-150"
            >
              Join the community
            </Link>
          </div>
        </div>
        <Link
          href="https://x.com/antoineross__/status/1812493114948600317"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full mx-auto max-w-2xl"
        >
          <Image
            src="/images/tweet.png"
            alt="Tweet by shadcn"
            width={550}
            height={300}
            className="w-full h-auto rounded-lg sm:rounded-xl shadow-lg"
          />
        </Link>
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
