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
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8 xs:py-10 sm:py-12 mb-8 xs:mb-10 sm:mb-12">
      <div className="text-center mb-6 xs:mb-8">
        <h2 className="text-lg xs:text-xl sm:text-2xl font-bold">FAQ</h2>
        <p className="text-xs xs:text-sm sm:text-base text-muted-foreground">
          You got questions? I got answers.
        </p>
      </div>
      <div className="space-y-3 xs:space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <div
              className={`flex items-center justify-between p-3 xs:p-4 cursor-pointer transition-colors duration-100 ${activeItem === index ? 'bg-muted' : ''}`}
              onClick={() => toggleItem(index)}
            >
              <span className="text-sm xs:text-base">{item.question}</span>
              <ArrowDownLeft
                className={`h-4 xs:h-5 w-4 xs:w-5 text-muted-foreground transition-transform duration-150 ease-snappy ${activeItem === index ? 'rotate-45' : ''}`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-150 ease-snappy ${
                activeItem === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="p-4 border-t border-zinc-200 text-sm">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
