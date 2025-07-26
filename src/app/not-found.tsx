import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Layout>
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you might have entered the wrong URL.
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
