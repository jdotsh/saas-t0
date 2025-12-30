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
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Github, Chrome } from 'lucide-react';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [showResendConfirmation, setShowResendConfirmation] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const error = searchParams.get('error_description');
    if (error === 'Email not confirmed') {
      setShowResendConfirmation(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    await handleRequest(e, signInWithPassword, router);
    setIsSubmitting(false);
  };

  const handleResendConfirmation = async () => {
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address first.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/resend-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Email sent!',
          description: 'Please check your inbox for the confirmation link.'
        });
        setResendMessage('Confirmation email sent! Check your inbox.');
      } else {
        toast({
          title: 'Error',
          description: data.error || 'Failed to send confirmation email.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    }
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

            {/* Email not confirmed warning */}
            {showResendConfirmation && (
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <p className="text-sm text-amber-900 dark:text-amber-200 font-medium">
                      Email not confirmed
                    </p>
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      Please check your email and click the confirmation link to
                      activate your account.
                    </p>
                    {resendMessage ? (
                      <div className="flex items-center gap-2 mt-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {resendMessage}
                        </p>
                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleResendConfirmation}
                        disabled={isSubmitting}
                        className="mt-2"
                      >
                        Resend confirmation email
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
