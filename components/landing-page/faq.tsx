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
    <section className="max-w-3xl mx-auto p-6 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <p className="text-muted-foreground">
          You got questions? I got answers.
        </p>
      </div>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <div
              className={`flex items-center justify-between p-4 cursor-pointer ${activeItem === index ? 'bg-muted' : ''}`}
              onClick={() => toggleItem(index)}
            >
              <span>{item.question}</span>
              <ArrowDownLeft
                className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ease-in-out ${activeItem === index ? 'rotate-45' : ''}`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
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
