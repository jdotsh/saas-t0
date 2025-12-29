'use client';
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';
import { logger } from '@/lib/logger';
import {
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  ChevronDown
} from 'lucide-react';
import { env } from '@/env.mjs';
import { cn } from '@/lib/utils';

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function FooterPrimary() {
  const [email, setEmail] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('user_email_list')
        .insert([{ email }]);

      if (error) throw error;

      toast({
        title: 'Subscribed! 🎉',
        description: 'Thank you for subscribing!'
      });
      setEmail('');
    } catch (error: unknown) {
      logger.error('Error inserting email:', error);
      toast({
        title: 'Error',
        description: 'An error occurred. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const footerSections = [
    {
      id: 'product',
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Documentation', href: '/documentation' },
        { label: 'Blog', href: '/blog' }
      ]
    },
    {
      id: 'company',
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'Contact', href: 'mailto:hello@antoineross.com' }
      ]
    },
    {
      id: 'legal',
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#privacy' },
        { label: 'Terms', href: '#terms' },
        { label: 'Cookie Policy', href: '#cookies' }
      ]
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/antoineross/hikari',
      label: 'GitHub'
    },
    {
      icon: Twitter,
      href: 'https://x.com/antoineross__',
      label: 'Twitter'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/antoineross',
      label: 'LinkedIn'
    }
  ];

  return (
    <footer className="bg-background border-t">
      {/* Newsletter Section - Mobile only */}
      <div className="sm:hidden bg-primary/5 dark:bg-primary/10">
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-bold mb-2">Stay updated</h3>
            <p className="text-sm text-muted-foreground">
              Get the latest updates and early access
            </p>
          </div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" size="default" className="px-4">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Mobile Accordion Footer */}
        <div className="sm:hidden space-y-2">
          {footerSections.map((section) => (
            <div key={section.id} className="border-b border-border/50">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center justify-between w-full py-3 text-left"
              >
                <span className="font-medium text-sm">{section.title}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    expandedSection === section.id && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  expandedSection === section.id ? 'max-h-48 pb-3' : 'max-h-0'
                )}
              >
                <ul className="space-y-2 pl-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Grid Footer */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {footerSections.map((section) => (
            <div key={section.id}>
              <h3 className="font-semibold text-sm mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter - Desktop */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-sm mb-3">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stay updated with our latest features and releases
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-10"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" size="sm" className="h-10">
                Subscribe
              </Button>
            </form>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section - Ultra compact on mobile */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo & Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
              <Link href="/" className="font-bold text-lg">
                NEXUS
              </Link>
              <span className="text-xs text-muted-foreground">
                © 2024 Nexus. All rights reserved.
              </span>
              <span className="hidden sm:inline text-xs text-muted-foreground">
                SOC 2 Type II
              </span>
            </div>

            {/* Mobile Social Icons */}
            <div className="flex gap-4 sm:hidden">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>

            {/* Desktop Quick Links */}
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="#privacy"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#terms"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#cookies"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
