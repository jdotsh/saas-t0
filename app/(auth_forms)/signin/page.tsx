'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { signInWithOAuth } from '@/utils/auth-helpers/client';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Github, Chrome } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

export default function SignIn() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router);
    setIsSubmitting(false);
  };

  const oAuthProviders = [
    {
      name: 'github',
      displayName: 'GitHub',
      icon: <Github className="mr-2 h-4 w-4" />
    },
    {
      name: 'google',
      displayName: 'Google',
      icon: <Chrome className="mr-2 h-4 w-4" />
    }
  ];
  const handleOAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await signInWithOAuth(e);
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="rounded-md p-2 transition-colors hover:bg-muted"
          prefetch={false}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Link>
        <div />
      </div>
      <div className="flex items-center justify-center flex-1">
        <Card className="w-full max-w-md">
          <CardContent className="grid gap-4 px-4 pb-4 my-10">
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-bold">Sign In</h2>
              <p className="text-muted-foreground my-2">
                Enter your email below to sign in to your account
              </p>
            </div>
            <form
              noValidate={true}
              className="grid gap-4"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" loading={isSubmitting}>
                Sign in
              </Button>
            </form>
            <div className="flex justify-center">
              <Link
                href="/signup"
                className="text-sm font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Don't have an account? Sign up
              </Link>
            </div>
            <div className="flex justify-center">
              <Link
                href="/forgot_password"
                className="text-sm font-bold hover:underline underline-offset-4"
                prefetch={false}
              >
                Forgot your password?
              </Link>
            </div>
            <Separator className="my-6" />
            <div className="grid gap-2">
              {oAuthProviders.map((provider) => (
                <form
                  key={provider.name}
                  className="pb-2"
                  onSubmit={(e) => handleOAuthSubmit(e)}
                >
                  <input type="hidden" name="provider" value={provider.name} />
                  <Button
                    variant="outline"
                    type="submit"
                    className="w-full"
                    loading={isSubmitting}
                    disabled={provider.name === 'google'} // Disable button if provider is Google
                  >
                    {provider.icon}
                    Sign in with {provider.displayName}
                  </Button>
                </form>
              ))}
            </div>
            <p className="text-muted-foreground text-xs text-center my-2">
              For testing purposes, only Github is available.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
