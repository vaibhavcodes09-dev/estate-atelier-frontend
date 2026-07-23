import { Link } from 'react-router-dom';

// NotFound (404) page — shown for any unmatched route.
export default function NotFound() {
  return (
    <div className="container-px flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-8xl font-bold text-ink-900">404</span>
      <h1 className="mt-4 text-2xl font-bold text-ink-900">Page not found</h1>
      <p className="mt-2 text-lg text-ink-500">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-accent mt-8">
        Back to home
      </Link>
    </div>
  );
}
