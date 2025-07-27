import React from 'react';
import Link from 'next/link';
import { LayoutProps } from '@/types';

const Layout: React.FC<LayoutProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ETP</span>
              </div>
              <span className="text-xl font-bold text-gray-800">
                Employee Training Portal
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                All Courses
              </Link>
              <Link
                href="/my-courses"
                className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                My Courses
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-gray-600 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      {(title || description) && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-lg text-gray-600">
                {description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-700 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">ETP</span>
                </div>
                <span className="text-lg font-semibold text-gray-800">
                  Employee Training Portal
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Empowering employees through comprehensive training programs and professional development opportunities.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link href="/my-courses" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                    My Courses
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li className="text-gray-600 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@trainingportal.com
                </li>
                <li className="text-gray-600 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  1-800-TRAINING
                </li>
                <li className="text-gray-600 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Live Chat Available
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2025 Employee Training Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
