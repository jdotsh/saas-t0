import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { footerLinks } from '@/config/footer';
import {
  FacebookIcon,
  LinkedinIcon,
  XIcon,
  InstagramIcon
} from '@/components/svg';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 dark:bg-zinc-950 text-zinc-300 py-12 sm:py-16 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 justify-between">
        <div>
          <h2 className="text-md text-zinc-300 font-bold mb-4">
            {footerLinks.getInTouch.title}
          </h2>
          <p className="text-xl text-zinc-300 mb-4">
            We partner with global brands, from startups to industry leaders.{' '}
            <span className="text-zinc-50 font-bold">Let's discuss.</span>
          </p>
          <h3 className="text-sm text-zinc-300 font-bold mb-2">
            Subscribe to our Newsletter
          </h3>
          <form className="flex">
            <Input
              type="email"
              placeholder="name@email.com"
              className="p-2 flex-grow bg-zinc-800 text-zinc-50 border-border"
            />
            <Button className="ml-2 bg-zinc-700 hover:bg-zinc-600">
              Subscribe
            </Button>
          </form>
        </div>
        <div className="flex flex-col items-center mx-auto text-xs">
          <div className="flex">
            <div className="mr-8">
              <h2 className="text-sm font-bold mb-4">
                {footerLinks.pages.title}
              </h2>
              <ul>
                {footerLinks.pages.links.map((link, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href={link.href}
                      className="text-zinc-50 hover:text-zinc-100 transition-colors"
                      prefetch={false}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-bold mb-4">
                {footerLinks.utilityPages.title}
              </h2>
              <ul>
                {footerLinks.utilityPages.links.map((link, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href={link.href}
                      className="text-zinc-50 hover:text-zinc-100 transition-colors"
                      prefetch={false}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="text-sm font-bold mb-4 w-fit justify-end mx-auto">
          <h2 className="flex text-sm font-bold mb-4">
            {footerLinks.location.title}
          </h2>
          <p className="mb-4 text-xs max-w-[150px]">
            {footerLinks.location.address}
          </p>
          <h3 className="text-sm font-bold mb-2">
            {footerLinks.location.socialLinksTitle}
          </h3>
          <div className="flex space-x-3">
            <Link
              href="#"
              className="text-zinc-50 hover:text-zinc-100 transition-colors"
              prefetch={false}
            >
              <XIcon className="w-6 h-6" />
            </Link>
            <Link
              href="#"
              className="text-zinc-50 hover:text-zinc-100 transition-colors"
              prefetch={false}
            >
              <FacebookIcon className="w-6 h-6" />
            </Link>
            <Link
              href="#"
              className="text-zinc-50 hover:text-zinc-100 transition-colors"
              prefetch={false}
            >
              <InstagramIcon className="w-6 h-6" />
            </Link>
            <Link
              href="#"
              className="text-zinc-50 hover:text-zinc-100 transition-colors"
              prefetch={false}
            >
              <LinkedinIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-zinc-300 text-xs">
        <p>
          Copyright ©2024{' '}
          <span className="text-zinc-50 font-bold">Webestica</span>. All rights
          reserved.
        </p>
      </div>
      {/* <div className="absolute bottom-0 right-0 text-[10rem] text-bold text-gray-300 opacity-30">
        ROSS
      </div> */}
    </footer>
  );
}
