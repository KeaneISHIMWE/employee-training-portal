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
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
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
