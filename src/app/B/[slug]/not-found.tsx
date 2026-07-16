// src/app/b/[slug]/not-found.tsx
import Link from 'next/link';

export default function BusinessNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Business Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          Sorry, we couldn't find the business you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
