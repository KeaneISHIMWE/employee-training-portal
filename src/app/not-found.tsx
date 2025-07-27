import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Layout>
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or you might have entered the wrong URL.
        </p>
        <div className="space-x-4">
          <Link href="/">
            <Button>
              Go Home
            </Button>
          </Link>
          <Link href="/courses">
            <Button variant="outline">
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
