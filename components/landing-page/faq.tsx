'use client';

import { useState } from 'react';
import { faqItems } from '@/config/faq';
import { ArrowDownLeft } from 'lucide-react';

export default function FAQSection() {
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 mb-12 sm:mb-16">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold">
          Frequently Asked Questions
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground mt-3">
          Everything you need to know about getting started
        </p>
      </div>
      <div className="space-y-4 sm:space-y-5">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              className={`flex items-center justify-between w-full p-5 sm:p-6 text-left transition-colors duration-100 ${activeItem === index ? 'bg-muted' : 'hover:bg-muted/50'}`}
              onClick={() => toggleItem(index)}
              aria-expanded={activeItem === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="text-base sm:text-lg font-medium pr-4">
                {item.question}
              </span>
              <ArrowDownLeft
                className={`h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground transition-transform duration-150 ease-snappy flex-shrink-0 ${activeItem === index ? 'rotate-45' : ''}`}
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-200 ease-snappy ${
                activeItem === index ? 'max-h-[500px]' : 'max-h-0'
              }`}
            >
              <div className="p-5 sm:p-6 pt-0 text-sm sm:text-base text-muted-foreground">
                <p className="leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
