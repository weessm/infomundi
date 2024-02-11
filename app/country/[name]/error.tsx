"use client";

import LinkComponent from "@/components/Link";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <section className="container mx-auto mt-8">
      <LinkComponent link="/" text="◀ Back to Homepage" target="_self" />
      <div className="text-center mt-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Error</h2>
        <div className="text-2xl font-bold text-gray-800 mb-4">
          <p>Sorry, an error occurred while processing your request.</p>
          <p>We will try to resolve the issue as soon as possible.</p>
        </div>
      </div>
      <details className="mt-3 mb-8 border-2 border-slate-400">
        <summary className="text-lg bg-slate-300 cursor-pointer p-2">
          Error Details
        </summary>
        <div className="text-red-500 m-3">{error.message}</div>
      </details>
    </section>
  );
}
