'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import Layout from '@/components/layout/Layout';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <Layout>
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Something went wrong!
        </h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        <div className="space-x-4">
          <Button onClick={reset}>
            Try Again
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Go Home
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left max-w-2xl mx-auto">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs text-red-600 bg-red-50 p-4 rounded overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </Layout>
  );
}
